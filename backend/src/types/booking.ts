import { TripPlan } from './trip';

export type BookingType = 'trip' | 'guide' | 'hotel' | 'spot' | 'complaint';
export type BookingStatus = 'Confirmed' | 'Upcoming' | 'Completed' | 'Cancelled' | 'Pending';

export interface GuideBookingMeta {
  guideId: string;
  guideName: string;
  agencyId?: string;
  agencyName?: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  pricePerDay: number;
  status: BookingStatus;
}

export interface HotelBookingMeta {
  hotelId: string;
  hotelName: string;
  nights: number;
  roomType: string;
  pricePerNight: number;
}

export interface SpotBookingMeta {
  destinationId: string;
  destinationName: string;
  division: string;
  location: string;
}

export interface ComplaintMeta {
  complaintId: string;
  subject: string;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
}

export interface Booking {
  id: string;
  userId: string;
  type: BookingType;
  title: string;
  date: string;
  status: BookingStatus;
  cost: number;
  details: string;
  guideMeta?: GuideBookingMeta;
  hotelMeta?: HotelBookingMeta;
  spotMeta?: SpotBookingMeta;
  tripPlan?: TripPlan;
  complaintMeta?: ComplaintMeta;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingDto {
  type: BookingType;
  title: string;
  date: string;
  cost: number;
  details: string;
  guideMeta?: GuideBookingMeta;
  hotelMeta?: HotelBookingMeta;
  spotMeta?: SpotBookingMeta;
  tripPlan?: TripPlan;
}
