export type Division = 'Dhaka' | 'Chattogram' | 'Rajshahi' | 'Khulna' | 'Barishal' | 'Sylhet' | 'Rangpur' | 'Mymensingh';
export type Category = 'Historical' | 'Natural/Scenic' | 'Hill/Hill-Tracts' | 'Sea/Beach' | 'River/Waterfall' | 'Religious' | 'Adventure/Wildlife' | 'Urban/Modern';

export interface Hotel {
  id: string;
  name: string;
  division: Division;
  destination?: string;
  images: string[];
  ratePerNight: number;
  rating: number;
  reviews: number;
  amenities: string[];
  distanceFromDestination?: number;
  description: string;
  availability: boolean;
}

export interface Destination {
  id: string;
  name: string;
  division: Division;
  categories: Category[];
  rating: number;
  reviews: number;
  description: string;
  fullHistory: string;
  images: string[];
  localEntryFee: number;
  foreignEntryFee: number;
  openingHours: string;
  amenities?: string[];
  bestTimeToVisit: {
    season: string;
    timeOfDay: string;
  };
  transportOptions: {
    type: 'Bus' | 'CNG' | 'Rickshaw' | 'Ride-share' | 'Train' | 'Air' | 'Boat' | 'Ferry';
    estimatedTime: string;
    fareRange: { min: number; max: number };
  }[];
  fairPriceGuide?: {
    item: string;
    description: string;
    priceRange: { min: number; max: number };
  }[];
  nearbyHotels: Hotel[];
  nearbyFood: {
    name: string;
    description: string;
    priceRange: { min: number; max: number };
  }[];
  safetyTips: string[];
  userReviews: {
    author: string;
    rating: number;
    text: string;
    photos: string[];
  }[];
  estimatedVisitDuration: string;
}
