export type GuideBookingStatus = 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';

export interface GuideBooking {
  id: string;
  guideId: string;
  agencyId: string;
  guideName: string;
  agencyName: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelerCount: number;
  contactNumber: string;
  hotelName: string;
  hotelAddress?: string;
  specialRequests?: string;
  createdAt: string;
  status: GuideBookingStatus;
  review?: {
    rating: number;
    comment: string;
    createdAt: string;
  };
}

export interface GuideAgency {
  id: string;
  name: string;
  logo: string;
  shortDescription: string;
  fullDescription: string;
  division: string;
  officeAddress: string;
  contactNumber: string;
  email: string;
  website?: string;
  yearsOfExperience: number;
  rating: number;
  reviewCount: number;
  activeGuides: number;
  coveredDestinations: string[];
  startingPrice: number;
  guides: GuideProfile[];
  reviews: GuideReview[];
}

export interface GuideProfile {
  id: string;
  agencyId: string;
  name: string;
  photo: string;
  age: number;
  division: string;
  languages: string[];
  yearsOfExperience: number;
  fee: number;
  status: 'Available' | 'On Duty';
  rating: number;
  reviewCount: number;
  specialization: string[];
  expertise: string[];
  totalToursCompleted: number;
  popularDestinations: string[];
  certifications: string[];
  safetyTraining: string[];
  awards: string[];
  bio: string;
  reviews: GuideReview[];
}

export interface GuideReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const parseDate = (value: string) => new Date(`${value}T00:00:00`);

export const hasGuideBookingConflict = (
  bookings: GuideBooking[],
  guideId: string,
  startDate: string,
  endDate: string,
) => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  return bookings.some((booking) => {
    if (booking.guideId !== guideId) return false;
    if (booking.status === 'Cancelled') return false;
    const bookingStart = parseDate(booking.startDate);
    const bookingEnd = parseDate(booking.endDate);
    return start <= bookingEnd && end >= bookingStart;
  });
};

export const getGuideBookingStatus = (startDate: string, endDate: string): GuideBookingStatus => {
  const today = new Date();
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const todayDate = new Date(`${today.toISOString().slice(0, 10)}T00:00:00`);

  if (todayDate < start) return 'Upcoming';
  if (todayDate > end) return 'Completed';
  if (todayDate.getTime() === start.getTime()) return 'Ongoing';
  return 'Ongoing';
};

export const buildGuideAgencies = (): GuideAgency[] => [
  {
    id: 'agency-elegant-travel',
    name: 'Elegant Travel Co.',
    logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
    shortDescription: 'Premium local guides for beaches, hills, and cultural escapes.',
    fullDescription: 'Elegant Travel Co. curates high-touch guide experiences with certified professionals, curated transport, and in-depth local knowledge for adventure and cultural journeys.',
    division: 'Chattogram',
    officeAddress: 'GEC Circle, Chattogram',
    contactNumber: '+8801712345678',
    email: 'hello@eleganttravel.com',
    website: 'https://eleganttravel.com',
    yearsOfExperience: 12,
    rating: 4.9,
    reviewCount: 312,
    activeGuides: 8,
    coveredDestinations: ['Cox\'s Bazar', 'Sajek Valley', 'Bandarban', 'Saint Martin'],
    startingPrice: 2500,
    guides: [
      {
        id: 'guide-1',
        agencyId: 'agency-elegant-travel',
        name: 'Ahsan Rahman',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        age: 31,
        division: 'Chattogram',
        languages: ['Bengali', 'English', 'Arabic'],
        yearsOfExperience: 8,
        fee: 3200,
        status: 'Available',
        rating: 4.9,
        reviewCount: 88,
        specialization: ['Beach Tours', 'Adventure Tours', 'Photography'],
        expertise: ['Beach Tours', 'Adventure Tours', 'Photography', 'Swimming Assistance'],
        totalToursCompleted: 142,
        popularDestinations: ['Cox\'s Bazar', 'Saint Martin', 'Bandarban'],
        certifications: ['Certified Tour Guide', 'First Aid'],
        safetyTraining: ['Emergency First Aid', 'Water Safety'],
        awards: ['Best Coastal Guide 2024'],
        bio: 'A calm, safety-first guide who knows the coast and island routes in detail.',
        reviews: [
          { id: 'r1', userName: 'Mina', rating: 5, comment: 'Excellent coastal knowledge and calm pacing.', date: '2025-05-01' },
          { id: 'r2', userName: 'Rafi', rating: 5, comment: 'Very professional and friendly.', date: '2025-04-20' },
        ],
      },
      {
        id: 'guide-2',
        agencyId: 'agency-elegant-travel',
        name: 'Nadia Islam',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        age: 29,
        division: 'Chattogram',
        languages: ['Bengali', 'English', 'Hindi'],
        yearsOfExperience: 6,
        fee: 2800,
        status: 'On Duty',
        rating: 4.8,
        reviewCount: 71,
        specialization: ['Nature Tours', 'Hill Tracts', 'Camping'],
        expertise: ['Nature Tours', 'Hill Tracts', 'Camping', 'Local Culture'],
        totalToursCompleted: 96,
        popularDestinations: ['Sajek Valley', 'Bandarban', 'Ruma'],
        certifications: ['Certified Tour Guide'],
        safetyTraining: ['First Aid'],
        awards: [],
        bio: 'Known for scenic treks, camping support, and well-paced hill itineraries.',
        reviews: [
          { id: 'r3', userName: 'Sadia', rating: 5, comment: 'Loved the camping setup and local stories.', date: '2025-03-22' },
        ],
      },
      {
        id: 'guide-3',
        agencyId: 'agency-elegant-travel',
        name: 'Tahmid Hasan',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        age: 34,
        division: 'Chattogram',
        languages: ['Bengali', 'English'],
        yearsOfExperience: 10,
        fee: 3100,
        status: 'Available',
        rating: 4.9,
        reviewCount: 97,
        specialization: ['Historical Tours', 'Photography', 'Local Culture'],
        expertise: ['Historical Tours', 'Photography', 'Local Culture', 'Transportation Knowledge'],
        totalToursCompleted: 164,
        popularDestinations: ['Cox\'s Bazar', 'Chattogram', 'Rangamati'],
        certifications: ['Certified Tour Guide', 'Heritage Guide'],
        safetyTraining: ['Emergency First Aid'],
        awards: ['Excellence in Cultural Tours'],
        bio: 'Brings deep heritage knowledge and polished pacing for small groups.',
        reviews: [
          { id: 'r4', userName: 'Jamal', rating: 5, comment: 'Great pacing and superb cultural storytelling.', date: '2025-04-11' },
        ],
      },
      {
        id: 'guide-4',
        agencyId: 'agency-elegant-travel',
        name: 'Farah Chowdhury',
        photo: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
        age: 27,
        division: 'Chattogram',
        languages: ['Bengali', 'English', 'Spanish'],
        yearsOfExperience: 4,
        fee: 2600,
        status: 'Available',
        rating: 4.7,
        reviewCount: 54,
        specialization: ['Food Tours', 'Photography', 'Cultural Tours'],
        expertise: ['Food Tours', 'Photography', 'Local Culture', 'Transportation Knowledge'],
        totalToursCompleted: 72,
        popularDestinations: ['Cox\'s Bazar', 'Bandarban'],
        certifications: ['Certified Tour Guide'],
        safetyTraining: ['First Aid'],
        awards: [],
        bio: 'Energetic guide focused on food, storytelling, and city-to-coast experiences.',
        reviews: [{ id: 'r5', userName: 'Tanzim', rating: 4, comment: 'Wonderful local food stops.', date: '2025-02-14' }],
      },
      {
        id: 'guide-5',
        agencyId: 'agency-elegant-travel',
        name: 'Imran Hossain',
        photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400',
        age: 33,
        division: 'Chattogram',
        languages: ['Bengali', 'English'],
        yearsOfExperience: 9,
        fee: 2950,
        status: 'Available',
        rating: 4.8,
        reviewCount: 64,
        specialization: ['Wildlife Tours', 'Adventure Tours', 'Boat Trips'],
        expertise: ['Wildlife Tours', 'Adventure Tours', 'Swimming Assistance', 'Local Transportation Knowledge'],
        totalToursCompleted: 118,
        popularDestinations: ['Saint Martin', 'Sundarbans', 'Cox\'s Bazar'],
        certifications: ['Certified Tour Guide', 'Marine Safety'],
        safetyTraining: ['Water Safety', 'Emergency First Aid'],
        awards: ['Top Adventure Guide'],
        bio: 'A dependable guide for island, boat, and wildlife experiences with strong safety habits.',
        reviews: [{ id: 'r6', userName: 'Pial', rating: 5, comment: 'Very dependable for boat rides and island trips.', date: '2025-03-28' }],
      },
      {
        id: 'guide-6',
        agencyId: 'agency-elegant-travel',
        name: 'Saira Akter',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
        age: 30,
        division: 'Chattogram',
        languages: ['Bengali', 'English', 'German'],
        yearsOfExperience: 7,
        fee: 2900,
        status: 'On Duty',
        rating: 4.8,
        reviewCount: 61,
        specialization: ['Religious Tourism', 'Culture Tours', 'Historical Tours'],
        expertise: ['Religious Tourism', 'Culture Tours', 'Historical Tours', 'Local Culture'],
        totalToursCompleted: 109,
        popularDestinations: ['Chattogram', 'Cox\'s Bazar', 'Bandarban'],
        certifications: ['Certified Tour Guide'],
        safetyTraining: ['Emergency First Aid'],
        awards: [],
        bio: 'Warm, polished, and especially skilled in cultural and religious travel planning.',
        reviews: [{ id: 'r7', userName: 'Abir', rating: 5, comment: 'Exceptional hospitality and deep local insight.', date: '2025-01-19' }],
      },
      {
        id: 'guide-7',
        agencyId: 'agency-elegant-travel',
        name: 'Mazharul Islam',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        age: 36,
        division: 'Chattogram',
        languages: ['Bengali', 'English', 'Hindi'],
        yearsOfExperience: 11,
        fee: 3300,
        status: 'Available',
        rating: 4.9,
        reviewCount: 89,
        specialization: ['Trekking', 'Photography', 'Hill Tracts'],
        expertise: ['Trekking', 'Photography', 'Hill Tracts', 'Emergency First Aid'],
        totalToursCompleted: 156,
        popularDestinations: ['Sajek Valley', 'Bandarban', 'Ruma'],
        certifications: ['Certified Tour Guide', 'Mountain Safety'],
        safetyTraining: ['First Aid', 'Mountain Safety'],
        awards: ['Mountain Explorer Award'],
        bio: 'A trusted guide for challenging hill routes and premium photo tours.',
        reviews: [{ id: 'r8', userName: 'Nabil', rating: 5, comment: 'Wonderful trekking companion and very safe.', date: '2025-05-12' }],
      },
      {
        id: 'guide-8',
        agencyId: 'agency-elegant-travel',
        name: 'Mitu Akter',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
        age: 28,
        division: 'Chattogram',
        languages: ['Bengali', 'English'],
        yearsOfExperience: 5,
        fee: 2700,
        status: 'Available',
        rating: 4.7,
        reviewCount: 59,
        specialization: ['Food Tours', 'Local Culture', 'Beach Tours'],
        expertise: ['Food Tours', 'Local Culture', 'Beach Tours', 'Transportation Knowledge'],
        totalToursCompleted: 84,
        popularDestinations: ['Cox\'s Bazar', 'Saint Martin'],
        certifications: ['Certified Tour Guide'],
        safetyTraining: ['First Aid'],
        awards: [],
        bio: 'A friendly guide who specializes in coastlines, food, and local experiences.',
        reviews: [{ id: 'r9', userName: 'Rupa', rating: 4, comment: 'Great local food knowledge and relaxed pace.', date: '2025-04-01' }],
      },
    ],
    reviews: [
      { id: 'ag1', userName: 'Rony', rating: 5, comment: 'Excellent service and very trustworthy guides.', date: '2025-04-17' },
      { id: 'ag2', userName: 'Liza', rating: 5, comment: 'Their coastal guides were exceptional.', date: '2025-03-02' },
    ],
  },
  {
    id: 'agency-bangla-heritage',
    name: 'Bangla Heritage Guides',
    logo: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400',
    shortDescription: 'Heritage-led tours across Dhaka, Sylhet, and historic landmarks.',
    fullDescription: 'Bangla Heritage Guides offers culturally rich itineraries with experts in heritage, monuments, and nature-based travel across Bangladesh.',
    division: 'Dhaka',
    officeAddress: 'Dhanmondi, Dhaka',
    contactNumber: '+8801887654321',
    email: 'bookings@banglaheritage.com',
    website: 'https://banglaheritage.com',
    yearsOfExperience: 15,
    rating: 4.8,
    reviewCount: 278,
    activeGuides: 7,
    coveredDestinations: ['Dhaka', 'Sundarbans', 'Ratargul', 'Jaflong'],
    startingPrice: 2200,
    guides: [
      {
        id: 'guide-9',
        agencyId: 'agency-bangla-heritage',
        name: 'Sajedul Karim',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        age: 35,
        division: 'Dhaka',
        languages: ['Bengali', 'English', 'Arabic'],
        yearsOfExperience: 10,
        fee: 3000,
        status: 'Available',
        rating: 4.8,
        reviewCount: 76,
        specialization: ['Historical Tours', 'Religious Tourism', 'Local Culture'],
        expertise: ['Historical Tours', 'Religious Tourism', 'Local Culture', 'Transportation Knowledge'],
        totalToursCompleted: 138,
        popularDestinations: ['Dhaka', 'Sundarbans', 'Ratargul'],
        certifications: ['Certified Tour Guide', 'Heritage Guide'],
        safetyTraining: ['Emergency First Aid'],
        awards: ['Heritage Excellence Award'],
        bio: 'Specializes in urban heritage, ancient sites, and immersive historical storytelling.',
        reviews: [{ id: 'r10', userName: 'Nusrat', rating: 5, comment: 'Wonderful knowledge of Dhaka and old monuments.', date: '2025-04-03' }],
      },
      {
        id: 'guide-10',
        agencyId: 'agency-bangla-heritage',
        name: 'Rimsha Chowdhury',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
        age: 27,
        division: 'Dhaka',
        languages: ['Bengali', 'English', 'French'],
        yearsOfExperience: 5,
        fee: 2400,
        status: 'Available',
        rating: 4.7,
        reviewCount: 58,
        specialization: ['Nature Tours', 'Photography', 'Food Tours'],
        expertise: ['Nature Tours', 'Photography', 'Food Tours', 'Local Culture'],
        totalToursCompleted: 82,
        popularDestinations: ['Ratargul', 'Jaflong', 'Sylhet'],
        certifications: ['Certified Tour Guide'],
        safetyTraining: ['First Aid'],
        awards: [],
        bio: 'A cheerful guide known for nature, photography, and food-led explorations.',
        reviews: [{ id: 'r11', userName: 'Shuvo', rating: 4, comment: 'Lovely pace and very good local recommendations.', date: '2025-03-18' }],
      },
      {
        id: 'guide-11',
        agencyId: 'agency-bangla-heritage',
        name: 'Mehdi Hasan',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        age: 32,
        division: 'Sylhet',
        languages: ['Bengali', 'English'],
        yearsOfExperience: 8,
        fee: 2800,
        status: 'On Duty',
        rating: 4.8,
        reviewCount: 66,
        specialization: ['Trekking', 'Nature Tours', 'Wildlife Tours'],
        expertise: ['Trekking', 'Nature Tours', 'Wildlife Tours', 'Emergency First Aid'],
        totalToursCompleted: 112,
        popularDestinations: ['Jaflong', 'Lawachara', 'Ratargul'],
        certifications: ['Certified Tour Guide', 'Wildlife Safety'],
        safetyTraining: ['First Aid', 'Wildlife Safety'],
        awards: ['Best Nature Guide'],
        bio: 'Perfect for wetland, tea-garden, and rainforest experiences with expert pacing.',
        reviews: [{ id: 'r12', userName: 'Hasan', rating: 5, comment: 'Excellent safety focus and route knowledge.', date: '2025-05-09' }],
      },
      {
        id: 'guide-12',
        agencyId: 'agency-bangla-heritage',
        name: 'Nabila Rahman',
        photo: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
        age: 29,
        division: 'Dhaka',
        languages: ['Bengali', 'English', 'Hindi'],
        yearsOfExperience: 6,
        fee: 2500,
        status: 'Available',
        rating: 4.7,
        reviewCount: 52,
        specialization: ['Food Tours', 'Cultural Tours', 'Photography'],
        expertise: ['Food Tours', 'Cultural Tours', 'Photography', 'Local Culture'],
        totalToursCompleted: 91,
        popularDestinations: ['Dhaka', 'Sylhet', 'Jaflong'],
        certifications: ['Certified Tour Guide'],
        safetyTraining: ['First Aid'],
        awards: [],
        bio: 'Loves helping visitors discover stories behind food, neighborhoods, and festivals.',
        reviews: [{ id: 'r13', userName: 'Tania', rating: 4, comment: 'Friendly and informative throughout the day.', date: '2025-02-22' }],
      },
      {
        id: 'guide-13',
        agencyId: 'agency-bangla-heritage',
        name: 'Arif Rahman',
        photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400',
        age: 34,
        division: 'Sylhet',
        languages: ['Bengali', 'English'],
        yearsOfExperience: 9,
        fee: 2900,
        status: 'Available',
        rating: 4.8,
        reviewCount: 63,
        specialization: ['Adventure Tours', 'Camping', 'Photography'],
        expertise: ['Adventure Tours', 'Camping', 'Photography', 'Emergency First Aid'],
        totalToursCompleted: 124,
        popularDestinations: ['Ratargul', 'Lalakhal', 'Jaflong'],
        certifications: ['Certified Tour Guide', 'Camping Safety'],
        safetyTraining: ['Camping Safety', 'First Aid'],
        awards: ['Adventure Trail Guide'],
        bio: 'Strong on outdoor travel, camping, and scenic routes for active travelers.',
        reviews: [{ id: 'r14', userName: 'Ovi', rating: 5, comment: 'Great outdoor itinerary and very professional.', date: '2025-04-26' }],
      },
      {
        id: 'guide-14',
        agencyId: 'agency-bangla-heritage',
        name: 'Moushumi Sarker',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
        age: 31,
        division: 'Dhaka',
        languages: ['Bengali', 'English', 'German'],
        yearsOfExperience: 7,
        fee: 2700,
        status: 'On Duty',
        rating: 4.8,
        reviewCount: 60,
        specialization: ['Cultural Tours', 'Historical Tours', 'Religious Tourism'],
        expertise: ['Cultural Tours', 'Historical Tours', 'Religious Tourism', 'Local Culture'],
        totalToursCompleted: 104,
        popularDestinations: ['Dhaka', 'Lalbagh Fort', 'Ahsan Manzil'],
        certifications: ['Certified Tour Guide'],
        safetyTraining: ['Emergency First Aid'],
        awards: [],
        bio: 'Brings elegant storytelling and deep respect for heritage and faith sites.',
        reviews: [{ id: 'r15', userName: 'Tamim', rating: 4, comment: 'Warm and deeply knowledgeable about city heritage.', date: '2025-03-29' }],
      },
      {
        id: 'guide-15',
        agencyId: 'agency-bangla-heritage',
        name: 'Tamim Iqbal',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        age: 37,
        division: 'Dhaka',
        languages: ['Bengali', 'English', 'Hindi'],
        yearsOfExperience: 12,
        fee: 3100,
        status: 'Available',
        rating: 4.9,
        reviewCount: 74,
        specialization: ['Historical Tours', 'Photography', 'Adventure Tours'],
        expertise: ['Historical Tours', 'Photography', 'Adventure Tours', 'Transportation Knowledge'],
        totalToursCompleted: 151,
        popularDestinations: ['Dhaka', 'Sundarbans', 'Ratargul'],
        certifications: ['Certified Tour Guide', 'Safety Training'],
        safetyTraining: ['First Aid', 'Safety Training'],
        awards: ['Top Rated City Guide'],
        bio: 'Balanced, efficient, and trusted for both city and nature-based itineraries.',
        reviews: [{ id: 'r16', userName: 'Kawser', rating: 5, comment: 'A highly organized and very reliable guide.', date: '2025-04-09' }],
      },
    ],
    reviews: [
      { id: 'ag3', userName: 'Shafik', rating: 5, comment: 'Wonderful agency for heritage tours.', date: '2025-03-20' },
      { id: 'ag4', userName: 'Dina', rating: 4, comment: 'Great attention to detail for group travel.', date: '2025-02-27' },
    ],
  },
];

export const guideDivisions = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh'];

export const guideDestinations = ['Cox\'s Bazar', 'Sajek Valley', 'Ratargul', 'Kuakata', 'Sundarbans', 'Jaflong', 'Saint Martin', 'Bandarban'];

export const loadGuideAgencies = (): GuideAgency[] => {
  if (typeof window === 'undefined') {
    return buildGuideAgencies();
  }

  const stored = window.localStorage.getItem('guide_agencies');
  if (!stored) {
    const agencies = buildGuideAgencies();
    window.localStorage.setItem('guide_agencies', JSON.stringify(agencies));
    return agencies;
  }

  try {
    return JSON.parse(stored) as GuideAgency[];
  } catch {
    const agencies = buildGuideAgencies();
    window.localStorage.setItem('guide_agencies', JSON.stringify(agencies));
    return agencies;
  }
};

export const persistGuideAgencies = (agencies: GuideAgency[]) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('guide_agencies', JSON.stringify(agencies));
  }
};
