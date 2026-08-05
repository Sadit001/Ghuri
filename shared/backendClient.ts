/**
 * Ghuri Travel Node.js Backend API Client
 * 
 * Provides easy integration methods for the React Native frontend to communicate
 * with the Node.js Express backend (http://localhost:5000/api).
 */

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

const request = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<{ success: boolean; message: string; data?: T; error?: any }> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(`Backend API Error [${endpoint}]:`, error);
    return {
      success: false,
      message: error.message || 'Failed to communicate with backend server.',
    };
  }
};

export const backendApi = {
  // Health
  checkHealth: () => request('/health'),

  // Auth
  register: (userData: any) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials: { email: string; password: string }) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  getCurrentUser: () => request('/auth/me'),

  // User Profile & Preferences
  getProfile: () => request('/profile'),
  updateProfile: (profileData: any) => request('/profile', { method: 'PUT', body: JSON.stringify(profileData) }),
  getUserStats: () => request('/profile/stats'),
  getPreferences: () => request('/profile/preferences'),
  updatePreferences: (preferences: { language?: string; theme?: string }) => request('/profile/preferences', { method: 'PUT', body: JSON.stringify(preferences) }),

  // Trips
  createTrip: (tripData: any) => request('/trips', { method: 'POST', body: JSON.stringify(tripData) }),
  getUserTrips: () => request('/trips'),
  getTripById: (id: string) => request(`/trips/${id}`),
  updateTrip: (id: string, tripData: any) => request(`/trips/${id}`, { method: 'PUT', body: JSON.stringify(tripData) }),
  deleteTrip: (id: string) => request(`/trips/${id}`, { method: 'DELETE' }),
  calculateTripCost: (params: any) => request('/trips/calculate-cost', { method: 'POST', body: JSON.stringify(params) }),

  // Bookings
  createBooking: (bookingData: any) => request('/bookings', { method: 'POST', body: JSON.stringify(bookingData) }),
  getUserBookings: (status?: string, type?: string) => request(`/bookings?${new URLSearchParams({ ...(status && { status }), ...(type && { type }) })}`),
  getBookingById: (id: string) => request(`/bookings/${id}`),
  updateBookingStatus: (id: string, status: string) => request(`/bookings/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  cancelBooking: (id: string) => request(`/bookings/${id}/cancel`, { method: 'POST' }),

  // Tour Guides & Agencies
  getGuides: (division?: string, specialization?: string) => request(`/guides?${new URLSearchParams({ ...(division && { division }), ...(specialization && { specialization }) })}`),
  getGuideById: (id: string) => request(`/guides/${id}`),
  checkGuideAvailability: (guideId: string, startDate: string, endDate: string) => request('/guides/check-availability', { method: 'POST', body: JSON.stringify({ guideId, startDate, endDate }) }),
  bookGuide: (bookingData: { guideId: string; startDate: string; endDate: string; specialRequests?: string }) => request('/guides/book', { method: 'POST', body: JSON.stringify(bookingData) }),
  submitGuideReview: (guideId: string, review: { rating: number; text: string; photos?: string[] }) => request(`/guides/${guideId}/reviews`, { method: 'POST', body: JSON.stringify(review) }),
  getAgencies: (division?: string) => request(`/agencies?${new URLSearchParams({ ...(division && { division }) })}`),
  getAgencyById: (id: string) => request(`/agencies/${id}`),

  // Destinations & Hotels
  getDestinations: (division?: string, category?: string, search?: string) => request(`/destinations?${new URLSearchParams({ ...(division && { division }), ...(category && { category }), ...(search && { search }) })}`),
  getDestinationById: (id: string) => request(`/destinations/${id}`),
  getHotels: (division?: string, destination?: string) => request(`/hotels?${new URLSearchParams({ ...(division && { division }), ...(destination && { destination }) })}`),
  getHotelById: (id: string) => request(`/hotels/${id}`),

  // Feedback & Complaints
  submitFeedback: (feedback: { category: string; message: string; images?: string[] }) => request('/feedback', { method: 'POST', body: JSON.stringify(feedback) }),
  submitComplaint: (complaint: { bookingId?: string; subject: string; description: string; images?: string[] }) => request('/complaints', { method: 'POST', body: JSON.stringify(complaint) }),
  getUserComplaints: () => request('/complaints'),
};
