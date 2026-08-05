import { db } from '../config/firebase';
import { COLLECTIONS } from '../constants/collections';
import { UserProfile } from '../types/user';

export class UserRepository {
  private col = db.collection(COLLECTIONS.USERS);

  async findByEmail(email: string): Promise<UserProfile | null> {
    const trimmedEmail = email.trim().toLowerCase();
    const snapshot = await this.col.where('email', '==', trimmedEmail).get();
    if (snapshot.docs.length === 0) return null;
    return snapshot.docs[0].data() as UserProfile;
  }

  async findById(uid: string): Promise<UserProfile | null> {
    const docSnap = await this.col.doc(uid).get();
    if (!docSnap.exists) return null;
    return docSnap.data() as UserProfile;
  }

  async save(profile: UserProfile): Promise<UserProfile> {
    const profileToSave = {
      ...profile,
      email: profile.email.toLowerCase().trim(),
      updatedAt: new Date().toISOString(),
    };
    await this.col.doc(profile.uid).set(profileToSave, { merge: true });
    return profileToSave;
  }

  async update(uid: string, data: Partial<UserProfile>): Promise<UserProfile | null> {
    const existing = await this.findById(uid);
    if (!existing) return null;
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    await this.col.doc(uid).set(updated, { merge: true });
    return updated;
  }
}

export const userRepository = new UserRepository();
