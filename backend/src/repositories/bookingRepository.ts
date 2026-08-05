import { db } from '../config/firebase';
import { COLLECTIONS } from '../constants/collections';
import { Booking, BookingStatus, BookingType } from '../types/booking';

export class BookingRepository {
  private col = db.collection(COLLECTIONS.BOOKINGS);

  async create(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    const docRef = await this.col.add({
      ...booking,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    const savedBooking: Booking = {
      ...booking,
      id: docRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await this.col.doc(docRef.id).set(savedBooking, { merge: true });
    return savedBooking;
  }

  async findById(id: string): Promise<Booking | null> {
    const docSnap = await this.col.doc(id).get();
    if (!docSnap.exists) return null;
    return docSnap.data() as Booking;
  }

  async findByUserId(userId: string, filter?: { status?: BookingStatus; type?: BookingType }): Promise<Booking[]> {
    const snapshot = await this.col.where('userId', '==', userId).get();
    let bookings = snapshot.docs.map((doc: any) => doc.data() as Booking);

    if (filter?.status) {
      bookings = bookings.filter((b: Booking) => b.status === filter.status);
    }
    if (filter?.type) {
      bookings = bookings.filter((b: Booking) => b.type === filter.type);
    }

    return bookings.sort((a: Booking, b: Booking) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking | null> {
    const existing = await this.findById(id);
    if (!existing) return null;
    const updated = {
      ...existing,
      status,
      updatedAt: new Date().toISOString(),
    };
    await this.col.doc(id).set(updated, { merge: true });
    return updated;
  }
}

export const bookingRepository = new BookingRepository();
