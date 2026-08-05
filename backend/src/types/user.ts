export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  contactNumber: string;
  gender: 'Male' | 'Female';
  documentType?: 'NID' | 'Passport';
  documentFront?: string;
  documentBack?: string;
  avatar?: string;
  memberSince: string;
  language?: 'bn' | 'en';
  theme?: 'light' | 'dark';
  badges?: string[];
  stats?: {
    totalTrips: number;
    completedTrips: number;
    guideBookings: number;
    savedSpots: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface UserRegistrationDto {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  gender: 'Male' | 'Female';
  documentType?: 'NID' | 'Passport';
  documentFront?: string;
  documentBack?: string;
  language?: 'bn' | 'en';
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserPreferencesDto {
  language?: 'bn' | 'en';
  theme?: 'light' | 'dark';
}
