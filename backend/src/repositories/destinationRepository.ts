import { db } from '../config/firebase';
import { COLLECTIONS } from '../constants/collections';
import { Destination, Hotel } from '../types/destination';
import { INITIAL_DESTINATIONS, INITIAL_HOTELS } from '../utils/seedData';

export class DestinationRepository {
  private colDestinations = db.collection(COLLECTIONS.DESTINATIONS);
  private colHotels = db.collection(COLLECTIONS.HOTELS);

  constructor() {
    this.initSeedData();
  }

  private async initSeedData() {
    try {
      const snapshot = await this.colDestinations.get();
      if (snapshot.docs.length === 0) {
        for (const dest of INITIAL_DESTINATIONS) {
          await this.colDestinations.doc(dest.id).set(dest);
        }
        for (const hotel of INITIAL_HOTELS) {
          await this.colHotels.doc(hotel.id).set(hotel);
        }
      }
    } catch (e) {
      console.warn('Seed data init error in DestinationRepository:', e);
    }
  }

  async findAll(query?: { division?: string; category?: string; search?: string }): Promise<Destination[]> {
    const snapshot = await this.colDestinations.get();
    let items = snapshot.docs.map((d: any) => d.data() as Destination);
    if (items.length === 0) items = INITIAL_DESTINATIONS;

    if (query?.division) {
      const divLower = query.division.toLowerCase();
      items = items.filter((d: Destination) => d.division.toLowerCase() === divLower);
    }
    if (query?.category) {
      const catLower = query.category.toLowerCase();
      items = items.filter((d: Destination) => d.categories.some((c: string) => c.toLowerCase() === catLower));
    }
    if (query?.search) {
      const q = query.search.toLowerCase();
      items = items.filter(
        (d: Destination) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.division.toLowerCase().includes(q)
      );
    }

    return items;
  }

  async findById(id: string): Promise<Destination | null> {
    const docSnap = await this.colDestinations.doc(id).get();
    if (!docSnap.exists) {
      const found = INITIAL_DESTINATIONS.find((d) => d.id === id || d.name.toLowerCase().includes(id.toLowerCase()));
      return found || null;
    }
    return docSnap.data() as Destination;
  }

  async findAllHotels(query?: { division?: string; destination?: string }): Promise<Hotel[]> {
    const snapshot = await this.colHotels.get();
    let hotels = snapshot.docs.map((d: any) => d.data() as Hotel);
    if (hotels.length === 0) hotels = INITIAL_HOTELS;

    if (query?.division) {
      const divLower = query.division.toLowerCase();
      hotels = hotels.filter((h: Hotel) => h.division.toLowerCase() === divLower);
    }
    if (query?.destination) {
      const destLower = query.destination.toLowerCase();
      hotels = hotels.filter((h: Hotel) => h.destination?.toLowerCase().includes(destLower));
    }

    return hotels;
  }

  async findHotelById(id: string): Promise<Hotel | null> {
    const docSnap = await this.colHotels.doc(id).get();
    if (!docSnap.exists) {
      const found = INITIAL_HOTELS.find((h) => h.id === id);
      return found || null;
    }
    return docSnap.data() as Hotel;
  }
}

export const destinationRepository = new DestinationRepository();
