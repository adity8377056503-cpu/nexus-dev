import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  type User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  setDoc, 
  doc, 
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import type { ProjectInquiry, AgencyStats, ClientReview } from '../types';
import firebaseConfigData from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId,
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore with specific databaseId if present
export const db = firebaseConfigData.firestoreDatabaseId && firebaseConfigData.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfigData.firestoreDatabaseId)
  : getFirestore(app);

// Auth helper functions
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const onAuthUpdate = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore helper functions for Project Inquiries
export const submitProjectInquiry = async (
  inquiry: Omit<ProjectInquiry, 'id' | 'createdAt' | 'status'>
): Promise<{ id: string; success: boolean }> => {
  const newInquiry: ProjectInquiry = {
    ...inquiry,
    createdAt: new Date().toISOString(),
    status: 'received',
  };

  try {
    const colRef = collection(db, 'project_inquiries');
    const docRef = await addDoc(colRef, {
      ...newInquiry,
      serverTime: serverTimestamp(),
    });

    // Also store in local cache so user can view offline/immediately
    try {
      const stored = localStorage.getItem('nexus_my_inquiries');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift({ ...newInquiry, id: docRef.id });
      localStorage.setItem('nexus_my_inquiries', JSON.stringify(list));
    } catch {
      // LocalStorage fallback error ignored
    }

    return { id: docRef.id, success: true };
  } catch (error) {
    console.warn('Firestore write failed, falling back to local persistence:', error);
    // Fallback to local storage
    const fallbackId = 'local-' + Date.now();
    try {
      const stored = localStorage.getItem('nexus_my_inquiries');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift({ ...newInquiry, id: fallbackId });
      localStorage.setItem('nexus_my_inquiries', JSON.stringify(list));
    } catch {
      // LocalStorage fallback error ignored
    }
    return { id: fallbackId, success: true };
  }
};

export const getUserInquiries = async (userId: string, userEmail?: string): Promise<ProjectInquiry[]> => {
  const inquiries: ProjectInquiry[] = [];

  try {
    const colRef = collection(db, 'project_inquiries');
    let q = query(colRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    
    try {
      const snap = await getDocs(q);
      snap.forEach((docSnap) => {
        inquiries.push({ id: docSnap.id, ...(docSnap.data() as Omit<ProjectInquiry, 'id'>) });
      });
    } catch {
      // If composite index is pending or permission error, try matching email or fallback
      if (userEmail) {
        const qEmail = query(colRef, where('email', '==', userEmail));
        const snap2 = await getDocs(qEmail);
        snap2.forEach((docSnap) => {
          if (!inquiries.some((item) => item.id === docSnap.id)) {
            inquiries.push({ id: docSnap.id, ...(docSnap.data() as Omit<ProjectInquiry, 'id'>) });
          }
        });
      }
    }
  } catch (e) {
    console.warn('Could not fetch from Firestore, checking localStorage', e);
  }

  // Merge with locally saved inquiries
  try {
    const stored = localStorage.getItem('nexus_my_inquiries');
    if (stored) {
      const localList: ProjectInquiry[] = JSON.parse(stored);
      for (const item of localList) {
        if (!inquiries.some((i) => i.id === item.id)) {
          inquiries.push(item);
        }
      }
    }
  } catch {
    // LocalStorage fallback error ignored
  }

  return inquiries;
};

// Agency Stats persistence (editable placeholders)
export const saveAgencyStats = async (stats: AgencyStats): Promise<void> => {
  try {
    const statsDocRef = doc(db, 'agency_settings', 'stats');
    await setDoc(statsDocRef, stats, { merge: true });
    localStorage.setItem('nexus_agency_stats', JSON.stringify(stats));
  } catch (e) {
    console.warn('Saving stats locally only:', e);
    localStorage.setItem('nexus_agency_stats', JSON.stringify(stats));
  }
};

export const getAgencyStats = async (): Promise<AgencyStats | null> => {
  try {
    const statsDocRef = doc(db, 'agency_settings', 'stats');
    const docSnap = await getDoc(statsDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as AgencyStats;
    }
  } catch (e) {
    console.warn('Reading stats from local storage fallback:', e);
  }

  try {
    const cached = localStorage.getItem('nexus_agency_stats');
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // LocalStorage fallback error ignored
  }

  return null;
};

// Client Reviews persistence and moderation
export const submitClientReview = async (
  reviewData: Omit<ClientReview, 'id' | 'createdAt' | 'status'>
): Promise<{ id: string; success: boolean }> => {
  const newReview: ClientReview = {
    ...reviewData,
    id: '',
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  try {
    const colRef = collection(db, 'client_reviews');
    const docRef = await addDoc(colRef, {
      name: newReview.name,
      rating: newReview.rating,
      review: newReview.review,
      company: newReview.company || '',
      status: 'pending',
      createdAt: newReview.createdAt,
      serverTime: serverTimestamp(),
    });
    newReview.id = docRef.id;

    // Cache locally as well
    try {
      const stored = localStorage.getItem('nexus_all_client_reviews');
      const list: ClientReview[] = stored ? JSON.parse(stored) : [];
      list.unshift(newReview);
      localStorage.setItem('nexus_all_client_reviews', JSON.stringify(list));
    } catch {}

    return { id: docRef.id, success: true };
  } catch (error) {
    console.warn('Firestore write failed for review, saving to local fallback:', error);
    const fallbackId = 'rev-' + Date.now();
    newReview.id = fallbackId;
    try {
      const stored = localStorage.getItem('nexus_all_client_reviews');
      const list: ClientReview[] = stored ? JSON.parse(stored) : [];
      list.unshift(newReview);
      localStorage.setItem('nexus_all_client_reviews', JSON.stringify(list));
    } catch {}
    return { id: fallbackId, success: true };
  }
};

export const getApprovedReviews = async (): Promise<ClientReview[]> => {
  const list: ClientReview[] = [];
  try {
    const colRef = collection(db, 'client_reviews');
    const q = query(colRef, where('status', '==', 'approved'));
    const snap = await getDocs(q);
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({
        id: docSnap.id,
        name: data.name || 'Anonymous',
        rating: data.rating || 5,
        review: data.review || '',
        company: data.company || '',
        status: 'approved',
        createdAt: data.createdAt || new Date().toISOString(),
      });
    });
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e) {
    console.warn('Could not fetch approved reviews from Firestore:', e);
  }

  // Check local storage for any approved reviews
  try {
    const stored = localStorage.getItem('nexus_all_client_reviews');
    if (stored) {
      const localList: ClientReview[] = JSON.parse(stored);
      for (const item of localList) {
        if (item.status === 'approved' && !list.some((l) => l.id === item.id)) {
          list.push(item);
        }
      }
    }
  } catch {}

  return list;
};

export const getAllReviewsForAdmin = async (): Promise<ClientReview[]> => {
  const map = new Map<string, ClientReview>();
  try {
    const colRef = collection(db, 'client_reviews');
    const snap = await getDocs(colRef);
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      map.set(docSnap.id, {
        id: docSnap.id,
        name: data.name || 'Anonymous',
        rating: data.rating || 5,
        review: data.review || '',
        company: data.company || '',
        status: data.status || 'pending',
        createdAt: data.createdAt || new Date().toISOString(),
      });
    });
  } catch (e) {
    console.warn('Could not fetch all reviews from Firestore for admin:', e);
  }

  try {
    const stored = localStorage.getItem('nexus_all_client_reviews');
    if (stored) {
      const localList: ClientReview[] = JSON.parse(stored);
      for (const item of localList) {
        if (!map.has(item.id)) {
          map.set(item.id, item);
        }
      }
    }
  } catch {}

  const list = Array.from(map.values());
  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return list;
};

export const updateReviewStatus = async (reviewId: string, status: 'approved' | 'rejected'): Promise<void> => {
  try {
    const docRef = doc(db, 'client_reviews', reviewId);
    await updateDoc(docRef, { status });
  } catch (e) {
    console.warn('Could not update review status in Firestore, updating locally:', e);
  }

  try {
    const stored = localStorage.getItem('nexus_all_client_reviews');
    if (stored) {
      const localList: ClientReview[] = JSON.parse(stored);
      const updated = localList.map((item) => (item.id === reviewId ? { ...item, status } : item));
      localStorage.setItem('nexus_all_client_reviews', JSON.stringify(updated));
    }
  } catch {}
};

export const deleteClientReview = async (reviewId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'client_reviews', reviewId);
    await deleteDoc(docRef);
  } catch (e) {
    console.warn('Could not delete review from Firestore, deleting locally:', e);
  }

  try {
    const stored = localStorage.getItem('nexus_all_client_reviews');
    if (stored) {
      const localList: ClientReview[] = JSON.parse(stored);
      const filtered = localList.filter((item) => item.id !== reviewId);
      localStorage.setItem('nexus_all_client_reviews', JSON.stringify(filtered));
    }
  } catch {}
};
