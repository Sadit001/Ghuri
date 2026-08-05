export interface Review {
  id: string;
  targetId: string;
  targetType: 'guide' | 'destination' | 'hotel';
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  text: string;
  photos?: string[];
  createdAt: string;
}

export interface TourGuide {
  id: string;
  agencyId?: string;
  agencyName?: string;
  name: string;
  photo: string;
  yearsOfExperience: number;
  languages: string[];
  rating: number;
  reviews: number;
  specialization: string[];
  pricePerDay: number;
  bio: string;
  location: string;
  bookedDates?: string[];
  userReviews?: Review[];
}

export interface Agency {
  id: string;
  name: string;
  division: string;
  logo: string;
  rating: number;
  reviewsCount: number;
  description: string;
  contactNumber: string;
  email: string;
  address: string;
  guides: TourGuide[];
}

export interface GuideBookingCheckRequest {
  guideId: string;
  startDate: string;
  endDate: string;
}

export interface BookGuideDto {
  guideId: string;
  startDate: string;
  endDate: string;
  specialRequests?: string;
}
