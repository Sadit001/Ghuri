import { db } from '../config/firebase';
import { COLLECTIONS } from '../constants/collections';
import { Complaint, ComplaintStatus, Feedback } from '../types/feedback';

export class FeedbackRepository {
  private colFeedback = db.collection(COLLECTIONS.FEEDBACK);
  private colComplaints = db.collection(COLLECTIONS.COMPLAINTS);

  async saveFeedback(feedback: Omit<Feedback, 'id' | 'createdAt'>): Promise<Feedback> {
    const docRef = await this.colFeedback.add({
      ...feedback,
      createdAt: new Date().toISOString(),
    });
    const saved: Feedback = {
      ...feedback,
      id: docRef.id,
      createdAt: new Date().toISOString(),
    };
    await this.colFeedback.doc(docRef.id).set(saved, { merge: true });
    return saved;
  }

  async saveComplaint(complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>): Promise<Complaint> {
    const docRef = await this.colComplaints.add({
      ...complaint,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    const saved: Complaint = {
      ...complaint,
      id: docRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await this.colComplaints.doc(docRef.id).set(saved, { merge: true });
    return saved;
  }

  async findComplaintsByUserId(userId: string): Promise<Complaint[]> {
    const snapshot = await this.colComplaints.where('userId', '==', userId).get();
    return snapshot.docs.map((d: any) => d.data() as Complaint);
  }

  async findComplaintById(id: string): Promise<Complaint | null> {
    const docSnap = await this.colComplaints.doc(id).get();
    if (!docSnap.exists) return null;
    return docSnap.data() as Complaint;
  }

  async updateComplaintStatus(id: string, status: ComplaintStatus, adminResponse?: string): Promise<Complaint | null> {
    const existing = await this.findComplaintById(id);
    if (!existing) return null;
    const updated: Complaint = {
      ...existing,
      status,
      ...(adminResponse && { adminResponse }),
      updatedAt: new Date().toISOString(),
    };
    await this.colComplaints.doc(id).set(updated, { merge: true });
    return updated;
  }
}

export const feedbackRepository = new FeedbackRepository();
