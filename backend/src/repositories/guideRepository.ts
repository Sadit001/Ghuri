import { db } from '../config/firebase';
import { COLLECTIONS } from '../constants/collections';
import { Agency, Review, TourGuide } from '../types/guide';
import { INITIAL_AGENCIES, INITIAL_TOUR_GUIDES } from '../utils/seedData';

export class GuideRepository {
  private colGuides = db.collection(COLLECTIONS.TOUR_GUIDES);
  private colAgencies = db.collection(COLLECTIONS.AGENCIES);
  private colReviews = db.collection(COLLECTIONS.REVIEWS);

  constructor() {
    this.initSeedData();
  }

  private async initSeedData() {
    try {
      const snapshot = await this.colGuides.get();
      if (snapshot.docs.length === 0) {
        for (const guide of INITIAL_TOUR_GUIDES) {
          await this.colGuides.doc(guide.id).set(guide);
        }
        for (const agency of INITIAL_AGENCIES) {
          const agencyGuides = INITIAL_TOUR_GUIDES.filter((g) => g.agencyId === agency.id);
          await this.colAgencies.doc(agency.id).set({ ...agency, guides: agencyGuides });
        }
      }
    } catch (e) {
      console.warn('Seed data init error in GuideRepository:', e);
    }
  }

  async findAllGuides(filters?: { division?: string; specialization?: string }): Promise<TourGuide[]> {
    const snapshot = await this.colGuides.get();
    let guides = snapshot.docs.map((d: any) => d.data() as TourGuide);

    if (filters?.division) {
      const divLower = filters.division.toLowerCase();
      guides = guides.filter((g: TourGuide) => g.location.toLowerCase().includes(divLower));
    }
    if (filters?.specialization) {
      const specLower = filters.specialization.toLowerCase();
      guides = guides.filter((g: TourGuide) => g.specialization.some((s: string) => s.toLowerCase().includes(specLower)));
    }

    return guides;
  }

  async findGuideById(id: string): Promise<TourGuide | null> {
    const docSnap = await this.colGuides.doc(id).get();
    if (!docSnap.exists) {
      // Fallback check in seed data
      const found = INITIAL_TOUR_GUIDES.find((g) => g.id === id);
      return found || null;
    }
    return docSnap.data() as TourGuide;
  }

  async updateGuideBookedDates(guideId: string, newDates: string[]): Promise<TourGuide | null> {
    const guide = await this.findGuideById(guideId);
    if (!guide) return null;
    const currentDates = guide.bookedDates || [];
    const updatedDates = Array.from(new Set([...currentDates, ...newDates]));
    const updated = { ...guide, bookedDates: updatedDates };
    await this.colGuides.doc(guideId).set(updated, { merge: true });
    return updated;
  }

  async findAllAgencies(division?: string): Promise<Agency[]> {
    const snapshot = await this.colAgencies.get();
    let agencies = snapshot.docs.map((d: any) => d.data() as Agency);
    if (agencies.length === 0) agencies = INITIAL_AGENCIES;

    if (division) {
      const divLower = division.toLowerCase();
      agencies = agencies.filter((a: Agency) => a.division.toLowerCase() === divLower);
    }

    return agencies;
  }

  async findAgencyById(id: string): Promise<Agency | null> {
    const docSnap = await this.colAgencies.doc(id).get();
    if (!docSnap.exists) {
      const found = INITIAL_AGENCIES.find((a) => a.id === id);
      return found || null;
    }
    return docSnap.data() as Agency;
  }

  async addReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    const docRef = await this.colReviews.add({
      ...review,
      createdAt: new Date().toISOString(),
    });
    const savedReview: Review = {
      ...review,
      id: docRef.id,
      createdAt: new Date().toISOString(),
    };
    await this.colReviews.doc(docRef.id).set(savedReview, { merge: true });

    // Update rating on guide if targetType === 'guide'
    if (review.targetType === 'guide') {
      const guide = await this.findGuideById(review.targetId);
      if (guide) {
        const totalReviews = (guide.reviews || 0) + 1;
        const newRating = Number((((guide.rating || 5) * (guide.reviews || 0) + review.rating) / totalReviews).toFixed(1));
        const updatedReviews = [...(guide.userReviews || []), savedReview];
        await this.colGuides.doc(guide.id).set({
          ...guide,
          rating: newRating,
          reviews: totalReviews,
          userReviews: updatedReviews,
        }, { merge: true });
      }
    }

    return savedReview;
  }
}

export const guideRepository = new GuideRepository();
