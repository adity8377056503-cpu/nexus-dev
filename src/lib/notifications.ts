import type { ProjectInquiry } from '../types';

export const ADMIN_NOTIFICATION_EMAIL = 'adity8377056503@gmail.com';

export interface NotificationPayload {
  inquiryId: string;
  inquiry: ProjectInquiry;
}

/**
 * Dispatches an email notification for newly created Firestore project inquiries.
 * Operates client-side without exposing private API secrets, requiring paid subscriptions,
 * or interfering with the primary Firestore persistence flow.
 */
export async function sendInquiryEmailNotification(
  inquiry: ProjectInquiry,
  inquiryId: string
): Promise<{ success: boolean; message?: string }> {
  const formattedDate = inquiry.createdAt
    ? new Date(inquiry.createdAt).toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'medium',
      })
    : new Date().toLocaleString();

  const emailPayload = {
    _subject: `🚀 New Project Inquiry from ${inquiry.name} (${inquiry.projectType}) | Nexus Devs`,
    _template: 'table',
    _captcha: 'false',
    _replyto: inquiry.email,
    'Client Name': inquiry.name,
    'Client Email': inquiry.email,
    'Company / Brand': inquiry.company?.trim() || 'Not specified',
    'Project Service': inquiry.projectType,
    'Budget Range': inquiry.budget || 'Not specified',
    'Target Timeline': inquiry.timeline || 'Not specified',
    'Project Description': inquiry.description,
    'Submission Timestamp': formattedDate,
    'Inquiry Document ID': inquiryId,
    'Client User ID': inquiry.userId || 'Guest Submission (Unauthenticated)',
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${ADMIN_NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message || 'Notification queued successfully.' };
    } else {
      console.warn('FormSubmit notification response not OK:', response.status);
      return { success: false, message: `Notification server returned status ${response.status}` };
    }
  } catch (error) {
    // Non-fatal: Log error so inquiry submission remains 100% successful
    console.warn('Email notification dispatch notice (non-fatal):', error);
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
}
