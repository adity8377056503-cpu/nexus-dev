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
  setDoc, 
  doc, 
  getDoc,
  getDocFromServer,
  updateDoc,
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import type { ProjectInquiry, AgencyStats, ClientReview } from '../types';
import firebaseConfigData from '../../firebase-applet-config.json';
import { sendInquiryEmailNotification } from './notifications';

export const FIREBASE_PROJECT_ID = 
  import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigData.projectId;
export const FIREBASE_AUTH_DOMAIN = 
  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigData.authDomain;

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfigData.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigData.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigData.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigData.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigData.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfigData.appId,
};

// Initialize single Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize single Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore (handles both (default) and custom database IDs)
const configuredDbId = import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfigData.firestoreDatabaseId;
export const db = configuredDbId && configuredDbId !== '(default)'
  ? getFirestore(app, configuredDbId)
  : getFirestore(app);

// Connection validation per Firebase guidelines
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'agency_settings', 'stats'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection notice: client is offline or network unavailable.');
    }
  }
}
testFirestoreConnection();

// Role-based admin check helper
export const checkIsAdmin = (user: User | null): boolean => {
  if (!user || !user.email) return false;
  const adminEmail = 'adity8377056503@gmail.com';
  return user.email.toLowerCase() === adminEmail.toLowerCase() || (user as any).role === 'admin';
};

// Authentication helper functions directly backed by Firebase Authentication (Google Auth)
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
    console.error('Error signing out from Firebase:', error);
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

    // Safely trigger email notification in the background (non-blocking)
    const fullInquiry: ProjectInquiry = { ...newInquiry, id: docRef.id };
    sendInquiryEmailNotification(fullInquiry, docRef.id).catch((err) => {
      console.warn('Inquiry email notification background status:', err);
    });

    return { id: docRef.id, success: true };
  } catch (error) {
    console.error('Firestore inquiry submission failed:', error);
    throw error;
  }
};

export const getUserInquiries = async (userId: string, userEmail?: string): Promise<ProjectInquiry[]> => {
  if (!userId) return [];
  const inquiries: ProjectInquiry[] = [];

  try {
    const colRef = collection(db, 'project_inquiries');
    const q = query(colRef, where('userId', '==', userId));
    const snap = await getDocs(q);
    snap.forEach((docSnap) => {
      inquiries.push({ id: docSnap.id, ...(docSnap.data() as Omit<ProjectInquiry, 'id'>) });
    });

    // If no records found by userId but userEmail exists, check userEmail (for inquiries submitted before login)
    if (inquiries.length === 0 && userEmail) {
      const qEmail = query(colRef, where('email', '==', userEmail));
      const snapEmail = await getDocs(qEmail);
      snapEmail.forEach((docSnap) => {
        if (!inquiries.some((item) => item.id === docSnap.id)) {
          inquiries.push({ id: docSnap.id, ...(docSnap.data() as Omit<ProjectInquiry, 'id'>) });
        }
      });
    }

    inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e) {
    console.error('Error fetching inquiries from Firestore:', e);
    throw e;
  }

  return inquiries;
};

// Agency Stats persistence
export const saveAgencyStats = async (stats: AgencyStats): Promise<void> => {
  if (!checkIsAdmin(auth.currentUser)) {
    throw new Error('Unauthorized: Admin privileges required.');
  }
  try {
    const statsDocRef = doc(db, 'agency_settings', 'stats');
    await setDoc(statsDocRef, stats, { merge: true });
  } catch (e) {
    console.error('Saving stats to Firestore failed:', e);
    throw e;
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
    console.warn('Reading stats from Firestore failed:', e);
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
    return { id: docRef.id, success: true };
  } catch (error) {
    console.error('Firestore review submission failed:', error);
    throw error;
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
  return list;
};

export const getAllReviewsForAdmin = async (): Promise<ClientReview[]> => {
  if (!checkIsAdmin(auth.currentUser)) {
    throw new Error('Unauthorized: Admin privileges required.');
  }
  const list: ClientReview[] = [];
  try {
    const colRef = collection(db, 'client_reviews');
    const snap = await getDocs(colRef);
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({
        id: docSnap.id,
        name: data.name || 'Anonymous',
        rating: data.rating || 5,
        review: data.review || '',
        company: data.company || '',
        status: data.status || 'pending',
        createdAt: data.createdAt || new Date().toISOString(),
      });
    });
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e) {
    console.error('Could not fetch all reviews from Firestore for admin:', e);
    throw e;
  }
  return list;
};

export const updateReviewStatus = async (reviewId: string, status: 'approved' | 'rejected'): Promise<void> => {
  if (!checkIsAdmin(auth.currentUser)) {
    throw new Error('Unauthorized: Admin privileges required.');
  }
  try {
    const docRef = doc(db, 'client_reviews', reviewId);
    await updateDoc(docRef, { status });
  } catch (e) {
    console.error('Could not update review status in Firestore:', e);
    throw e;
  }
};

export const deleteClientReview = async (reviewId: string): Promise<void> => {
  if (!checkIsAdmin(auth.currentUser)) {
    throw new Error('Unauthorized: Admin privileges required.');
  }
  try {
    const docRef = doc(db, 'client_reviews', reviewId);
    await deleteDoc(docRef);
  } catch (e) {
    console.error('Could not delete review from Firestore:', e);
    throw e;
  }
};
