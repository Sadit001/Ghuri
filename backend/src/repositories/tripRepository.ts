import { db } from '../config/firebase';
import { COLLECTIONS } from '../constants/collections';
import { TripPlan } from '../types/trip';

export class TripRepository {
  private col = db.collection(COLLECTIONS.TRIPS);

  async create(trip: TripPlan): Promise<TripPlan> {
    const docRef = await this.col.add({
      ...trip,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    const savedTrip = { ...trip, id: docRef.id };
    await this.col.doc(docRef.id).set(savedTrip, { merge: true });
    return savedTrip;
  }

  async findById(id: string): Promise<TripPlan | null> {
    const docSnap = await this.col.doc(id).get();
    if (!docSnap.exists) return null;
    return docSnap.data() as TripPlan;
  }

  async findByUserId(userId: string): Promise<TripPlan[]> {
    const snapshot = await this.col.where('userId', '==', userId).get();
    return snapshot.docs.map((doc: any) => doc.data() as TripPlan);
  }

  async update(id: string, tripData: Partial<TripPlan>): Promise<TripPlan | null> {
    const existing = await this.findById(id);
    if (!existing) return null;
    const updated = {
      ...existing,
      ...tripData,
      updatedAt: new Date().toISOString(),
    };
    await this.col.doc(id).set(updated, { merge: true });
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const existing = await this.findById(id);
    if (!existing) return false;
    await this.col.doc(id).delete();
    return true;
  }
}

export const tripRepository = new TripRepository();
