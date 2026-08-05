export type Division = 'Dhaka' | 'Chattogram' | 'Rajshahi' | 'Khulna' | 'Barishal' | 'Sylhet' | 'Rangpur' | 'Mymensingh';
export type Category = 'Historical' | 'Natural/Scenic' | 'Hill/Hill-Tracts' | 'Sea/Beach' | 'River/Waterfall' | 'Religious' | 'Adventure/Wildlife' | 'Urban/Modern';

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

export interface TourGuide {
  id: string;
  name: string;
  photo: string;
  yearsOfExperience: number;
  languages: string[];
  rating: number;
  reviews: number;
  specialization: string[];
  pricePerDay: number;
  bio: string;
  location: Division | string;
}

// Sample Hotels
const sayemanBeachResort: Hotel = {
  id: 'sayeman-beach-resort',
  name: 'Sayeman Beach Resort',
  division: 'Chattogram',
  destination: 'Cox\'s Bazar',
  images: [
    'https://images.unsplash.com/photo-1571896349842-f88b5ba27308?w=800',
  ],
  ratePerNight: 12000,
  rating: 4.6,
  reviews: 450,
  amenities: ['Beach Access', 'Swimming Pool', 'Restaurant', 'WiFi', 'AC Rooms', 'Spa'],
  distanceFromDestination: 0.3,
  description: 'Premium beachfront resort with ocean views and modern amenities',
  availability: true,
};

const oceanParadise: Hotel = {
  id: 'ocean-paradise',
  name: 'Ocean Paradise',
  division: 'Chattogram',
  destination: 'Cox\'s Bazar',
  images: [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  ],
  ratePerNight: 7000,
  rating: 4.3,
  reviews: 280,
  amenities: ['Beach Access', 'Restaurant', 'WiFi', 'AC Rooms'],
  distanceFromDestination: 0.6,
  description: 'Comfortable mid-range resort with great beach location',
  availability: true,
};

const hotelTheCoxToday: Hotel = {
  id: 'hotel-cox-today',
  name: 'Hotel The Cox Today',
  division: 'Chattogram',
  destination: 'Cox\'s Bazar',
  images: [
    'https://images.unsplash.com/photo-1551632786-de41ecbe17ad?w=800',
  ],
  ratePerNight: 3500,
  rating: 4.0,
  reviews: 156,
  amenities: ['Restaurant', 'WiFi', 'AC Rooms', 'Budget Friendly'],
  distanceFromDestination: 1.2,
  description: 'Budget-friendly hotel in the heart of Cox\'s Bazar town',
  availability: true,
};

const seaBreezeResort: Hotel = {
  id: 'sea-breeze-resort',
  name: 'Sea Breeze Resort',
  division: 'Chattogram',
  destination: 'Cox\'s Bazar',
  images: [
    'https://images.unsplash.com/photo-1571896349842-f88b5ba27308?w=800',
  ],
  ratePerNight: 8500,
  rating: 4.6,
  reviews: 243,
  amenities: ['Beach Access', 'Swimming Pool', 'Restaurant', 'WiFi', 'AC Rooms'],
  distanceFromDestination: 0.5,
  description: 'Beachfront resort with ocean views and modern amenities',
  availability: true,
};

const sajekEcolodge: Hotel = {
  id: 'sajek-ecolodge',
  name: 'Sajek Ecolodge',
  division: 'Chattogram',
  destination: 'Sajek Valley',
  images: [
    'https://images.unsplash.com/photo-1445019973118-abc5551b9251?w=800',
  ],
  ratePerNight: 4500,
  rating: 4.4,
  reviews: 156,
  amenities: ['Mountain Views', 'Nature Trail Access', 'Restaurant', 'Bonfire Area'],
  distanceFromDestination: 0.2,
  description: 'Eco-friendly lodge with panoramic valley views',
  availability: true,
};

// Sample Destinations - Dhaka Division
const lalbaughFort: Destination = {
  id: 'lalbagh-fort',
  name: 'Lalbagh Fort',
  division: 'Dhaka',
  categories: ['Historical', 'Religious'],
  rating: 4.5,
  reviews: 342,
  description: 'A 17th-century Mughal fort with stunning architecture and historic significance.',
  fullHistory: 'Built in 1678 by Prince Azam Shah during the reign of Mughal Emperor Aurangzeb, Lalbagh Fort is one of the most impressive Mughal structures in South Asia. The fort showcases exquisite Mughal architecture with its ornamental details, grand chambers, and defensive structures. The partially built fort was abandoned when the prince was recalled to Delhi, giving it a unique historical narrative. The complex includes the Diwan-i-Aam (Hall of Public Audience), the Diwan-i-Khas (Hall of Private Audience), and other architectural marvels that reflect the grandeur of Mughal dynasty.',
  images: ['lalbagh.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 300,
  openingHours: '9:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March (Winter)',
    timeOfDay: 'Early morning (7-9 AM) to avoid crowds and enjoy golden light',
  },
  transportOptions: [
    {
      type: 'CNG',
      estimatedTime: '15-25 minutes from Gulshan',
      fareRange: { min: 100, max: 150 },
    },
    {
      type: 'Rickshaw',
      estimatedTime: '30-40 minutes from Gulshan',
      fareRange: { min: 40, max: 60 },
    },
    {
      type: 'Bus',
      estimatedTime: '40-60 minutes from Motijheel',
      fareRange: { min: 30, max: 50 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Biryani at Nanna Biryani',
      description: 'Famous Dhaka biryani with aromatic rice and tender meat',
      priceRange: { min: 250, max: 400 },
    },
    {
      name: 'Kebab at Panshi Biryani House',
      description: 'Seekh kebab and traditional Bengali kebabs',
      priceRange: { min: 150, max: 300 },
    },
    {
      name: 'Street food: Pani Puri',
      description: 'Traditional Bengali pani puri from local vendors',
      priceRange: { min: 20, max: 40 },
    },
  ],
  safetyTips: [
    'Keep valuables secure, especially in crowded areas',
    'Use official CNG or registered taxis - avoid unmarked vehicles',
    'Visit during daylight hours for best experience and safety',
    'Be respectful of the historical and religious significance of the site',
    'Avoid giving money directly to beggars - use official charity channels if you wish to help',
  ],
  userReviews: [
    {
      author: 'Sarah M.',
      rating: 5,
      text: 'Incredible historical site! The architecture is breathtaking. Worth every taka.',
      photos: [],
    },
    {
      author: 'Ahmed R.',
      rating: 4,
      text: 'Great place to learn about Mughal history. Could use better signage for navigation.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '2-3 hours',
};

const ahsanManzil: Destination = {
  id: 'ahsan-manzil',
  name: 'Ahsan Manzil',
  division: 'Dhaka',
  categories: ['Historical', 'Religious'],
  rating: 4.4,
  reviews: 198,
  description: 'The historic Pink Palace of Dhaka, former residence of the Dhaka Nawab family.',
  fullHistory: 'Ahsan Manzil was constructed in the 19th century and served as the official residential palace of the Nawab of Dhaka. The pink-hued mansion overlooks the Buriganga River and now operates as a museum showcasing the region\'s colonial and Nawabi heritage.',
  images: ['Ahsan Manzil.jpg'],
  localEntryFee: 30,
  foreignEntryFee: 200,
  openingHours: '10:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March (Winter)',
    timeOfDay: 'Late afternoon for river views and golden light',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '20-30 minutes from Gulshan',
      fareRange: { min: 40, max: 80 },
    },
    {
      type: 'CNG',
      estimatedTime: '15-25 minutes from Motijheel',
      fareRange: { min: 80, max: 150 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'River View Cafe',
      description: 'Casual cafe with views of the Buriganga River.',
      priceRange: { min: 200, max: 600 },
    },
  ],
  safetyTips: [
    'Keep belongings secure near riverfront areas',
    'Use registered transport for night travel',
  ],
  userReviews: [
    {
      author: 'Naila S.',
      rating: 5,
      text: 'Beautifully preserved museum with fascinating history.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '1-2 hours',
};

const starMosque: Destination = {
  id: 'star-mosque',
  name: 'Star Mosque',
  division: 'Dhaka',
  categories: ['Religious', 'Historical'],
  rating: 4.3,
  reviews: 218,
  description: 'An 18th-century mosque with intricate star-pattern decorations.',
  fullHistory: 'The Star Mosque, also known as Tara Mosque, was built in 1784 and is famous for its exquisite interior decorations. The mosque\'s interior is adorned with colorful stars, flowers, and geometric patterns painted on the walls and ceiling, making it a unique example of Indo-Islamic architecture.',
  images: ['tara mosjid.jpg'],
  localEntryFee: 50,
  foreignEntryFee: 100,
  openingHours: '5:00 AM - 8:00 PM (Except prayer times)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Evening (4-6 PM) for beautiful light',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '20-30 minutes from Old Dhaka',
      fareRange: { min: 30, max: 50 },
    },
    {
      type: 'Bus',
      estimatedTime: '30-50 minutes',
      fareRange: { min: 20, max: 40 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Haleem',
      description: 'Slow-cooked meat and lentil dish, famous in Old Dhaka',
      priceRange: { min: 200, max: 400 },
    },
  ],
  safetyTips: [
    'Dress modestly when visiting the mosque',
    'Remove shoes before entering',
    'Be respectful during prayer times',
    'Ask permission before taking photos inside',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const dhakeshwariTemple: Destination = {
  id: 'dhakeshwari-temple',
  name: 'Dhakeshwari Temple',
  division: 'Dhaka',
  categories: ['Historical', 'Religious'],
  rating: 4.4,
  reviews: 320,
  description: 'A sacred Hindu temple in old Dhaka, dedicated to the patron goddess of the city.',
  fullHistory: 'Dhakeshwari Temple is a 12th-century temple that is widely regarded as the national temple of Bangladesh. It has been a center of Hindu worship for centuries and survived through many historical changes. The temple is known for its terracotta sculptures, prayer halls, and peaceful courtyard.',
  images: ['Dhakeshwari Temple.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '5:00 AM - 8:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning after sunrise',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '20-30 minutes from Motijheel',
      fareRange: { min: 40, max: 80 },
    },
    {
      type: 'CNG',
      estimatedTime: '15-25 minutes from Old Dhaka',
      fareRange: { min: 80, max: 120 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Old Dhaka Sweets',
      description: 'Traditional sweets and snacks near the temple neighborhood.',
      priceRange: { min: 50, max: 150 },
    },
  ],
  safetyTips: [
    'Remove shoes before entering the temple complex.',
    'Respect local customs and dress modestly.',
    'Keep valuables safe in crowded areas.',
  ],
  userReviews: [
    {
      author: 'Maya A.',
      rating: 5,
      text: 'A beautiful temple with a calm atmosphere in the hectic city.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '1-2 hours',
};

const baitulMukarram: Destination = {
  id: 'baitul-mukarram',
  name: 'Baitul Mukarram',
  division: 'Dhaka',
  categories: ['Religious', 'Urban/Modern'],
  rating: 4.5,
  reviews: 410,
  description: 'Bangladesh National Mosque, a modern architectural landmark in the heart of the capital.',
  fullHistory: 'Completed in 1968, Baitul Mukarram is the national mosque of Bangladesh and one of the largest mosques in South Asia. Its minimalist facade, cruciform layout, and tall central dome make it a city landmark. The mosque hosts daily prayers and sees thousands of worshippers during Friday prayers and Eid.',
  images: ['Baitul Mukarram.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '5:00 AM - 10:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to February',
    timeOfDay: 'Early morning before prayers',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '20-30 minutes from Gulshan',
      fareRange: { min: 20, max: 50 },
    },
    {
      type: 'Ride-share',
      estimatedTime: '15-25 minutes',
      fareRange: { min: 150, max: 250 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Kabab Factory',
      description: 'Popular restaurant serving kebabs and biryani near Shahbagh.',
      priceRange: { min: 200, max: 500 },
    },
  ],
  safetyTips: [
    'Dress modestly when visiting the prayer halls.',
    'Stay aware of busy prayer times and traffic nearby.',
    'Follow mosque rules and photography guidance.',
  ],
  userReviews: [
    {
      author: 'Farhan S.',
      rating: 4,
      text: 'Majestic mosque and an important spiritual site for Dhaka residents.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '1-1.5 hours',
};

const bangabandhuMuseum: Destination = {
  id: 'bangabandhu-memorial-museum',
  name: 'Bangabandhu Memorial Museum',
  division: 'Dhaka',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.6,
  reviews: 275,
  description: 'The residence-turned-museum dedicated to the life and legacy of Sheikh Mujibur Rahman.',
  fullHistory: 'Formerly the home of Bangabandhu Sheikh Mujibur Rahman, the museum preserves personal artifacts, photographs, and documents from the founding father of Bangladesh. Visitors can learn about the independence movement and the nation-building journey through guided displays and historical exhibits.',
  images: ['memorial museuam .jpg'],
  localEntryFee: 30,
  foreignEntryFee: 150,
  openingHours: '10:00 AM - 5:00 PM (Closed on Fridays)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Late morning when the museum is less crowded',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '20-30 minutes from Motijheel',
      fareRange: { min: 40, max: 80 },
    },
    {
      type: 'Ride-share',
      estimatedTime: '15-20 minutes',
      fareRange: { min: 150, max: 250 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Tea House',
      description: 'Local cafe serving tea and light snacks near Dhanmondi.',
      priceRange: { min: 80, max: 180 },
    },
  ],
  safetyTips: [
    'Leave large bags at the entry point if required.',
    'Photography may be restricted inside exhibition rooms.',
    'Respect the historical significance of the collection.',
  ],
  userReviews: [
    {
      author: 'Priya T.',
      rating: 5,
      text: 'A deeply moving museum with excellent storytelling and exhibits.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '1-2 hours',
};

const baraKatra: Destination = {
  id: 'bara-katra',
  name: 'Bara Katra',
  division: 'Dhaka',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.2,
  reviews: 160,
  description: 'The grand gatehouse of an old Mughal caravanserai in Old Dhaka.',
  fullHistory: 'Built in the 17th century during the Mughal period, Bara Katra served as a fortified inn for travelers and traders. Today only the gatehouse remains, offering a glimpse into Old Dhaka’s trading heritage and Mughal-era architecture. The surrounding market area still bustles with activity.',
  images: ['BaraKatraDhaka.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 50,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to February',
    timeOfDay: 'Afternoon after exploring nearby Old Dhaka markets',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from Sadarghat',
      fareRange: { min: 30, max: 60 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Kacha Golla Sweets',
      description: 'Traditional Bengali sweets near Old Dhaka.',
      priceRange: { min: 30, max: 100 },
    },
  ],
  safetyTips: [
    'Old Dhaka can be crowded; keep water and stay with your group.',
    'Watch for uneven walkways and busy traffic.',
    'Respect local merchants and avoid taking photos without permission.',
  ],
  userReviews: [
    {
      author: 'Jasim K.',
      rating: 4,
      text: 'A historic site with strong Old Dhaka character. Perfect for history lovers.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '1 hour',
};

const chotoKatra: Destination = {
  id: 'choto-katra',
  name: 'Choto Katra',
  division: 'Dhaka',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.1,
  reviews: 135,
  description: 'The small caravanserai built beside Bara Katra for merchants visiting Old Dhaka.',
  fullHistory: 'Choto Katra was constructed as the pair to Bara Katra and provided lodging for travelers during the Mughal era. The surviving structure is an architectural relic with arched gateways and inner courtyards, and it remains one of the key heritage sites of Old Dhaka.',
  images: ['ChotoKatra.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 50,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to February',
    timeOfDay: 'Morning after visiting Bara Katra.',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '10-15 minutes from Bara Katra',
      fareRange: { min: 20, max: 40 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Local Tea Stall',
      description: 'Enjoy chai and a quick snack while exploring Old Dhaka.',
      priceRange: { min: 20, max: 60 },
    },
  ],
  safetyTips: [
    'The site is in a busy market area; watch your belongings.',
    'Wear comfortable shoes for walking around the old quarter.',
    'Respect religious and historical practices in the area.',
  ],
  userReviews: [
    {
      author: 'Nusrat H.',
      rating: 4,
      text: 'Great companion stop after Bara Katra, with authentic Old Dhaka atmosphere.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '45 minutes',
};

const sonargaon: Destination = {
  id: 'sonargaon',
  name: 'Sonargaon',
  division: 'Dhaka',
  categories: ['Historical', 'Natural/Scenic'],
  rating: 4.7,
  reviews: 490,
  description: 'A historic river town and heritage complex east of Dhaka, offering museums and old palaces.',
  fullHistory: 'Sonargaon was the ancient administrative center of eastern Bengal and later became a prominent port city. Today the area is preserved as a heritage site, with the Folk Arts and Crafts Museum, the Panam City ruins, and the 17th-century Goaldi Mosque. Visitors can explore palaces, mosques, and traditional village scenery.',
  images: ['Sonargaon.jpg'],
  localEntryFee: 50,
  foreignEntryFee: 200,
  openingHours: '9:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Late afternoon for riverside views',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1.5-2 hours from Dhaka city',
      fareRange: { min: 80, max: 150 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Heritage Restaurant',
      description: 'Local cuisine served close to the Sonargaon complex.',
      priceRange: { min: 250, max: 500 },
    },
  ],
  safetyTips: [
    'Carry insect repellent for the riverside areas.',
    'Dress for warm weather and sun protection.',
    'Keep an eye on river access points if traveling with children.',
  ],
  userReviews: [
    {
      author: 'Hasan P.',
      rating: 5,
      text: 'Lovely historic town with great museums and quiet river scenery.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '3-4 hours',
};

const bhawalRajbari: Destination = {
  id: 'bhawal-rajbari',
  name: 'Bhawal Rajbari',
  division: 'Dhaka',
  categories: ['Historical', 'Natural/Scenic'],
  rating: 4.3,
  reviews: 210,
  description: 'A heritage palace near the Bhawal National Park region, set amidst gardens and lakes.',
  fullHistory: 'Bhawal Rajbari is a royal estate with colonial and Mughal influences, built by the Bhawal family in the late 19th century. The palace compound includes landscaped gardens, lakes, and traditional architecture, and it is a popular day-trip destination for heritage and nature lovers.',
  images: ['Bhawal-Rajbari.jpg'],
  localEntryFee: 40,
  foreignEntryFee: 180,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning when the garden is cool and quiet',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1.5-2 hours from Dhaka city',
      fareRange: { min: 100, max: 180 },
    },
    {
      type: 'Ride-share',
      estimatedTime: '90-120 minutes',
      fareRange: { min: 1200, max: 1800 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Garden Picnic Food Stall',
      description: 'Simple picnic foods and tea near the palace grounds.',
      priceRange: { min: 60, max: 180 },
    },
  ],
  safetyTips: [
    'Wear comfortable shoes for walking the garden grounds.',
    'Bring water and sun protection for outdoor exploration.',
  ],
  userReviews: [
    {
      author: 'Sadia L.',
      rating: 4,
      text: 'Peaceful palace grounds with a great countryside feel near Dhaka.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '2-3 hours',
};

const baliatiPalace: Destination = {
  id: 'baliati-palace',
  name: 'Baliati Palace',
  division: 'Dhaka',
  categories: ['Historical', 'Natural/Scenic'],
  rating: 4.4,
  reviews: 240,
  description: 'A restored zamindar mansion surrounded by ponds and gardens in the Gazipur area.',
  fullHistory: 'Baliati Palace is an 18th-century zamindar estate featuring multiple pavilions, courtyards, and heritage buildings. It was built by the Roy family and has been preserved as an architectural landmark. The palace’s richly decorated rooms and scenic grounds make it a popular heritage visit.',
  images: ['Baliati Palace.jpg'],
  localEntryFee: 30,
  foreignEntryFee: 120,
  openingHours: '9:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Late morning after cooler sunrise hours',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1.5 hours from Dhaka',
      fareRange: { min: 80, max: 140 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Local Restaurant',
      description: 'Simple Bengali dishes near Baliati Palace.',
      priceRange: { min: 100, max: 250 },
    },
  ],
  safetyTips: [
    'Keep an eye on group members near the palace ponds.',
    'The grounds can be warm in midday sun; carry water.',
  ],
  userReviews: [
    {
      author: 'Rifat Z.',
      rating: 4,
      text: 'An elegant palace with beautiful gardens and photo opportunities.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '2 hours',
};

const wariBateshwar: Destination = {
  id: 'wari-bateshwar',
  name: 'Wari-Bateshwar',
  division: 'Dhaka',
  categories: ['Historical', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 155,
  description: 'An ancient archaeological site near Narayanganj, believed to be a trading port from antiquity.',
  fullHistory: 'Wari-Bateshwar is a significant archaeological complex where archaeologists discovered copper and iron artifacts dating back over 2,500 years. The site offers a window into pre-Islamic Bengal history, with ruins of ancient fortifications and pottery that suggest early trade and settlement activity.',
  images: ['wari-boteshori.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '9:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for archaeological site walking',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1-1.5 hours from Dhaka',
      fareRange: { min: 60, max: 120 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Local Dhaba',
      description: 'Simple regional food near the excavation site.',
      priceRange: { min: 80, max: 180 },
    },
  ],
  safetyTips: [
    'Stay on marked paths to preserve the site.',
    'Bring sun protection and water for open areas.',
  ],
  userReviews: [
    {
      author: 'Anik R.',
      rating: 4,
      text: 'Fascinating and off-the-beaten-path site with lots of history.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '1.5-2 hours',
};

const joydebpurTempleAreas: Destination = {
  id: 'joydebpur-temple-areas',
  name: 'Joydebpur Temple Areas',
  division: 'Dhaka',
  categories: ['Religious'],
  rating: 4.2,
  reviews: 78,
  description: 'A cluster of historic temples and shrines in Joydebpur, popular for pilgrimage and cultural visits.',
  fullHistory: 'Joydebpur is known for its temple precincts that attract devotees and visitors year-round. The area combines religious sites, traditional rituals, and local festivals, reflecting the spiritual heritage of greater Dhaka.',
  images: ['joydebpur.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '6:00 AM - 8:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning or late afternoon',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '40-60 minutes from central Dhaka',
      fareRange: { min: 200, max: 300 },
    },
    {
      type: 'Bus',
      estimatedTime: '1-1.5 hours from central Dhaka',
      fareRange: { min: 50, max: 80 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Local Temple Canteen',
      description: 'Simple vegetarian meals available near temple grounds.',
      priceRange: { min: 80, max: 180 },
    },
  ],
  safetyTips: [
    'Dress conservatively and remove shoes when required.',
    'Respect local worshippers and photography restrictions.',
    'Stay hydrated and aware of traffic near temple entrances.',
  ],
  userReviews: [
    {
      author: 'Rumana K.',
      rating: 4,
      text: 'Peaceful temple area with a strong cultural atmosphere.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '1-2 hours',
};

const babaLoknathTemple: Destination = {
  id: 'baba-loknath-temple',
  name: 'Baba Loknath Temple',
  division: 'Dhaka',
  categories: ['Religious'],
  rating: 4.3,
  reviews: 92,
  description: 'A revered Hindu temple dedicated to Baba Loknath, known for its peaceful atmosphere and spiritual ceremonies.',
  fullHistory: 'Baba Loknath Temple is an important pilgrimage site for followers of Baba Loknath, a spiritual saint. The temple welcomes devotees to participate in rituals and experience devotional music, while its spacious grounds provide a calm retreat from busy Dhaka.',
  images: ['baba.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '5:00 AM - 9:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Early morning for a peaceful visit',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '45-60 minutes from Gulshan',
      fareRange: { min: 220, max: 320 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Local Sweets Shop',
      description: 'Traditional sweets and snacks near the temple entrance.',
      priceRange: { min: 30, max: 90 },
    },
  ],
  safetyTips: [
    'Follow dress codes and remove shoes before entering sacred areas.',
    'Be respectful during prayer services and rituals.',
    'Keep valuables secure, especially during busy festival periods.',
  ],
  userReviews: [
    {
      author: 'Tania H.',
      rating: 4,
      text: 'A calming spiritual space with friendly local devotees.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '1-1.5 hours',
};

const nuhashPalli: Destination = {
  id: 'nuhash-palli',
  name: 'Nuhash Palli',
  division: 'Dhaka',
  categories: ['Natural/Scenic'],
  rating: 4.4,
  reviews: 134,
  description: 'A creative countryside retreat founded by poet Shamsur Rahman, offering art spaces, gardens, and cultural programs.',
  fullHistory: 'Nuhash Palli was established by the acclaimed Bengali poet Shamsur Rahman as a peaceful rural retreat west of Dhaka. It has become a cultural destination where visitors can enjoy art installations, gardens, and a serene environment that blends literature with nature.',
  images: ['palli.jpg'],
  localEntryFee: 40,
  foreignEntryFee: 150,
  openingHours: '9:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for cool breezes and garden walks',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '1-1.5 hours from Dhaka city',
      fareRange: { min: 350, max: 500 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Countryside Cafe',
      description: 'Light meals and refreshments in a rural setting.',
      priceRange: { min: 120, max: 250 },
    },
  ],
  safetyTips: [
    'Bring insect repellent and sun protection for outdoor paths.',
    'Plan for a relaxed pace; the site is best enjoyed without rush.',
    'Respect the creative installations and garden areas.',
  ],
  userReviews: [
    {
      author: 'Lamia S.',
      rating: 5,
      text: 'Lovely retreat with peaceful landscapes and inspiring art.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '2-3 hours',
};

const madhupurForestBelt: Destination = {
  id: 'madhupur-forest-belt',
  name: 'Madhupur Forest Belt',
  division: 'Dhaka',
  categories: ['Natural/Scenic'],
  rating: 4.3,
  reviews: 104,
  description: 'A serene forest region in central Bangladesh, known for dense woodlands, wildlife, and tranquil nature trails.',
  fullHistory: 'The Madhupur Forest Belt is one of the largest upland forest areas in Bangladesh, stretching across the Dhaka division. It is valued for its native Sal trees, wildlife habitat, and peaceful natural setting, making it a favorite for nature lovers and birdwatchers.',
  images: ['madhupur.jpg'],
  localEntryFee: 30,
  foreignEntryFee: 120,
  openingHours: '7:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to February',
    timeOfDay: 'Early morning for wildlife and cool air',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1.5-2 hours from Dhaka',
      fareRange: { min: 80, max: 160 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Forest Picnic Stall',
      description: 'Simple packed meals and refreshments near the park entrance.',
      priceRange: { min: 80, max: 160 },
    },
  ],
  safetyTips: [
    'Stay on marked trails and follow local guides if available.',
    'Carry water and insect repellent for the forest area.',
    'Do not disturb wildlife or remove vegetation.',
  ],
  userReviews: [
    {
      author: 'Shahriar M.',
      rating: 4,
      text: 'Refreshing forest escape close to Dhaka city. Great for a nature walk.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '3-4 hours',
};

const fantasyKingdom: Destination = {
  id: 'fantasy-kingdom',
  name: 'Fantasy Kingdom',
  division: 'Dhaka',
  categories: ['Urban/Modern'],
  rating: 4.1,
  reviews: 215,
  description: 'A modern amusement park in Dhaka featuring rides, entertainment zones, and family-friendly attractions.',
  fullHistory: 'Fantasy Kingdom is one of Dhaka’s most popular theme parks, offering roller coasters, water rides, and themed dining for visitors of all ages. The park combines modern entertainment with a convenient urban location, making it a favorite day trip for families.',
  images: ['fantasy.jpg'],
  localEntryFee: 250,
  foreignEntryFee: 500,
  openingHours: '10:00 AM - 7:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Weekdays or early afternoon to avoid crowds',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '30-45 minutes from central Dhaka',
      fareRange: { min: 180, max: 300 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Theme Park Food Court',
      description: 'Casual dining and snack options within the park.',
      priceRange: { min: 150, max: 400 },
    },
  ],
  safetyTips: [
    'Follow ride safety instructions carefully.',
    'Keep children supervised at all times.',
    'Bring sunscreen and stay hydrated on hot days.',
  ],
  userReviews: [
    {
      author: 'Ayesha N.',
      rating: 4,
      text: 'Fun park for families with enough rides and activities for a full day.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '4-6 hours',
};

const nationalParliamentHouse: Destination = {
  id: 'national-parliament-house',
  name: 'National Parliament House',
  division: 'Dhaka',
  categories: ['Urban/Modern'],
  rating: 4.5,
  reviews: 198,
  description: 'The iconic modernist parliament building of Bangladesh, known for its striking architecture and expansive grounds.',
  fullHistory: 'Designed by architect Louis Kahn, the National Parliament House is one of the world’s most celebrated modernist public buildings. Its geometric facades, landscaped water features, and monumental halls reflect Bangladesh’s national identity and architectural heritage.',
  images: ['national.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 50,
  openingHours: '9:00 AM - 5:00 PM (Weekdays; restricted entry)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning to enjoy the grounds before midday heat',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '20-30 minutes from central Dhaka',
      fareRange: { min: 150, max: 250 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Shahbagh Cafeteria',
      description: 'Casual dining close to the parliament area.',
      priceRange: { min: 180, max: 350 },
    },
  ],
  safetyTips: [
    'Entry may be restricted for security reasons; carry ID and follow guard instructions.',
    'Photography may be limited in certain areas.',
    'Dress respectfully when visiting the public grounds.',
  ],
  userReviews: [
    {
      author: 'Kamrul H.',
      rating: 5,
      text: 'Stunning architecture and impressive grounds. A must-see landmark in Dhaka.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '1-2 hours',
};

// Sample Destinations - Chattogram Division
const coxsBazar: Destination = {
  id: 'coxs-bazar',
  name: 'Cox\'s Bazar Beach',
  division: 'Chattogram',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.6,
  reviews: 2150,
  description: 'The crown jewel of Bangladesh\'s coastline — an uninterrupted 120 km stretch of golden sand beach along the Bay of Bengal, with lively beachfront, seafood shacks, and serene sunset points.',
  fullHistory: 'Cox\'s Bazar is home to the world\'s longest unbroken sandy beach, stretching approximately 120 kilometers (75 miles). Named after Captain Hiram Cox, a British officer who established a trading post here in 1799, it has grown into Bangladesh\'s premier beach destination. The beach is lined with coconut trees and offers stunning sunsets. The town has developed into a vibrant tourist hub with water sports, beachside restaurants, and multiple accommodation options.',
  images: ['CoxsBazar.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  amenities: ['No Wifi', 'Foreign', 'Always accessible'],
  bestTimeToVisit: {
    season: 'November–March (dry, pleasant weather)',
    timeOfDay: 'Sunrise and sunset for spectacular views; midday can be hot',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '10-12 hours from Dhaka',
      fareRange: { min: 400, max: 600 },
    },
    {
      type: 'Air',
      estimatedTime: '1 hour from Dhaka',
      fareRange: { min: 3500, max: 7000 },
    },
    {
      type: 'Train',
      estimatedTime: '10-12 hours from Dhaka (Chattogram 4-6h sub)',
      fareRange: { min: 600, max: 1500 },
    },
  ],
  fairPriceGuide: [
    {
      item: 'Beach Chair/Umbrella',
      description: 'Can\'t get both or simply hiring',
      priceRange: { min: 100, max: 200 },
    },
    {
      item: 'CNG/Auto',
      description: '1km/5 min (shared trip, basic ~3 seater)',
      priceRange: { min: 150, max: 400 },
    },
    {
      item: 'Jet Ski / water sports',
      description: 'Only rides operated with lifeguards',
      priceRange: { min: 1000, max: 1500 },
    },
    {
      item: 'Surfing Lesson',
      description: 'Steve\'s at surfers at Kallani point. Offers lessons',
      priceRange: { min: 800, max: 1000 },
    },
  ],
  nearbyHotels: [
    sayemanBeachResort,
    oceanParadise,
    hotelTheCoxToday,
  ],
  nearbyFood: [
    {
      name: 'Fried Pumpkin',
      description: 'Beach snack specialty',
      priceRange: { min: 80, max: 150 },
    },
    {
      name: 'Crab Masala',
      description: 'Fresh crab with traditional Bengali spices',
      priceRange: { min: 400, max: 800 },
    },
    {
      name: 'Grilled Lobster',
      description: 'Fresh lobster grilled with local seasonings',
      priceRange: { min: 600, max: 1200 },
    },
    {
      name: 'Mermaid Cafe',
      description: 'National / international. ৳300-৳1,800',
      priceRange: { min: 300, max: 1800 },
    },
    {
      name: 'Devon Sea Food',
      description: 'Fresh seafood. ৳400-৳1,800',
      priceRange: { min: 400, max: 1800 },
    },
  ],
  safetyTips: [
    'Swimming safety: Swim only in designated areas with lifeguards. Never swim alone or after dark.',
    'Beach vendors: Beach items (chairs, umbrellas) should cost ৳100–৳200. Clarify price before using.',
    'Jet ski / water sports: Jet ski rental: ৳1,000–₹1,500 per 15 min. Do not agree to "open-ended" pricing.',
    'Money safety: Do not carry large amounts of cash. Use ATMs in town.',
    'Group travel: Travel in groups, especially in evening.',
  ],
  userReviews: [
    {
      author: 'Sarah J.',
      rating: 4.7,
      text: 'The sunset here is unreal! Stayed at Sayaman — worth every taka. The beach is clean and endless.',
      photos: [],
    },
    {
      author: 'Kamal A.',
      rating: 4.5,
      text: 'Incredible beach, tons of people. Go for a quieter experience. Seafood at Mermaid\'s amazing.',
      photos: [],
    },
  ],
  estimatedVisitDuration: 'Approximately 6.0 hours',
};

const sajekValley: Destination = {
  id: 'sajek-valley',
  name: 'Sajek Valley',
  division: 'Chattogram',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic', 'Adventure/Wildlife'],
  rating: 4.8,
  reviews: 567,
  description: 'A scenic hill station with misty valleys, tribal villages, and panoramic views.',
  fullHistory: 'Sajek Valley, located 1,800 meters above sea level, is one of Bangladesh\'s most scenic destinations. Home to the Chakma tribal community, it offers breathtaking views of rolling hills covered in mist, especially during monsoon season. The valley is becoming increasingly popular among trekkers and nature lovers.',
  images: ['shajek.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'June to September (Monsoon with misty views)',
    timeOfDay: 'Early morning for mist and clouds',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '5-6 hours from Chattogram city',
      fareRange: { min: 2000, max: 3000 },
    },
    {
      type: 'Bus',
      estimatedTime: '6-7 hours from Chattogram',
      fareRange: { min: 300, max: 500 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Tribal Cuisine',
      description: 'Local Chakma dishes with traditional cooking methods',
      priceRange: { min: 200, max: 400 },
    },
  ],
  safetyTips: [
    'Hire a local guide - terrain can be treacherous, especially during monsoon',
    'The road is steep and winding; avoid driving if uncomfortable',
    'Bring appropriate clothing for cool, misty weather',
    'Mobile network can be unreliable; plan accordingly',
    'Respect tribal culture and privacy; ask before photographing people',
  ],
  userReviews: [
    {
      author: 'Ravi K.',
      rating: 5,
      text: 'Paradise on earth! The mist, the views, the tribal villages. Absolutely magical.',
      photos: [],
    },
  ],
  estimatedVisitDuration: '2-3 days',
};

const bayazidBostamiShrine: Destination = {
  id: 'bayazid-bostami-shrine',
  name: 'Bayazid Bostami Shrine',
  division: 'Chattogram',
  categories: ['Religious', 'Historical'],
  rating: 4.4,
  reviews: 320,
  description: 'A revered Sufi shrine set in a peaceful garden with sacred turtles and lakeside views.',
  fullHistory: 'Bayazid Bostami Shrine is named after the famous Muslim saint Hazrat Bayazid Bostami. Located in Chattogram, it has been a spiritual destination for centuries, featuring mosques, mazars, and a tranquil pond populated by sacred turtles.',
  images: ['Baizid_Bostami_Mazar.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 50,
  openingHours: '6:00 AM - 8:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to February',
    timeOfDay: 'Morning for peaceful prayers and cool weather',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '20-30 minutes from downtown Chattogram',
      fareRange: { min: 150, max: 250 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Shrine Tea Stall',
      description: 'Simple tea and snacks near the shrine entrance.',
      priceRange: { min: 20, max: 60 },
    },
  ],
  safetyTips: [
    'Respect the rules of the shrine and dress modestly.',
    'Follow photography guidance from shrine staff.',
    'Keep valuables secure around the crowded lake area.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-1.5 hours',
};

const mainamati: Destination = {
  id: 'mainamati',
  name: 'Mainamati',
  division: 'Chattogram',
  categories: ['Historical', 'Natural/Scenic'],
  rating: 4.3,
  reviews: 275,
  description: 'An archaeological complex with ancient Buddhist ruins and scenic hills.',
  fullHistory: 'Mainamati is home to ruins of an ancient Buddhist civilization dating back over 1,000 years. The site contains monasteries, stupas, and museum exhibits documenting the region\'s religious and cultural heritage.',
  images: ['mainamati.jpg'],
  localEntryFee: 40,
  foreignEntryFee: 200,
  openingHours: '9:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to February',
    timeOfDay: 'Late morning after cooler hours',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1-1.5 hours from Chattogram city',
      fareRange: { min: 80, max: 150 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Museum Cafe',
      description: 'Light refreshments and local snacks near Mainamati.',
      priceRange: { min: 100, max: 220 },
    },
  ],
  safetyTips: [
    'Wear comfortable shoes for exploring ruins.',
    'Carry water and sun protection.',
    'Do not touch fragile archaeological artifacts.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const shalbanVihara: Destination = {
  id: 'shalban-vihara',
  name: 'Shalban Vihara',
  division: 'Chattogram',
  categories: ['Historical', 'Natural/Scenic'],
  rating: 4.4,
  reviews: 198,
  description: 'A 8th-century Buddhist monastery complex with a tranquil archaeological park.',
  fullHistory: 'Shalban Vihara was once a major center of Buddhist learning and monastic life. The ruins include monastery cells, stupas, and a museum display that explain the region\'s rich past.',
  images: ['shalbon-bihar.jpg'],
  localEntryFee: 40,
  foreignEntryFee: 180,
  openingHours: '9:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to February',
    timeOfDay: 'Morning for cool weather and soft light',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '30-40 minutes from Chattogram city',
      fareRange: { min: 200, max: 350 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Heritage Snack Stall',
      description: 'Local drinks and snacks near the archaeological grounds.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Stay on marked walkways around the ruins.',
    'Respect museum rules and exercise caution near excavated areas.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1.5-2 hours',
};

const zamindarHouses: Destination = {
  id: 'local-zamindar-houses',
  name: 'Local Zamindar Houses',
  division: 'Chattogram',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.1,
  reviews: 165,
  description: 'Heritage zamindar mansions showcasing colonial and traditional architecture.',
  fullHistory: 'Chattogram\'s zamindar houses reflect the region\'s landed aristocracy and colonial-era wealth. These historic residences feature ornamental balconies, inner courtyards, and preserved period details.',
  images: ['local-zamindar-houses.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '10:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Afternoon after exploring Chattogram town',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '15-25 minutes from city center',
      fareRange: { min: 120, max: 220 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Heritage Cafe',
      description: 'Cafe serving regional snacks within the heritage district.',
      priceRange: { min: 120, max: 260 },
    },
  ],
  safetyTips: [
    'Treat heritage homes with respect and avoid touching delicate surfaces.',
    'Stay with your guide when inside restricted areas.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-1.5 hours',
};

const riverPortAreas: Destination = {
  id: 'historical-river-port-areas',
  name: 'Historical River Port Areas',
  division: 'Chattogram',
  categories: ['Historical', 'Natural/Scenic'],
  rating: 4.2,
  reviews: 180,
  description: 'Old river port neighborhoods with maritime history and bustling waterfront life.',
  fullHistory: 'Chattogram has long been a key river port for trade and transportation. These historic port areas retain waterfront markets, old warehouses, and traditional boat-building activities that tell the city\'s maritime story.',
  images: ['Patenga_Road.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to February',
    timeOfDay: 'Sunset for golden river views',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-25 minutes from major city neighborhoods',
      fareRange: { min: 30, max: 70 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Riverfront Fish Market',
      description: 'Fresh seafood stalls and local eats by the water.',
      priceRange: { min: 120, max: 300 },
    },
  ],
  safetyTips: [
    'Stay aware around busy boat traffic and busy docks.',
    'Watch for wet surfaces near the river edge.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const foysLake: Destination = {
  id: 'foys-lake',
  name: 'Foy’s Lake',
  division: 'Chattogram',
  categories: ['Natural/Scenic', 'Adventure/Wildlife'],
  rating: 4.5,
  reviews: 1000,
  description: 'A scenic lake park with amusement rides, boat cruises, and hill views.',
  fullHistory: 'Foy’s Lake is an artificial lake surrounded by hills and forest. It has been developed into a recreational area with a park, boat rentals, and a popular entertainment complex for families and visitors.',
  images: ['foys-lake.jpg'],
  localEntryFee: 50,
  foreignEntryFee: 150,
  openingHours: '10:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Afternoon for lake reflections and cooler weather',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '15-25 minutes from city center',
      fareRange: { min: 180, max: 260 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Lakefront Cafe',
      description: 'Coffee and snacks with lake views.',
      priceRange: { min: 150, max: 300 },
    },
  ],
  safetyTips: [
    'Wear a life jacket when taking a boat.',
    'Supervise children near the water.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const kaptaiRiverEdge: Destination = {
  id: 'kaptai-river-ecosystem-edge',
  name: 'Kaptai River Ecosystem Edge',
  division: 'Chattogram',
  categories: ['River/Waterfall', 'Natural/Scenic'],
  rating: 4.6,
  reviews: 320,
  description: 'A scenic river corridor along Kaptai with forests, wetlands, and boating opportunities.',
  fullHistory: 'The Kaptai river ecosystem supports diverse wildlife and sustains local fishing communities. Visitors can explore riverine forests, lakeside trails, and enjoy boat trips through the lush landscape.',
  images: ['kaptai-river-ecosystem-edge.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for birdlife and soft light',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '3-4 hours from Chattogram city',
      fareRange: { min: 120, max: 250 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'River Lodge Cafe',
      description: 'Simple riverside dining with local fish dishes.',
      priceRange: { min: 180, max: 360 },
    },
  ],
  safetyTips: [
    'Bring mosquito repellent near water edges.',
    'Boat travel may be weather-dependent.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const khoiyachoraWaterfall: Destination = {
  id: 'khoiyachora-waterfall',
  name: 'Khoiyachora Waterfall',
  division: 'Chattogram',
  categories: ['River/Waterfall', 'Natural/Scenic'],
  rating: 4.6,
  reviews: 230,
  description: 'A multi-tier waterfall in the hills near Bandarban, surrounded by lush forest.',
  fullHistory: 'Khoiyachora waterfall is a popular hiking destination in the Bandarban region. The trek passes tribal villages and streams before reaching the cascading falls that drop through forested steps.',
  images: ['khoiyachora-waterfall.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 80,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'June to October',
    timeOfDay: 'Morning for cooler trekking conditions',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '5-6 hours from Chattogram city',
      fareRange: { min: 2200, max: 3000 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Village Tea Stall',
      description: 'Hot tea and snacks along the hiking trail.',
      priceRange: { min: 30, max: 80 },
    },
  ],
  safetyTips: [
    'The trail can be slippery; wear sturdy shoes.',
    'Hire a local guide for the mountainous terrain.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const napittachoraWaterfall: Destination = {
  id: 'napittachora-waterfall',
  name: 'Napittachora Waterfall',
  division: 'Chattogram',
  categories: ['River/Waterfall', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 145,
  description: 'A scenic waterfall tucked into Bandarban hills, ideal for trekking and nature photography.',
  fullHistory: 'Napittachora waterfall is reached by a moderate hike through forested hills. It is known for its clear pools and peaceful jungle setting.',
  images: ['napittachoraWaterfall.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 90,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'June to October',
    timeOfDay: 'Morning for clear water and cool air',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '5-7 hours from Chattogram city',
      fareRange: { min: 2300, max: 3200 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Forest Snack Hut',
      description: 'Local snacks near the hiking trail.',
      priceRange: { min: 40, max: 90 },
    },
  ],
  safetyTips: [
    'Keep hydrated and bring insect repellent.',
    'Trekking trails may be steep in places.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const kaptaiLake: Destination = {
  id: 'kaptai-lake',
  name: 'Kaptai Lake',
  division: 'Chattogram',
  categories: ['River/Waterfall', 'Natural/Scenic'],
  rating: 4.7,
  reviews: 590,
  description: 'Bangladesh\'s largest man-made lake, offering boat cruises and hill-framed water views.',
  fullHistory: 'Kaptai Lake was created after damming the Karnaphuli River and is now a popular recreation and fishing area. Its emerald waters are bordered by hills, islands, and forested shores.',
  images: ['kaptaiLake.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Early morning for calm water and soft light',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '4-5 hours from Chattogram city',
      fareRange: { min: 150, max: 250 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Lakeside Restaurant',
      description: 'Fresh fish and local dishes by the lake.',
      priceRange: { min: 200, max: 400 },
    },
  ],
  safetyTips: [
    'Bring sun protection for the lake shores.',
    'Boat rides may require advance booking in high season.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Half day to full day',
};

const shuvolongWaterfall: Destination = {
  id: 'shuvolong-waterfall',
  name: 'Shuvolong Waterfall',
  division: 'Chattogram',
  categories: ['River/Waterfall', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 170,
  description: 'A beautiful waterfall in Bandarban, set within a forested valley and accessible by trekking.',
  fullHistory: 'Shuvolong waterfall is one of the hidden gems in the Bandarban hill region. The path to the falls passes through forest trails and offers spectacular mountain scenery.',
  images: ['shuvolong-waterfall.png'],
  localEntryFee: 20,
  foreignEntryFee: 90,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'June to October',
    timeOfDay: 'Morning for clear stream flow and softer light',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '5-7 hours from Chattogram city',
      fareRange: { min: 2200, max: 3300 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Forest Snack Point',
      description: 'Light refreshments along the trail.',
      priceRange: { min: 50, max: 110 },
    },
  ],
  safetyTips: [
    'Wear good trekking shoes and stay on paths.',
    'Avoid visiting during heavy rain due to slippery conditions.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const nilgiri: Destination = {
  id: 'nilgiri',
  name: 'Nilgiri',
  division: 'Chattogram',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic'],
  rating: 4.6,
  reviews: 220,
  description: 'A hill station known for sweeping valley views and peaceful nature trails.',
  fullHistory: 'Nilgiri hill station was developed as a colonial retreat and is now a popular viewpoint overlooking valleys and forested hills. It offers walking trails, scenic overlooks, and cool mountain air.',
  images: ['nilgiri.jpg'],
  localEntryFee: 30,
  foreignEntryFee: 120,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Sunset for panoramic views and color',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '5-6 hours from Chattogram city',
      fareRange: { min: 2100, max: 3000 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Hilltop Tea Shop',
      description: 'Tea and local snacks at hill viewpoints.',
      priceRange: { min: 60, max: 140 },
    },
  ],
  safetyTips: [
    'Stay on mountain trails and avoid cliff edges.',
    'Weather can change quickly; dress in layers.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Half day',
};

const nilachal: Destination = {
  id: 'nilachal',
  name: 'Nilachal',
  division: 'Chattogram',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 210,
  description: 'A scenic ridge with panoramic views of hills, rivers, and tribal villages.',
  fullHistory: 'Nilachal is a highland viewpoint that has long attracted visitors for its sweeping vistas and peaceful hillside setting. The area is dotted with local settlements and viewpoints over lush valleys.',
  images: ['Nilachal.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 90,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Sunrise for soft morning light',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '5-6 hours from Chattogram city',
      fareRange: { min: 2100, max: 3000 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Local Hill Cafe',
      description: 'Light meals at a panoramic hilltop spot.',
      priceRange: { min: 80, max: 180 },
    },
  ],
  safetyTips: [
    'Bring warm clothes at higher elevations.',
    'Follow marked paths and watch your footing.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Half day',
};

const keokradong: Destination = {
  id: 'keokradong',
  name: 'Keokradong',
  division: 'Chattogram',
  categories: ['Hill/Hill-Tracts', 'Adventure/Wildlife'],
  rating: 4.7,
  reviews: 310,
  description: 'Bangladesh\'s tallest hill, famous with trekkers for its panoramic summit views.',
  fullHistory: 'Keokradong is one of the highest peaks in Bangladesh and an iconic destination for adventurers. The trek passes through forest and streams, rewarding visitors with broad views from the top.',
  images: ['keokradong.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Early morning for clear panoramic views',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '6-8 hours from Chattogram city',
      fareRange: { min: 2500, max: 3500 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Trail-side Snacks',
      description: 'Simple local snacks and tea for trekkers.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Trekkers should use a local guide and proper footwear.',
    'Bring sufficient water and sun protection.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const tazingDong: Destination = {
  id: 'tazing-dong',
  name: 'Tazing Dong',
  division: 'Chattogram',
  categories: ['Hill/Hill-Tracts', 'Adventure/Wildlife'],
  rating: 4.5,
  reviews: 185,
  description: 'A remote hill peak with dense forest, waterfalls, and tribal villages.',
  fullHistory: 'Tazing Dong is a less-traveled mountain area known for its natural beauty and hiking trails. The region offers a raw hill experience, with lush forests and opportunities to connect with local tribal communities.',
  images: ['tazing-dong.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for clear skies and cool air',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '7-8 hours from Chattogram city',
      fareRange: { min: 2800, max: 3800 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Village Tea Stall',
      description: 'Local refreshments near the trekking route.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'The route is remote; travel with a guide.',
    'Prepare for rugged trails and weather changes.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const bogaLake: Destination = {
  id: 'boga-lake',
  name: 'Boga Lake',
  division: 'Chattogram',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic'],
  rating: 4.7,
  reviews: 325,
  description: 'A high-altitude lake surrounded by steep hills, accessible through an adventurous trek.',
  fullHistory: 'Boga Lake is known for its serene blue waters set in a dramatic mountain amphitheater. It is a popular destination for hiking and camping amid the Hills of Bandarban.',
  images: ['Boga Lake.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for clear skies and calm water',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '6-8 hours from Chattogram city',
      fareRange: { min: 2600, max: 3600 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Camping Snack Stall',
      description: 'Simple food near the lake campsite.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Camping gear is recommended for the lake area.',
    'The hike can be steep and challenging.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const thanchi: Destination = {
  id: 'thanchi',
  name: 'Thanchi',
  division: 'Chattogram',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic'],
  rating: 4.4,
  reviews: 190,
  description: 'A remote hill town with rivers, forests, and bamboo bridge crossings.',
  fullHistory: 'Thanchi is tucked into the Bandarban hills and serves as a staging point for many river and hill treks. The area is loved for its wilderness, cultural villages, and river scenery.',
  images: ['Thanchi.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for fresh mountain air',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '7-8 hours from Chattogram city',
      fareRange: { min: 300, max: 500 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Local Hillside Eatery',
      description: 'Simple hill food and tea at the village market.',
      priceRange: { min: 60, max: 140 },
    },
  ],
  safetyTips: [
    'Remote location, so carry essentials.',
    'The river crossings may be difficult during rain.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const ruma: Destination = {
  id: 'ruma',
  name: 'Ruma',
  division: 'Chattogram',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic'],
  rating: 4.4,
  reviews: 205,
  description: 'A quiet hill area with rivers, valleys, and tribal communities.',
  fullHistory: 'Ruma is a scenic part of Bandarban known for its river views and peaceful hillside environment. It is a gateway to local villages and nature trails in the region.',
  images: ['Ruma.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Early morning for cool mist and quiet nature',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '6-7 hours from Chattogram city',
      fareRange: { min: 2300, max: 3300 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Riverfront Snack Hut',
      description: 'Light local food near the riverside.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Carry mosquito repellent and bottled water.',
    'Respect local village customs.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const hangingBridge: Destination = {
  id: 'hanging-bridge',
  name: 'Hanging Bridge',
  division: 'Chattogram',
  categories: ['Hill/Hill-Tracts', 'Adventure/Wildlife'],
  rating: 4.3,
  reviews: 145,
  description: 'A thrilling suspension bridge connecting scenic hill paths.',
  fullHistory: 'The hanging bridge is an iconic adventure attraction in Bandarban, offering a unique crossing experience over a deep valley. It is popular with hikers and photographers.',
  images: ['Hanging Bridge.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 50,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Afternoon for dramatic lighting',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '6-7 hours from Chattogram city',
      fareRange: { min: 2400, max: 3400 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Bridge-side Snacks',
      description: 'Tea and snacks near the bridge approach.',
      priceRange: { min: 40, max: 90 },
    },
  ],
  safetyTips: [
    'Do not overcrowd the bridge; follow local guidance.',
    'Hold on to the railing and walk carefully.',
  ],
  userReviews: [],
  estimatedVisitDuration: '30-45 minutes',
};

const alutilaCave: Destination = {
  id: 'alutila-cave',
  name: 'Alutila Cave',
  division: 'Chattogram',
  categories: ['Hill/Hill-Tracts', 'Adventure/Wildlife'],
  rating: 4.4,
  reviews: 190,
  description: 'A limestone cave with a dark tunnel path and cool interior air.',
  fullHistory: 'Alutila Cave is a natural limestone cave in Bandarban that attracts adventure-seekers. Visitors walk through a long dark passage to reach a lighted interior chamber, making it an exciting cave experience.',
  images: ['Alutila Cave.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 80,
  openingHours: '8:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for cooler cave conditions',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '6-7 hours from Chattogram city',
      fareRange: { min: 2300, max: 3300 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Cave Entrance Stall',
      description: 'Local snacks and drinks near the cave entrance.',
      priceRange: { min: 40, max: 90 },
    },
  ],
  safetyTips: [
    'Bring a flashlight for the unlit cave sections.',
    'Wear closed shoes with good grip.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const richangWaterfall: Destination = {
  id: 'richang-waterfall',
  name: 'Richang Waterfall',
  division: 'Chattogram',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic'],
  rating: 4.3,
  reviews: 165,
  description: 'A cascading hill waterfall with a rocky pool and lush greenery.',
  fullHistory: 'Richang waterfall is a scenic natural attraction in the Bandarban hills, famous for its dramatic drop and forest surroundings. The area is popular with nature lovers and photographers.',
  images: ['Richang Waterfall.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 90,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'June to October',
    timeOfDay: 'Morning for misty waterfall views',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '5-7 hours from Chattogram city',
      fareRange: { min: 2200, max: 3200 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Waterfall Snack Stall',
      description: 'Tea and light food near the waterfall path.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'The rocks around the waterfall can be slippery.',
    'Do not enter deep pools without checking depth first.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Half day',
};

const inaniBeach: Destination = {
  id: 'inani-beach',
  name: 'Inani Beach',
  division: 'Chattogram',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.6,
  reviews: 820,
  description: 'A quiet beach with coral stones and clear blue water south of Cox\'s Bazar.',
  fullHistory: 'Inani Beach is known for its long clean shoreline and scattered coral formations. It is quieter than Cox\'s Bazar and popular for walking, swimming, and beach relaxation.',
  images: ['Inani Beach.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for softer light and calm sea',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '30-40 minutes from Cox\'s Bazar town',
      fareRange: { min: 250, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Beachside Snack Stall',
      description: 'Fresh coconut water and seafood snacks by the beach.',
      priceRange: { min: 80, max: 220 },
    },
  ],
  safetyTips: [
    'Keep distance from strong currents and swim in shallow areas.',
    'Protect your feet from sharp coral stones.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const laboniBeach: Destination = {
  id: 'laboni-beach',
  name: 'Laboni Beach',
  division: 'Chattogram',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 740,
  description: 'A popular beach near Cox\'s Bazar town with easy access and soft sand.',
  fullHistory: 'Laboni Beach is the main beach area for visitors staying in Cox\'s Bazar town. It is known for its accessible shoreline, lifeguard posts, and vibrant beach culture.',
  images: ['Laboni Beach.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Sunset for dramatic skies and beach activity',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '10-15 minutes from Cox\'s Bazar town center',
      fareRange: { min: 30, max: 70 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Beachfront Canteen',
      description: 'Fast beach food and seafood snacks.',
      priceRange: { min: 90, max: 260 },
    },
  ],
  safetyTips: [
    'Stay hydrated and use sun protection.',
    'Watch for changing tides if walking along the shore.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const himchari: Destination = {
  id: 'himchari',
  name: 'Himchari',
  division: 'Chattogram',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.6,
  reviews: 680,
  description: 'A coastal park with waterfalls, cliff views, and a rocky shoreline near Cox\'s Bazar.',
  fullHistory: 'Himchari is a scenic coastal park known for its sea views, forested trails, and a small waterfall. It is a popular day-trip destination from Cox\'s Bazar.',
  images: ['Himchari.jpg'],
  localEntryFee: 40,
  foreignEntryFee: 150,
  openingHours: '9:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for cool sea breeze and better visibility',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '20-25 minutes from Cox\'s Bazar town',
      fareRange: { min: 200, max: 350 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Himchari Food Plaza',
      description: 'Seafood and snacks near the park entrance.',
      priceRange: { min: 120, max: 320 },
    },
  ],
  safetyTips: [
    'Be cautious near cliff edges and rocky areas.',
    'Avoid swimming in strong waves near the park coastline.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const saintMartinsIsland: Destination = {
  id: 'saint-martins-island',
  name: 'Saint Martin’s Island',
  division: 'Chattogram',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.8,
  reviews: 900,
  description: 'A tiny coral island with turquoise water, sandy beaches, and rustic island life.',
  fullHistory: 'Saint Martin\'s Island is Bangladesh\'s only coral island and a top destination for beach lovers. Visitors arrive by boat to enjoy simple island life, seafood, and clear ocean water.',
  images: ['Saint Martin’s Island.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to April',
    timeOfDay: 'Morning for calm sea and island exploration',
  },
  transportOptions: [
    {
      type: 'Boat',
      estimatedTime: '2-3 hours from Cox\'s Bazar jetty',
      fareRange: { min: 1200, max: 2000 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Island Seafood Stall',
      description: 'Fresh seafood served by local beach restaurants.',
      priceRange: { min: 200, max: 450 },
    },
  ],
  safetyTips: [
    'Book your boat trip in advance during high season.',
    'Bring sun protection and stay hydrated.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const sonadiaIsland: Destination = {
  id: 'sonadia-island',
  name: 'Sonadia Island',
  division: 'Chattogram',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 165,
  description: 'A quiet island with mangroves, turtle nesting sites, and serene beaches.',
  fullHistory: 'Sonadia Island is known for its wildlife conservation and mangrove ecosystems. It is a lesser-visited island where visitors can see coastal habitats and simple island life.',
  images: ['Sonadia Island.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to April',
    timeOfDay: 'Morning for bird watching and coastal walks',
  },
  transportOptions: [
    {
      type: 'Boat',
      estimatedTime: '2-3 hours from Cox\'s Bazar',
      fareRange: { min: 1300, max: 2200 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Island Food Stall',
      description: 'Fresh local dishes at a small island eatery.',
      priceRange: { min: 120, max: 280 },
    },
  ],
  safetyTips: [
    'Respect wildlife habitats and avoid disturbing nesting turtles.',
    'Bring water and a hat for sun protection.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const moheskhaliIsland: Destination = {
  id: 'moheshkhali-island',
  name: 'Moheshkhali Island',
  division: 'Chattogram',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.4,
  reviews: 275,
  description: 'The largest island of Cox\'s Bazar with cultural villages, salt fields, and coastal scenery.',
  fullHistory: 'Moheshkhali Island is reachable by ferry and offers rural island life, temples, and scenic coastal roads. It is known for salt production and peaceful seaside villages.',
  images: ['moheskhali.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to April',
    timeOfDay: 'Morning for island exploration and coastal views',
  },
  transportOptions: [
    {
      type: 'Ferry',
      estimatedTime: '1-2 hours from Cox\'s Bazar',
      fareRange: { min: 200, max: 400 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Island Village Eatery',
      description: 'Traditional fish dishes near village shores.',
      priceRange: { min: 120, max: 300 },
    },
  ],
  safetyTips: [
    'Carry essentials as facilities are rustic.',
    'Ferry schedules may vary by season.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const cheraDwip: Destination = {
  id: 'chera-dwip',
  name: 'Chera Dwip',
  division: 'Chattogram',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.3,
  reviews: 220,
  description: 'A narrow island reachable by boat from Cox\'s Bazar, known for clear water and coral sand.',
  fullHistory: 'Chera Dwip is a small island that appears connected to Cox\'s Bazar Beach at low tide. It is popular for beach walks, swimming, and exploring the shallow island area.',
  images: ['Chera Dwip.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to April',
    timeOfDay: 'Low tide for easier access and beach exploring',
  },
  transportOptions: [
    {
      type: 'Boat',
      estimatedTime: '30-40 minutes from Cox\'s Bazar',
      fareRange: { min: 200, max: 400 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Boat-side Refreshments',
      description: 'Light snacks available at landing points.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Check tide conditions before visiting Chera Dwip.',
    'Bring snacks and water since the island has limited facilities.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const patengaBeach: Destination = {
  id: 'patenga-beach',
  name: 'Patenga Beach',
  division: 'Chattogram',
  categories: ['Sea/Beach', 'Urban/Modern'],
  rating: 4.2,
  reviews: 560,
  description: 'A popular city beach near Chattogram port, known for colorful boats and sunset views.',
  fullHistory: 'Patenga Beach is located at the mouth of the Karnaphuli River and is a favorite spot for local families. The beach offers sea views, cafes, and a lively promenade atmosphere.',
  images: ['Patenga Beach.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Sunset for dramatic coastal skies',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '20-30 minutes from Chattogram city center',
      fareRange: { min: 150, max: 250 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Patenga Food Row',
      description: 'Seafood stalls and local fast food along the promenade.',
      priceRange: { min: 100, max: 280 },
    },
  ],
  safetyTips: [
    'Do not swim too far from the shore.',
    'Beware of strong winds and waves after sunset.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const parkiBeach: Destination = {
  id: 'parki-beach',
  name: 'Parki Beach',
  division: 'Chattogram',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.2,
  reviews: 275,
  description: 'A quieter stretch of beach near Cox\'s Bazar, ideal for walks and beachside relaxation.',
  fullHistory: 'Parki Beach is a lesser-known destination near Cox\'s Bazar with peaceful sand and fewer crowds. It is good for visitors who want a relaxed coast experience.',
  images: ['Parki Beach.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for quiet beach walks',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from Cox\'s Bazar town',
      fareRange: { min: 40, max: 80 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Beach Picnic Stall',
      description: 'Light snacks and cold drinks along the beach.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Keep personal items secure on a quiet beach.',
    'Bring water and shade for midday sun.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const nijhumDwip: Destination = {
  id: 'nijhum-dwip',
  name: 'Nijhum Dwip',
  division: 'Chattogram',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 305,
  description: 'A tranquil island in the Bay of Bengal with mangroves, wildlife, and quiet beaches.',
  fullHistory: 'Nijhum Dwip is a peaceful island that emerged from silted deposits and developed into a national park. It is known for bird life, deer, and calm water channels.',
  images: ['Nijhum Dwip.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to April',
    timeOfDay: 'Morning for bird watching and quiet island views',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Chattogram or Cox\'s Bazar by shared boat service',
      fareRange: { min: 1200, max: 2200 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Island Shacks',
      description: 'Local island food and snacks.',
      priceRange: { min: 100, max: 250 },
    },
  ],
  safetyTips: [
    'The island has limited facilities; bring essentials.',
    'Respect the natural environment and wildlife.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const mahasthangarh: Destination = {
  id: 'mahasthangarh',
  name: 'Mahasthangarh',
  division: 'Rajshahi',
  categories: ['Historical', 'Natural/Scenic'],
  rating: 4.7,
  reviews: 420,
  description: 'The oldest archaeological site in Bangladesh, with vast ruins and ancient fortifications.',
  fullHistory: 'Mahasthangarh dates back over 2,500 years and was a major fortified city in ancient Bengal. Visitors can explore the remains of city walls, temples, and ancient pathways amid a unique historical landscape.',
  images: ['Mahasthangarh.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 120,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for cooler weather and clear site views',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1-2 hours from Rajshahi city',
      fareRange: { min: 60, max: 120 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Local Canteen',
      description: 'Simple meals and tea near the archaeological site.',
      priceRange: { min: 50, max: 150 },
    },
  ],
  safetyTips: [
    'Wear comfortable shoes for walking the uneven ruins.',
    'Carry water and sun protection for the open site.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const somapuraMahavihara: Destination = {
  id: 'somapura-mahavihara',
  name: 'Somapura Mahavihara',
  division: 'Rajshahi',
  categories: ['Historical', 'Natural/Scenic'],
  rating: 4.6,
  reviews: 380,
  description: 'A UNESCO World Heritage site and one of the largest Buddhist monasteries of the ancient world.',
  fullHistory: 'Somapura Mahavihara was built in the 8th century as a major center of Buddhist scholarship and monastic life. The complex contains a large central shrine, monastery cells, and richly carved stone decorations.',
  images: ['Somapura Mahavihara.jpg'],
  localEntryFee: 30,
  foreignEntryFee: 180,
  openingHours: '9:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Late morning after cooler sunrise hours',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1 hour from Paharpur town',
      fareRange: { min: 40, max: 80 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Heritage Cafe',
      description: 'Light refreshments near the archaeological site.',
      priceRange: { min: 80, max: 180 },
    },
  ],
  safetyTips: [
    'Stay on marked paths around the ruins.',
    'No climbing on fragile structures to preserve heritage.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const puthiaRajbari: Destination = {
  id: 'puthia-rajbari',
  name: 'Puthia Rajbari',
  division: 'Rajshahi',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.4,
  reviews: 220,
  description: 'A palace complex known for its terracotta architecture and ornate courtyards.',
  fullHistory: 'Puthia Rajbari is part of a cluster of historic palaces built by the Puthia estate. The site has several mansions featuring decorative facades, murals, and expansive grounds for exploration.',
  images: ['Puthia Rajbari.jpg'],
  localEntryFee: 25,
  foreignEntryFee: 150,
  openingHours: '10:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Afternoon after exploring the palace grounds',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '20-30 minutes from Rajshahi city',
      fareRange: { min: 200, max: 300 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Palace Road Cafe',
      description: 'Local dishes served near Puthia palace heritage sites.',
      priceRange: { min: 100, max: 250 },
    },
  ],
  safetyTips: [
    'Respect the historic interiors and avoid touching delicate decorations.',
    'Bring water and wear sun protection for courtyard walking.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1.5-2 hours',
};

const natoreRajbari: Destination = {
  id: 'natore-rajbari',
  name: 'Natore Rajbari',
  division: 'Rajshahi',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.3,
  reviews: 190,
  description: 'A historic nawab palace with landscaped gardens and impressive Mughal-style architecture.',
  fullHistory: 'Natore Rajbari was the residence of the local Nawab family and remains a prominent example of colonial-era and Mughal-influenced design. The estate features fountains, garden lawns, and decorative galleries.',
  images: ['Natore Rajbari.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 120,
  openingHours: '10:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for quiet garden views',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1 hour from Natore bus station',
      fareRange: { min: 60, max: 100 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Estate Cafe',
      description: 'Traditional Bengali food near the palace area.',
      priceRange: { min: 90, max: 220 },
    },
  ],
  safetyTips: [
    'Wear comfortable shoes for the large palace grounds.',
    'Respect any restricted areas on the estate.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1.5-2 hours',
};

const padmaRiverBank: Destination = {
  id: 'padma-river-bank',
  name: 'Padma River Bank',
  division: 'Rajshahi',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.5,
  reviews: 310,
  description: 'A scenic riverfront area ideal for sunset walks, boat rides, and local riverside markets.',
  fullHistory: 'The Padma River is one of the major waterways of Bangladesh, and its banks near Rajshahi are popular for leisure and cultural visits. Visitors can ride boats, shop at riverside stalls, and enjoy panoramic water views.',
  images: ['Padma River Bank.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 8:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Sunset for the best river views',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '20-30 minutes from Rajshahi city',
      fareRange: { min: 30, max: 70 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Riverfront Stall',
      description: 'Local snacks and tea with river views.',
      priceRange: { min: 50, max: 150 },
    },
  ],
  safetyTips: [
    'Stay clear of the river edge during strong currents.',
    'Carry water and sun protection for long walks.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const localWetlands: Destination = {
  id: 'local-wetlands',
  name: 'Local Wetlands',
  division: 'Rajshahi',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.2,
  reviews: 140,
  description: 'Wetland zones around Rajshahi that support birdlife and seasonal riverside scenery.',
  fullHistory: 'The wetlands near Rajshahi are part of the local river environment, attracting migratory birds and traditional fishing communities. They provide a peaceful natural experience with boat rides and birdwatching.',
  images: ['Local Wetlands.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to February',
    timeOfDay: 'Morning for birdwatching and calm water',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '30-40 minutes from Rajshahi city',
      fareRange: { min: 150, max: 250 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Wetland Food Stall',
      description: 'Local snacks beside nature spots.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Watch for slippery paths near wetlands.',
    'Carry insect repellent during the warmer months.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const mangoOrchardTourism: Destination = {
  id: 'mango-orchard-tourism',
  name: 'Mango Orchard Tourism',
  division: 'Rajshahi',
  categories: ['Natural/Scenic', 'Urban/Modern'],
  rating: 4.6,
  reviews: 260,
  description: 'Seasonal mango orchard tours with tasting sessions and rural farm visits.',
  fullHistory: 'Rajshahi is famous as the mango capital of Bangladesh, and orchard tourism offers visitors a chance to explore farms, taste fresh varieties, and learn about mango cultivation during harvest season.',
  images: ['Mango Orchard Tourism.jpg'],
  localEntryFee: 30,
  foreignEntryFee: 120,
  openingHours: '9:00 AM - 4:00 PM (Seasonal)',
  bestTimeToVisit: {
    season: 'May to July',
    timeOfDay: 'Morning for cooler orchard walks',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '30-45 minutes from Rajshahi city',
      fareRange: { min: 180, max: 300 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Orchard Refreshment Stall',
      description: 'Fresh mango slices and juice served on site.',
      priceRange: { min: 80, max: 200 },
    },
  ],
  safetyTips: [
    'Schedule visits during the mango season to see orchards in bloom.',
    'Bring sun protection and plenty of water.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const sixtyDomeMosque: Destination = {
  id: 'sixty-dome-mosque',
  name: 'Sixty Dome Mosque',
  division: 'Khulna',
  categories: ['Historical', 'Religious'],
  rating: 4.7,
  reviews: 510,
  description: 'A monumental mosque from the 15th century with many domes and stone carvings.',
  fullHistory: 'The Sixty Dome Mosque, or Shat Gambuj Masjid, was built in the 15th century and is a prominent example of Bengal Sultanate architecture. Its large prayer hall features a forest of stone columns and many domes overhead.',
  images: ['Sixty Dome Mosque.jpg'],
  localEntryFee: 30,
  foreignEntryFee: 150,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to February',
    timeOfDay: 'Morning after prayers for peaceful atmosphere',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1-2 hours from Khulna city',
      fareRange: { min: 60, max: 120 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Local Muslim Cuisine Stall',
      description: 'Traditional dishes served near the heritage mosque.',
      priceRange: { min: 80, max: 220 },
    },
  ],
  safetyTips: [
    'Dress modestly and remove shoes before entering prayer areas.',
    'Respect visitors during prayer times.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const liberationWarMuseumKhulna: Destination = {
  id: 'liberation-war-museum-khulna',
  name: 'Liberation War Museum',
  division: 'Khulna',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.5,
  reviews: 250,
  description: 'A museum dedicated to Bangladesh\'s liberation struggle with exhibits and memorials.',
  fullHistory: 'The Liberation War Museum in Khulna houses artifacts, documents, and displays related to the 1971 independence movement. It serves as a remembrance site for local contributions and wartime stories.',
  images: ['Liberation War Museum.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '9:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Late morning for quieter museum time',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from Khulna city center',
      fareRange: { min: 30, max: 60 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Museum Cafe',
      description: 'Light refreshments and snacks near the museum.',
      priceRange: { min: 70, max: 180 },
    },
  ],
  safetyTips: [
    'Keep quiet in exhibit halls and follow museum rules.',
    'Store bags if requested by staff.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-1.5 hours',
};

const sundarbans: Destination = {
  id: 'sundarbans',
  name: 'Sundarbans',
  division: 'Khulna',
  categories: ['Natural/Scenic', 'Adventure/Wildlife'],
  rating: 4.8,
  reviews: 890,
  description: 'The world\'s largest mangrove forest, home to tigers, deer, and rich ecosystems.',
  fullHistory: 'The Sundarbans spans across Bangladesh and India and is a UNESCO World Heritage site. It is famous for its dense mangrove forest, unique wildlife, and traditional river-based villages.',
  images: ['Sundarbans.jpg'],
  localEntryFee: 100,
  foreignEntryFee: 350,
  openingHours: '6:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for wildlife sightings and calm waterways',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Khulna city',
      fareRange: { min: 150, max: 300 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Forest Lodge Meals',
      description: 'Local fish and rice meals at forest accommodations.',
      priceRange: { min: 150, max: 350 },
    },
  ],
  safetyTips: [
    'Always travel with an authorized boat and guide.',
    'Do not feed or disturb wildlife.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const mangroveEcosystemZones: Destination = {
  id: 'mangrove-ecosystem-zones',
  name: 'Mangrove Ecosystem Zones',
  division: 'Khulna',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.6,
  reviews: 320,
  description: 'Mangrove forest areas that showcase the tidal wetlands and biodiversity of the Sundarbans edge.',
  fullHistory: 'The mangrove ecosystem zones near Khulna are critical habitats for birds, fish, and coastal vegetation. They illustrate the riverine tidal landscapes that support local communities and wildlife alike.',
  images: ['Mangrove Ecosystem Zones.jpg'],
  localEntryFee: 50,
  foreignEntryFee: 200,
  openingHours: '6:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to February',
    timeOfDay: 'Morning for vibrant wildlife activity',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Khulna city',
      fareRange: { min: 180, max: 300 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Mangrove Eco Cafe',
      description: 'Local food and refreshments near the mangrove boundary.',
      priceRange: { min: 120, max: 280 },
    },
  ],
  safetyTips: [
    'Keep insect repellent handy around wetland areas.',
    'Follow your guide\'s safety instructions at all times.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Half day',
};

const dublarChar: Destination = {
  id: 'dublar-char',
  name: 'Dublar Char',
  division: 'Khulna',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 215,
  description: 'A sandy island in the Sundarbans known for fishing camps, migratory birds, and tidal beaches.',
  fullHistory: 'Dublar Char is a remote island accessible by boat and is renowned for its seasonal fishing camps and birdlife. It offers a unique coastal island experience in the Bay of Bengal.',
  images: ['Dublar Char.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for calm tides and boat views',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '3-4 hours from Khulna by boat',
      fareRange: { min: 1800, max: 2600 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Island Fish Camp',
      description: 'Fresh seafood prepared by local fishing communities.',
      priceRange: { min: 200, max: 400 },
    },
  ],
  safetyTips: [
    'The island is remote; bring essentials and follow your guide.',
    'Boat schedules depend on tides and weather.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const kuakataSeaBeach: Destination = {
  id: 'kuakata-sea-beach',
  name: 'Kuakata Sea Beach',
  division: 'Barishal',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.7,
  reviews: 780,
  description: 'A panoramic beach known for its sunrise and sunset views over the Bay of Bengal.',
  fullHistory: 'Kuakata Sea Beach is famous for offering both sunrise and sunset views from the same shoreline. It is a coastal destination with sandy beaches, local fishing villages, and relaxing sea breezes.',
  images: ['kuakata.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Sunrise and sunset for the most dramatic views',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '6-7 hours from Barishal city',
      fareRange: { min: 200, max: 350 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Beachside Canteen',
      description: 'Local seafood and snacks on the beach.',
      priceRange: { min: 100, max: 300 },
    },
  ],
  safetyTips: [
    'Do not swim too far from the shore.',
    'Bring insect repellent for the early morning hours.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const manpuraIsland: Destination = {
  id: 'manpura-island',
  name: 'Manpura Island',
  division: 'Barishal',
  categories: ['Sea/Beach', 'Natural/Scenic'],
  rating: 4.4,
  reviews: 215,
  description: 'A quiet island with river and sea channels, coastal villages, and rustic island life.',
  fullHistory: 'Manpura Island sits in the Bay of Bengal and is connected by ferries from Barishal. It is known for its fishing communities, beaches, and rural island vistas.',
  images: ['monpura.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to April',
    timeOfDay: 'Morning for calm coastal views',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '3-4 hours by boat from Barishal',
      fareRange: { min: 1500, max: 2300 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Island Fishing Shack',
      description: 'Fresh catch and simple local meals.',
      priceRange: { min: 120, max: 260 },
    },
  ],
  safetyTips: [
    'Island logistics are rustic; plan accordingly.',
    'Ferry travel depends on weather and tide.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const meghnaEstuaryViews: Destination = {
  id: 'meghna-estuary-views',
  name: 'Meghna Estuary Views',
  division: 'Barishal',
  categories: ['River/Waterfall', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 290,
  description: 'Dramatic river estuary scenery where the Meghna meets the Bay of Bengal.',
  fullHistory: 'The Meghna Estuary is a major river meeting point with sweeping views of tidal water and river channels. Visitors come to see boats, river life, and coastal wetlands near Barishal.',
  images: ['meghna.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Sunset for dramatic river views',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '30-40 minutes from Barishal town',
      fareRange: { min: 40, max: 80 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'River View Stall',
      description: 'Local fish and rice dishes with estuary views.',
      priceRange: { min: 80, max: 200 },
    },
  ],
  safetyTips: [
    'Stay back from the water edge at high tide.',
    'Bring sun protection for open river banks.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const riverfrontTourismBarishal: Destination = {
  id: 'riverfront-tourism-barishal',
  name: 'Riverfront Tourism',
  division: 'Barishal',
  categories: ['River/Waterfall', 'Urban/Modern'],
  rating: 4.3,
  reviews: 160,
  description: 'Riverfront promenades and small town river markets along Barishal waterways.',
  fullHistory: 'Barishal is one of Bangladesh\'s major river cities, with riverfront neighborhoods and boat piers that reflect traditional trade and everyday life. The riverfront zones are excellent for walking, photography, and local snacks.',
  images: ['riverfront.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '7:00 AM - 7:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Evening for river breeze and sunset walk',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from central Barishal',
      fareRange: { min: 30, max: 60 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Riverbank Food Stall',
      description: 'Street food near the river promenade.',
      priceRange: { min: 60, max: 150 },
    },
  ],
  safetyTips: [
    'Be careful near busy river landing areas.',
    'Carry light snacks and water for long walks.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const floatingMarketAreas: Destination = {
  id: 'floating-market-areas',
  name: 'Floating Market Areas',
  division: 'Barishal',
  categories: ['Urban/Modern', 'Natural/Scenic'],
  rating: 4.4,
  reviews: 210,
  description: 'River markets where vendors sell goods from boats and river commerce remains alive.',
  fullHistory: 'Floating markets near Barishal showcase traditional river trade and daily commerce, with boats loaded with produce, fish, and goods. They provide a lively cultural experience on the water.',
  images: ['market.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 11:00 AM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Early morning when the market is busiest',
  },
  transportOptions: [
    {
      type: 'Boat',
      estimatedTime: '20-30 minutes from Barishal waterfront',
      fareRange: { min: 100, max: 200 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Market Snack Boat',
      description: 'Fresh food sold from boats during market hours.',
      priceRange: { min: 50, max: 150 },
    },
  ],
  safetyTips: [
    'Keep your belongings secure on board.',
    'Wear a life jacket if approaching markets by boat.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const shahjalalMazar: Destination = {
  id: 'shahjalal-mazar',
  name: 'Shahjalal Mazar',
  division: 'Sylhet',
  categories: ['Religious', 'Historical'],
  rating: 4.8,
  reviews: 620,
  description: 'The shrine of Shah Jalal, a major spiritual center in Sylhet.',
  fullHistory: 'Shahjalal Mazar marks the tomb of Shah Jalal, a revered Sufi saint who helped spread Islam in the region. The shrine is a pilgrimage site and a culturally important landmark in Sylhet.',
  images: ['Shahjalal Mazar.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '5:00 AM - 10:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for quieter prayer spaces',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '10-15 minutes from Sylhet city center',
      fareRange: { min: 30, max: 60 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Shrine Cafe',
      description: 'Tea and light snacks near the shrine complex.',
      priceRange: { min: 40, max: 120 },
    },
  ],
  safetyTips: [
    'Respect local worship customs and dress modestly.',
    'Remove shoes before entering certain areas.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const shahParanMazar: Destination = {
  id: 'shah-paran-mazar',
  name: 'Shah Paran Mazar',
  division: 'Sylhet',
  categories: ['Religious', 'Historical'],
  rating: 4.7,
  reviews: 490,
  description: 'A peaceful shrine dedicated to the Sufi saint Shah Paran.',
  fullHistory: 'Shah Paran was a companion of Shah Jalal and is remembered for his spiritual influence in Sylhet. The mazar attracts pilgrims and visitors interested in Sufi heritage and peaceful gardens.',
  images: ['Shah Paran Mazar.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '5:00 AM - 10:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Afternoon for quieter reflection time',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from Sylhet city',
      fareRange: { min: 40, max: 80 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Sufi Garden Cafe',
      description: 'Simple food and refreshments near the shrine.',
      priceRange: { min: 50, max: 140 },
    },
  ],
  safetyTips: [
    'Follow shrine etiquette and keep noise low.',
    'Ask before taking photographs of worshippers.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-1.5 hours',
};

const teaGardenHeritageZones: Destination = {
  id: 'tea-garden-heritage-zones',
  name: 'Tea Garden Heritage Zones',
  division: 'Sylhet',
  categories: ['Natural/Scenic', 'Historical'],
  rating: 4.7,
  reviews: 560,
  description: 'Rolling tea estates with colonial-era bungalows and lush green valley views.',
  fullHistory: 'Sylhet\'s tea gardens are among the oldest in South Asia, with heritage plantations and factory tours that highlight tea production and estate life.',
  images: ['Tea Garden Heritage Zones.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for misty tea hills and cooler air',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '30-40 minutes from Sylhet city',
      fareRange: { min: 250, max: 400 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Tea Estate Cafe',
      description: 'Tea tastings and light meals at the estate.',
      priceRange: { min: 120, max: 280 },
    },
  ],
  safetyTips: [
    'Wear closed shoes for walking through tea fields.',
    'Respect plantation rules and private property boundaries.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const ratargulSwampForest: Destination = {
  id: 'ratargul-swamp-forest',
  name: 'Ratargul Swamp Forest',
  division: 'Sylhet',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.6,
  reviews: 620,
  description: 'A freshwater swamp forest with boat rides through flooded trees and mossy waterways.',
  fullHistory: 'Ratargul Swamp Forest is one of the few freshwater swamp forests remaining in Bangladesh. Visitors explore its flooded lanes by boat, seeing dense tree canopies and aquatic plant life.',
  images: ['Ratargul Swamp Forest.jpg'],
  localEntryFee: 30,
  foreignEntryFee: 150,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'June to September',
    timeOfDay: 'Afternoon when water levels are higher',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '1-1.5 hours from Sylhet city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Swamp Forest Snack Hut',
      description: 'Tea and local snacks near the forest boat launch.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Boat rides are best during higher water levels.',
    'Carry a raincoat for monsoon visits.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const jaflong: Destination = {
  id: 'jaflong',
  name: 'Jaflong',
  division: 'Sylhet',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.5,
  reviews: 700,
  description: 'A scenic river valley on the Bangladesh-India border, famous for tea gardens and stone collection sites.',
  fullHistory: 'Jaflong is known for its dramatic river valley scenery, ethnic hill communities, and the Dawki river. It is a popular destination for river rafting, stone collection views, and tea garden backdrops.',
  images: ['Jaflong.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for clear river views and cool weather',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Sylhet city',
      fareRange: { min: 300, max: 500 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'River Valley Stall',
      description: 'Local snacks and tea with river views.',
      priceRange: { min: 60, max: 140 },
    },
  ],
  safetyTips: [
    'The river is strong; stay on marked areas and follow guides.',
    'Wear shoes suitable for wet terrain.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const lalakhal: Destination = {
  id: 'lalakhal',
  name: 'Lalakhal',
  division: 'Sylhet',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.6,
  reviews: 430,
  description: 'A blue river section with boat rides and crystal clear water in the Sylhet hills.',
  fullHistory: 'Lalakhal is a striking stretch of the Shari river, famous for its blue water and scenic boat cruises through the hills. It is a popular excursion from Sylhet city.',
  images: ['Lalakhal.png'],
  localEntryFee: 10,
  foreignEntryFee: 80,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for clearer water and softer light',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Sylhet city',
      fareRange: { min: 300, max: 500 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'River Bank Stall',
      description: 'Tea and local snacks beside the river.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Boat rides should be conducted by licensed operators.',
    'Bring sun protection and stay hydrated.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const lawacharaNationalPark: Destination = {
  id: 'lawachara-national-park',
  name: 'Lawachara National Park',
  division: 'Sylhet',
  categories: ['Natural/Scenic', 'Adventure/Wildlife'],
  rating: 4.7,
  reviews: 540,
  description: 'A rainforest reserve with hiking trails and rich biodiversity.',
  fullHistory: 'Lawachara National Park protects tropical rainforest habitat and is home to many bird and primate species. The park includes trails, observation points, and conservation education.',
  images: ['Lawachara National Park.jpg'],
  localEntryFee: 40,
  foreignEntryFee: 180,
  openingHours: '8:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for birdwatching and cool forest walk',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '45-60 minutes from Sylhet city',
      fareRange: { min: 250, max: 350 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Forest Visitor Stall',
      description: 'Light refreshments for park visitors.',
      priceRange: { min: 50, max: 130 },
    },
  ],
  safetyTips: [
    'Stay on marked trails and avoid disturbing wildlife.',
    'Bring insect repellent and wear sturdy shoes.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const hamHamWaterfall: Destination = {
  id: 'ham-ham-waterfall',
  name: 'Ham Ham Waterfall',
  division: 'Sylhet',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.5,
  reviews: 320,
  description: 'A pleasant waterfall tucked in the hills, ideal for trekking and cooling off.',
  fullHistory: 'Ham Ham Waterfall is located near Jaflong and is a scenic natural site popular with local travelers. It offers a peaceful trek through forested hills to reach the falls.',
  images: ['Ham Ham Waterfall.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 90,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'June to October',
    timeOfDay: 'Morning after rain for the strongest flow',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Sylhet city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Trail Snack Stall',
      description: 'Simple refreshments near the waterfall path.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'The trail can be slippery when wet; wear proper footwear.',
    'Do not climb on the waterfall rocks.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const madhabpurLake: Destination = {
  id: 'madhabpur-lake',
  name: 'Madhabpur Lake',
  division: 'Sylhet',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.4,
  reviews: 260,
  description: 'A tranquil lake surrounded by tea gardens and forested hills.',
  fullHistory: 'Madhabpur Lake is a quiet natural spot near Jaflong, known for its calm waters and scenic surroundings. It is a good place to relax and enjoy the lush Sylhet landscape.',
  images: ['Madhabpur Lake.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for calm reflections and soft light',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Sylhet city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Lake Cafe',
      description: 'Simple food and tea by the lake.',
      priceRange: { min: 60, max: 140 },
    },
  ],
  safetyTips: [
    'Stay back from the water edge when the lake is crowded.',
    'Carry insect repellent for the surrounding trees.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const satchariNationalPark: Destination = {
  id: 'satchari-national-park',
  name: 'Satchari National Park',
  division: 'Sylhet',
  categories: ['Natural/Scenic', 'Adventure/Wildlife'],
  rating: 4.5,
  reviews: 310,
  description: 'A biodiversity-rich forest with trails, wildlife, and rural eco-tourism.',
  fullHistory: 'Satchari National Park conserves evergreen forest and supports a range of wildlife species. The park includes trekking paths, nature interpretation, and homestay experiences in local villages.',
  images: ['Satchari National Park.jpg'],
  localEntryFee: 30,
  foreignEntryFee: 150,
  openingHours: '8:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for bird and wildlife sightings',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Sylhet city',
      fareRange: { min: 280, max: 420 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Forest Homestay Kitchen',
      description: 'Local food served by community homestays.',
      priceRange: { min: 80, max: 180 },
    },
  ],
  safetyTips: [
    'Stay on designated trails and avoid disturbing wildlife.',
    'Carry water and wear insect repellent.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const hakalukiHaor: Destination = {
  id: 'hakaluki-haor',
  name: 'Hakaluki Haor',
  division: 'Sylhet',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.6,
  reviews: 420,
  description: 'One of the largest freshwater wetlands in Bangladesh, filled with migratory birds and floating vegetation.',
  fullHistory: 'Hakaluki Haor is a vast wetland ecosystem that supports diverse bird species and fishing communities. It is best visited during the dry season when water levels are lower and the haor landscape opens up.',
  images: ['Hakaluki Haor.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for birdwatching and open water views',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Sylhet city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Haor Food Stall',
      description: 'Local food served near the wetland entrance.',
      priceRange: { min: 60, max: 140 },
    },
  ],
  safetyTips: [
    'Wetlands can be slippery; walk carefully.',
    'Travel with a local boat guide for safety.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Half day',
};

const tanguarHaor: Destination = {
  id: 'tanguar-haor',
  name: 'Tanguar Haor',
  division: 'Sylhet',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.6,
  reviews: 360,
  description: 'A large wetland and eco-tourism area with floating villages and birdlife.',
  fullHistory: 'Tanguar Haor is a nationally protected wetland ecosystem. It is celebrated for its biodiversity, fishery resources, and cultural village life on the water.',
  images: ['Tanguar Haor.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for calm water and active birdlife',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '3-4 hours from Sylhet city',
      fareRange: { min: 320, max: 520 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Haor Village Stall',
      description: 'Local food served in village paddies near the wetland.',
      priceRange: { min: 70, max: 150 },
    },
  ],
  safetyTips: [
    'Wear a life jacket for boat trips across the haor.',
    'Respect local villages and follow community rules.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Half day',
};

const baikkaBeel: Destination = {
  id: 'baikka-beel',
  name: 'Baikka Beel',
  division: 'Sylhet',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.4,
  reviews: 210,
  description: 'A freshwater wetland managed for sustainable fishing and birdwatching.',
  fullHistory: 'Baikka Beel is a protected wetland with floating fish-culture areas and seasonal bird habitats. It offers quiet natural scenery and rural waterway experiences.',
  images: ['Baikka Beel.png'],
  localEntryFee: 10,
  foreignEntryFee: 80,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to February',
    timeOfDay: 'Morning for bird activity and calm water',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Sylhet city',
      fareRange: { min: 260, max: 420 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Wetland Food Hut',
      description: 'Local snacks and tea near the wetland.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Travel with a guide for the wetland waterways.',
    'Bring sun protection and insect repellent.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const kantajewTemple: Destination = {
  id: 'kantajew-temple',
  name: 'Kantajew Temple',
  division: 'Rangpur',
  categories: ['Historical', 'Religious'],
  rating: 4.7,
  reviews: 470,
  description: 'A majestic terracotta Hindu temple in Dinajpur known for its intricate carvings.',
  fullHistory: 'Kantajew Temple was built in the 18th century and is famous for its detailed terracotta art depicting mythological stories. It remains one of northern Bangladesh\'s finest historical monuments.',
  images: ['Kantajew Temple.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 120,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for cooler weather and clear temple details',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Rangpur city',
      fareRange: { min: 150, max: 250 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Temple Snack Shop',
      description: 'Tea and snacks near the temple entrance.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Respect the temple complex and local worshippers.',
    'Do not climb on terracotta panels.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-1.5 hours',
};

const tajhatPalace: Destination = {
  id: 'tajhat-palace',
  name: 'Tajhat Palace',
  division: 'Rangpur',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.5,
  reviews: 330,
  description: 'A historic palace and museum with colonial architecture centered around a large garden.',
  fullHistory: 'Tajhat Palace served as a royal residence and now houses a museum with local artifacts. Its elevated location offers panoramic views of Rangpur city.',
  images: ['Tajhat Palace.jpg'],
  localEntryFee: 30,
  foreignEntryFee: 150,
  openingHours: '10:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning after the palace gardens open',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '10-15 minutes from Rangpur city center',
      fareRange: { min: 30, max: 60 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Palace Cafe',
      description: 'Local snacks and drinks near the palace grounds.',
      priceRange: { min: 70, max: 180 },
    },
  ],
  safetyTips: [
    'Respect museum displays and do not touch artifacts.',
    'Bring sun protection for the palace garden tour.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const nayabadMosque: Destination = {
  id: 'nayabad-mosque',
  name: 'Nayabad Mosque',
  division: 'Rangpur',
  categories: ['Historical', 'Religious'],
  rating: 4.2,
  reviews: 175,
  description: 'A historic mosque in the Rangpur region known for its traditional architectural style.',
  fullHistory: 'Nayabad Mosque is a local historical mosque that reflects the region\'s Islamic heritage and community architecture. Visitors can appreciate its serene courtyard and decorative features.',
  images: ['Nayabad Mosque.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 50,
  openingHours: '5:00 AM - 9:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Evening after prayers for calm light',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from Rangpur town',
      fareRange: { min: 30, max: 60 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Local Tea Stall',
      description: 'Tea and snacks near the mosque grounds.',
      priceRange: { min: 30, max: 80 },
    },
  ],
  safetyTips: [
    'Show respect during prayer times.',
    'Dress modestly around the mosque area.',
  ],
  userReviews: [],
  estimatedVisitDuration: '45 minutes',
};

const begumRokeyaMemorialCentre: Destination = {
  id: 'begum-rokeya-memorial-centre',
  name: 'Begum Rokeya Memorial Centre',
  division: 'Rangpur',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.3,
  reviews: 220,
  description: 'A memorial and museum honoring Begum Rokeya, a pioneer of women\'s education in Bengal.',
  fullHistory: 'Begum Rokeya Memorial Centre celebrates the life and ideas of Begum Rokeya, a social reformer and educationist. The centre hosts exhibits, gardens, and educational displays.',
  images: ['Begum Rokeya Memorial Centre.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '9:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for a quieter visit and reading garden',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from Rangpur city',
      fareRange: { min: 30, max: 60 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Memorial Tea House',
      description: 'Tea and light snacks near the memorial centre.',
      priceRange: { min: 50, max: 130 },
    },
  ],
  safetyTips: [
    'Enjoy the exhibits quietly and respectfully.',
    'Keep an eye on personal items in museum areas.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-1.5 hours',
};

const maharajaDighi: Destination = {
  id: 'maharaja-dighi',
  name: 'Maharaja Dighi',
  division: 'Rangpur',
  categories: ['Historical', 'Natural/Scenic'],
  rating: 4.4,
  reviews: 255,
  description: 'A historic royal pond surrounded by landscaped gardens and heritage structures.',
  fullHistory: 'Maharaja Dighi was created by local rulers and serves as a landmark in Rangpur. The pond is bordered by old monuments and makes for a calm heritage outing.',
  images: ['Maharaja Dighi.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 80,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for quiet waterside walks',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from Rangpur city',
      fareRange: { min: 30, max: 60 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Pond-side Snack Stall',
      description: 'Local refreshments beside the dighi.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Do not swim in the pond; observe from the bank.',
    'Stay on designated walkways around the water.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const thakurgaonZamindarHouse: Destination = {
  id: 'thakurgaon-zamindar-house',
  name: 'Thakurgaon Zamindar House',
  division: 'Rangpur',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.2,
  reviews: 165,
  description: 'A restored zamindar mansion showcasing colonial interiors and gardens.',
  fullHistory: 'The Thakurgaon Zamindar House reflects the lifestyle of the local landed gentry during the colonial period. It is preserved as a heritage site with ornate rooms and grounds.',
  images: ['thakurgaon-zamindar-house.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '10:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Afternoon for the garden and old house visit',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '30-40 minutes from Thakurgaon town',
      fareRange: { min: 120, max: 220 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Heritage Snack House',
      description: 'Local snacks and chai near the heritage house.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Respect the historic structure and avoid touching fragile furniture.',
    'Wear comfortable shoes for walking through the grounds.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-1.5 hours',
};

const chilmariRiverPort: Destination = {
  id: 'chilmari-river-port',
  name: 'Chilmari River Port',
  division: 'Rangpur',
  categories: ['Historical', 'River/Waterfall'],
  rating: 4.3,
  reviews: 180,
  description: 'A historic river port on the Brahmaputra with ferry landings and local trade.',
  fullHistory: 'Chilmari River Port has served as a river trading hub for generations, and it retains a traditional waterfront atmosphere with boats, fishermen, and market activity.',
  images: ['chilmari-river-port.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for riverboat activity',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '3-4 hours from Rangpur city',
      fareRange: { min: 120, max: 220 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Port Food Stall',
      description: 'Fresh fish and local fare near the river port.',
      priceRange: { min: 80, max: 180 },
    },
  ],
  safetyTips: [
    'Stay clear of busy boat launch areas.',
    'Watch your step along the riverbank piers.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const balashiGhat: Destination = {
  id: 'balashi-ghat',
  name: 'Balashi Ghat',
  division: 'Rangpur',
  categories: ['Historical', 'River/Waterfall'],
  rating: 4.2,
  reviews: 150,
  description: 'A historic river ghat with traditional boats and waterfront scenes.',
  fullHistory: 'Balashi Ghat is a traditional river landing known for its vibrant boat traffic and river trade. It is a great place to experience local waterways and historic transport routes.',
  images: ['balashi-ghat.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for busy boat activity',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '20-30 minutes from Rangpur town',
      fareRange: { min: 30, max: 70 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Ghat Tea Stall',
      description: 'Tea and snacks near the river ghat.',
      priceRange: { min: 30, max: 80 },
    },
  ],
  safetyTips: [
    'Keep a safe distance from the water edge on busy ghats.',
    'Wear non-slip shoes along the wet riverbank.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1 hour',
};

const nilsagarHistoricalArea: Destination = {
  id: 'nilsagar-historical-area',
  name: 'Nilsagar Historical Area',
  division: 'Rangpur',
  categories: ['Historical', 'Natural/Scenic'],
  rating: 4.4,
  reviews: 210,
  description: 'A historic lakeside area with palaces, gardens, and story-rich landscapes.',
  fullHistory: 'Nilsagar was once a royal estate with landscaped gardens and historic structures. Today it is a heritage area with a large lake and remaining architectural features.',
  images: ['nilsagar-historical-area.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Late afternoon for cooler lakeside views',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '30-40 minutes from Rangpur city',
      fareRange: { min: 150, max: 250 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Lakeside Stall',
      description: 'Local tea and snacks by the lake.',
      priceRange: { min: 40, max: 120 },
    },
  ],
  safetyTips: [
    'Stay on designated paths around the lake.',
    'Carry bottled water for the warm afternoons.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const rangpurZamindarHouses: Destination = {
  id: 'rangpur-zamindar-houses',
  name: 'Various Local Zamindar Houses',
  division: 'Rangpur',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.3,
  reviews: 190,
  description: 'A collection of historic zamindar residences that reflect northern Bengal\'s aristocratic past.',
  fullHistory: 'The zamindar houses in Rangpur were homes of wealthy landowners and are known for their architectural details and heritage gardens. They tell the story of colonial-era society and local elites.',
  images: ['rangpur-zamindar-houses.jpg'],
  localEntryFee: 15,
  foreignEntryFee: 80,
  openingHours: '9:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for cooler visits and photo-friendly light',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '20-30 minutes from Rangpur city',
      fareRange: { min: 40, max: 80 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Heritage Snack Stop',
      description: 'Local food offered near historic palaces.',
      priceRange: { min: 50, max: 130 },
    },
  ],
  safetyTips: [
    'Respect private property boundaries and heritage rules.',
    'Do not disturb residents or caretakers.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const ramsagarNationalPark: Destination = {
  id: 'ramsagar-national-park',
  name: 'Ramsagar National Park',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.4,
  reviews: 240,
  description: 'A lakeside park with botanical gardens, walking trails, and a historic reservoir.',
  fullHistory: 'Ramsagar National Park surrounds the Ramsagar reservoir and offers landscaped grounds, gardens, and quiet lakeside walks. It is a popular relaxation spot for local visitors.',
  images: ['ramsagar-national-park.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for calm waters and cool breezes',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from Rangpur town',
      fareRange: { min: 30, max: 70 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Parkside Snack Stall',
      description: 'Local snacks and tea near the park entrance.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Keep the park clean and dispose of trash properly.',
    'Bring water for longer walks.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const nilsagarPark: Destination = {
  id: 'nilsagar-park',
  name: 'Nilsagar',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.3,
  reviews: 180,
  description: 'A heritage lake and park renowned for its scenic boat rides and gardens.',
  fullHistory: 'Nilsagar is an historic lake area with landscaped parkland and boat services. It is a favorite place for local families and visitors seeking river scenery.',
  images: ['nilsagar-park.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 70,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Sunset for golden lake reflections',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from Rangpur town',
      fareRange: { min: 30, max: 70 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Lakefront Stall',
      description: 'Tea and light snacks beside Nilsagar lake.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Stay on park paths and avoid venturing too close to the water alone.',
    'Wear comfortable walking shoes.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2 hours',
};

const panchagarhTeaGardens: Destination = {
  id: 'panchagarh-tea-gardens',
  name: 'Panchagarh Tea Gardens',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'Hill/Hill-Tracts'],
  rating: 4.5,
  reviews: 270,
  description: 'Rolling tea estates along the northern hills with cool air and scenic plantations.',
  fullHistory: 'The tea gardens of Panchagarh are among Bangladesh\'s northernmost plantations, offering lush green landscapes and tea production tours.',
  images: ['panchagarh-tea-gardens.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 120,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for misty plantation views',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '3-4 hours from Rangpur city',
      fareRange: { min: 180, max: 320 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Estate Tea Shop',
      description: 'Tea and snacks within the plantation area.',
      priceRange: { min: 80, max: 180 },
    },
  ],
  safetyTips: [
    'Respect the working estate and stick to visitor routes.',
    'Wear suitable footwear for plantation paths.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const teestaBarrage: Destination = {
  id: 'teesta-barrage',
  name: 'Teesta Barrage',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.4,
  reviews: 210,
  description: 'A river barrage on the Teesta that creates wide water views and local fish ponds.',
  fullHistory: 'The Teesta Barrage is an important water-control structure and local scenic point. It provides broad river views and a glimpse into regional irrigation infrastructure.',
  images: ['teesta-barrage.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for cool river breezes and clear air',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Rangpur city',
      fareRange: { min: 120, max: 220 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Barrageside Stall',
      description: 'Local snacks by the river barrage.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Stay clear of restricted areas near the barrage.',
    'Follow any posted safety signs.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const teestaRiverViewpoint: Destination = {
  id: 'teesta-river-viewpoint',
  name: 'Teesta River Viewpoint',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.5,
  reviews: 230,
  description: 'A scenic viewpoint over the Teesta River offering wide vistas and river landscapes.',
  fullHistory: 'This viewpoint allows visitors to take in broad river scenery along the Teesta, with agricultural plains and rural life visible along the banks.',
  images: ['teesta-river-viewpoint.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Sunrise for river mist and soft light',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Rangpur city',
      fareRange: { min: 180, max: 280 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Viewpoint Tea Stall',
      description: 'Tea and snacks with scenic river views.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Stay behind safety rails at viewpoints.',
    'Avoid visiting in heavy rain when the road may be slippery.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const chickliWaterReservoir: Destination = {
  id: 'chikli-water-reservoir',
  name: 'Chikli Water Reservoir',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.3,
  reviews: 145,
  description: 'A reservoir and park area with calm water and surrounding fields.',
  fullHistory: 'Chikli Reservoir is used for irrigation and local recreation. It is surrounded by open fields and offers a calm water landscape.',
  images: ['chikli-water-reservoir.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 50,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for calm reflections on the water',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '20-30 minutes from Rangpur city',
      fareRange: { min: 30, max: 70 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Reservoir Snack Stall',
      description: 'Simple refreshments near the reservoir.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Be mindful of slippery banks near the water.',
    'Bring water and sun protection for long walks.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const ghughudangaWetlands: Destination = {
  id: 'ghughudanga-wetlands',
  name: 'Ghughudanga Wetlands',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.4,
  reviews: 185,
  description: 'Wetlands and riverine islands near Rangpur with boat-based nature experiences.',
  fullHistory: 'Ghughudanga Wetlands are part of the northern river ecosystem, with seasonal water channels and floodplain habitats. Visitors can explore by boat and enjoy rural waterfront life.',
  images: ['ghughudanga-wetlands.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for birdwatching and calm waters',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Rangpur city',
      fareRange: { min: 120, max: 220 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Wetland Boat Stall',
      description: 'Local food available near wetland boats.',
      priceRange: { min: 60, max: 130 },
    },
  ],
  safetyTips: [
    'Boats may be needed to access the wetlands, follow guide instructions.',
    'Wear life jackets when appropriate.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const charRiverIslands: Destination = {
  id: 'char-river-islands',
  name: 'Char River Islands',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.3,
  reviews: 160,
  description: 'Seasonal char islands formed on river channels, offering rural island experiences.',
  fullHistory: 'The char islands are naturally formed sandbars and islands in the rivers around Rangpur. They provide a unique river island culture and changing landscapes each season.',
  images: ['char-river-islands.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for stable river conditions',
  },
  transportOptions: [
    {
      type: 'Boat',
      estimatedTime: '1-2 hours from Rangpur city',
      fareRange: { min: 150, max: 250 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'River Island Snack Hut',
      description: 'Small local food stalls on char islands.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Weather and river flow can change quickly on char islands.',
    'Follow your boat driver\'s guidance.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const dinajpurEcoAreas: Destination = {
  id: 'dinajpur-eco-areas',
  name: 'Dinajpur Eco Areas',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'Urban/Modern'],
  rating: 4.2,
  reviews: 145,
  description: 'Eco-friendly landscapes and rural tourism zones around Dinajpur.',
  fullHistory: 'Dinajpur eco areas highlight conservation efforts and rural beauty in northern Bangladesh, with nature walks and agricultural scenery.',
  images: ['dinajpur-eco-areas.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for crisp landscapes and fields',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Rangpur city',
      fareRange: { min: 120, max: 220 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Eco Area Snack Stall',
      description: 'Tea and snacks near the eco area trails.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Bring a hat and water for open fields.',
    'Keep the landscape clean and do not litter.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const thakurgaonGreenFields: Destination = {
  id: 'thakurgaon-green-fields',
  name: 'Thakurgaon Green Fields',
  division: 'Rangpur',
  categories: ['Natural/Scenic'],
  rating: 4.3,
  reviews: 125,
  description: 'Expansive green agricultural fields and rural scenery around Thakurgaon.',
  fullHistory: 'The green fields near Thakurgaon are representative of Bangladesh\'s rich agricultural landscape, with rice paddies, vegetable plots, and rural roads.',
  images: ['thakurgaon-green-fields.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for the freshest green views',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Rangpur city',
      fareRange: { min: 120, max: 220 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Farm Snack Stall',
      description: 'Local food offered beside the fields.',
      priceRange: { min: 40, max: 90 },
    },
  ],
  safetyTips: [
    'Travel respectfully through farmland.',
    'Avoid disturbing crops and farmers at work.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const nilphamariNatureParks: Destination = {
  id: 'nilphamari-nature-parks',
  name: 'Nilphamari Nature Parks',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'Adventure/Wildlife'],
  rating: 4.4,
  reviews: 195,
  description: 'Nature parks and recreational green spaces in Nilphamari.',
  fullHistory: 'Nilphamari nature parks provide outdoor recreation and environmental education in northern Bangladesh.',
  images: ['nilphamari-nature-parks.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 80,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for park trails and cooler weather',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '3-4 hours from Rangpur city',
      fareRange: { min: 180, max: 320 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Park Snack Stall',
      description: 'Tea and light snacks near the park entrance.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Stay on park trails and do not feed wildlife.',
    'Carry water and insect repellent.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const rangpurRiverfront: Destination = {
  id: 'rangpur-riverfront',
  name: 'Rangpur Riverfront',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'Urban/Modern'],
  rating: 4.3,
  reviews: 170,
  description: 'A developing riverfront promenade with cafes, boat traffic, and green spaces.',
  fullHistory: 'Rangpur Riverfront is a modern river access area in the city that includes walking paths and views of local river life.',
  images: ['rangpur-riverfront.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 8:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Evening for cool river breeze and city lights',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '10-15 minutes from Rangpur city center',
      fareRange: { min: 30, max: 60 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Riverfront Cafe',
      description: 'Coffee and snacks with river views.',
      priceRange: { min: 80, max: 200 },
    },
  ],
  safetyTips: [
    'Stay on the promenade paths and avoid the water edge.',
    'Bring a jacket for cool evening breezes.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const karatoaRiverArea: Destination = {
  id: 'karatoa-river-area',
  name: 'Karatoa River Area',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.2,
  reviews: 135,
  description: 'A riverside zone along the Karatoa with scenic water views and local fishing communities.',
  fullHistory: 'The Karatoa River Area is known for its calm river scenery and agricultural landscapes. It is a quiet place for nature walks and exploring rural river life.',
  images: ['karatoa-river-area.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for clear river views',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Rangpur city',
      fareRange: { min: 120, max: 220 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Riverside Stall',
      description: 'Local snacks and tea near the river.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'The river can be deeper than it looks; stay close to shore.',
    'Wear footwear suitable for muddy paths.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const atraiRiverArea: Destination = {
  id: 'atrai-river-area',
  name: 'Atrai River Area',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.1,
  reviews: 125,
  description: 'A river area dotted with islands and seasonal wetlands along the Atrai.',
  fullHistory: 'The Atrai River Area is a quieter river zone in northern Bangladesh, with shifting channels and rural scenery. It attracts visitors seeking peaceful landscapes and riverside views.',
  images: ['atrai-river-area.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for calm water and birds',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Rangpur city',
      fareRange: { min: 120, max: 220 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'River Village Stall',
      description: 'Local refreshments near the river path.',
      priceRange: { min: 40, max: 90 },
    },
  ],
  safetyTips: [
    'Stay away from fast-moving river currents.',
    'Bring insect repellent for the wetland edges.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const ruralLandscapeTourism: Destination = {
  id: 'rural-landscape-tourism',
  name: 'Rural Landscape Tourism',
  division: 'Rangpur',
  categories: ['Natural/Scenic', 'Urban/Modern'],
  rating: 4.2,
  reviews: 140,
  description: 'Rural village tourism routes featuring paddy fields, village life, and quiet country roads.',
  fullHistory: 'Rural landscape tourism in Rangpur highlights local agriculture, village crafts, and scenic countryside drives. It is great for immersive cultural experiences and rural photo opportunities.',
  images: ['rural-landscape-tourism.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for cool country air',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Rangpur city',
      fareRange: { min: 120, max: 220 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Village Tea Stall',
      description: 'Simple local tea and snacks in village stops.',
      priceRange: { min: 30, max: 80 },
    },
  ],
  safetyTips: [
    'Respect local villagers and farming activities.',
    'Keep to established roads and paths.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const panchagarhHimalayanViewpoint: Destination = {
  id: 'panchagarh-himalayan-viewpoint',
  name: 'Panchagarh Himalayan View Point',
  division: 'Rangpur',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic'],
  rating: 4.6,
  reviews: 280,
  description: 'A high viewpoint offering Himalayan foothill vistas and cool mountain air.',
  fullHistory: 'This viewpoint in northern Bangladesh provides distant views of the lower Himalayan range on clear days, along with forested hill scenery.',
  images: ['panchagarh-himalayan-viewpoint.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for the clearest distant views',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '5-6 hours from Rangpur city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Hilltop Tea Stall',
      description: 'Tea and snacks at the hill viewpoint.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Weather can change quickly; bring layers.',
    'Stay away from cliff edges and steep slopes.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const banglabandhaZeroPoint: Destination = {
  id: 'banglabandha-zero-point',
  name: 'Banglabandha Zero Point View Area',
  division: 'Rangpur',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 210,
  description: 'A border viewpoint near Bangladesh\'s northern tip with mountain views and international roads.',
  fullHistory: 'Banglabandha Zero Point is a border area at the northern edge of Bangladesh, offering views over the surrounding hills and a sense of the region\'s geography.',
  images: ['banglabandha-zero-point.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for clear mountain views',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '5-6 hours from Rangpur city',
      fareRange: { min: 320, max: 480 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Border View Snack Stall',
      description: 'Local refreshments near the viewing area.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Stay within visitor areas and respect any border restrictions.',
    'Bring a hat and water for uphill walking.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const shashiLodge: Destination = {
  id: 'shashi-lodge',
  name: 'Shashi Lodge',
  division: 'Mymensingh',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.4,
  reviews: 210,
  description: 'A historic mansion built as a guesthouse by the zamindar family with elegant colonial details.',
  fullHistory: 'Shashi Lodge is a 19th-century heritage building commissioned by zamindar Surya Kanta Acharjyo. Its frescoes, high ceilings, and old-world charm make it a museum-like heritage stop.',
  images: ['Shashi Lodge.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 120,
  openingHours: '10:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Afternoon for gentle light in the historic rooms',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from Mymensingh city',
      fareRange: { min: 30, max: 70 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Guesthouse Tea Stall',
      description: 'Classic snacks and tea near the lodge.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Respect the historic interior and avoid touching antiques.',
    'Wear comfortable shoes for marble floors and old staircases.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1.5-2 hours',
};

const alexanderCastle: Destination = {
  id: 'alexander-castle',
  name: 'Alexander Castle',
  division: 'Mymensingh',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.3,
  reviews: 180,
  description: 'A historic colonial-era mansion with garden views and heritage architecture.',
  fullHistory: 'Alexander Castle was built during the British colonial era and is known for its spacious grounds and heritage design. It is one of Mymensingh\'s most distinctive historic homes.',
  images: ['alexander-castle.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '10:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for heritage garden views',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '20-25 minutes from Mymensingh city',
      fareRange: { min: 30, max: 70 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Heritage Snack Stall',
      description: 'Local snacks near the castle entrance.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Respect the historic building and do not vandalize.',
    'Carry water, as gardens can be warm in midday.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-1.5 hours',
};

const agriUniversityMuseum: Destination = {
  id: 'agri-university-museum',
  name: 'Bangladesh Agricultural University Museum',
  division: 'Mymensingh',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.2,
  reviews: 140,
  description: 'A museum showcasing agricultural history, tools, and research from Bangladesh Agricultural University.',
  fullHistory: 'The museum displays agricultural heritage and innovations from Bangladesh, with exhibits on crops, farming equipment, and rural development.',
  images: ['agri-university-museum.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 80,
  openingHours: '9:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Late morning for museum exploration',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from Mymensingh city',
      fareRange: { min: 30, max: 60 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Campus Cafe',
      description: 'Light refreshments near the museum.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Keep quiet in exhibit spaces and observe museum rules.',
    'Ask before photographing exhibits if needed.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const susangDurgapurRajbari: Destination = {
  id: 'susang-durgapur-rajbari',
  name: 'Susang Durgapur Rajbari',
  division: 'Mymensingh',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.3,
  reviews: 165,
  description: 'A historic zamindar palace complex with period architecture and rural heritage charm.',
  fullHistory: 'Susang Durgapur Rajbari was built by a prominent zamindar family and features large courtyards, old halls, and decorated rooms. It remains a heritage site in the Mymensingh region.',
  images: ['susang-durgapur-rajbari.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 120,
  openingHours: '10:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Afternoon for cooler courtyard walks',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '30-45 minutes from Mymensingh city',
      fareRange: { min: 200, max: 320 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Rajbari Snack Stall',
      description: 'Local snacks served near the palace grounds.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Do not touch antique furnishings or decorations.',
    'Wear shoes suitable for old flooring.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-1.5 hours',
};

const tonkMovementMemorial: Destination = {
  id: 'tonk-movement-memorial',
  name: 'Tonk Movement Memorial',
  division: 'Mymensingh',
  categories: ['Historical', 'Urban/Modern'],
  rating: 4.1,
  reviews: 130,
  description: 'A memorial site honoring local activists and the Tonk Movement in Mymensingh history.',
  fullHistory: 'The Tonk Movement Memorial commemorates local struggles for social and educational reform in the early 20th century. It is a site for historical reflection and cultural heritage.',
  images: ['tonk-movement-memorial.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 80,
  openingHours: '9:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for a quiet visit',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '20-25 minutes from Mymensingh city',
      fareRange: { min: 30, max: 70 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Memorial Tea Stall',
      description: 'Light snacks near the memorial site.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Respect the memorial and maintain silence.',
    'Carry water for outdoor walks.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1 hour',
};

const hazratShahKamalShrine: Destination = {
  id: 'hazrat-shah-kamal-shrine',
  name: 'Hazrat Shah Kamal Shrine',
  division: 'Mymensingh',
  categories: ['Religious', 'Historical'],
  rating: 4.5,
  reviews: 210,
  description: 'A revered Sufi shrine with peaceful gardens and spiritual ambience.',
  fullHistory: 'Hazrat Shah Kamal Shrine is dedicated to the respected Sufi saint and attracts pilgrims from across the region. The site includes prayer spaces and a serene estate atmosphere.',
  images: ['hazrat-shah-kamal-shrine.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '5:00 AM - 10:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Afternoon for reflective calm and shade',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '30-40 minutes from Mymensingh city',
      fareRange: { min: 40, max: 80 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Shrine Tea Stall',
      description: 'Tea and light snacks near the shrine.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Dress modestly and respect prayer areas.',
    'Remove shoes before entering inner sections.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-1.5 hours',
};

const garoCulturalHeritageSites: Destination = {
  id: 'garo-cultural-heritage-sites',
  name: 'Garo Cultural Heritage Sites',
  division: 'Mymensingh',
  categories: ['Historical', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 230,
  description: 'Cultural sites and villages preserving Garo traditions and rural hill culture.',
  fullHistory: 'The Garo cultural heritage sites in Mymensingh showcase tribal customs, traditional houses, and handicrafts of the Garo people. Visitors can learn about their culture and enjoy rural hill settings.',
  images: ['garo-cultural-heritage-sites.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 100,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for cultural village visits',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Tribal Village Eatery',
      description: 'Local tribal dishes served in village community spaces.',
      priceRange: { min: 80, max: 180 },
    },
  ],
  safetyTips: [
    'Ask permission before photographing local people.',
    'Respect tribal customs and environment.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const birisiri: Destination = {
  id: 'birisiri',
  name: 'Birisiri',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Hill/Hill-Tracts'],
  rating: 4.6,
  reviews: 380,
  description: 'A scenic hill resort area with panoramic views, pine forests, and hiking trails.',
  fullHistory: 'Birisiri is a popular local hill retreat in Mymensingh, offering cool weather, forest walks, and lookout points. It is ideal for a nature getaway close to the city.',
  images: ['birisiri.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for fresh hillside air',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Hilltop Snack Hut',
      description: 'Tea and snacks near the hill viewpoint.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Wear good shoes for hill paths.',
    'Check rain forecasts for wet trails.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const chinaClayHills: Destination = {
  id: 'china-clay-hills',
  name: 'China Clay Hills',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Hill/Hill-Tracts'],
  rating: 4.4,
  reviews: 205,
  description: 'White clay hills with striking landscapes and local mining history.',
  fullHistory: 'The China Clay Hills are formed by exposed clay deposits in the Mymensingh hills. They create a unique terrain of pale slopes and rural vistas.',
  images: ['china-clay-hills.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for cooler clay path walks',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Clay Hill Snack Stall',
      description: 'Local snacks near the clay hills viewpoint.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'The clay surface may be slippery when damp.',
    'Stay on established trails and avoid mining areas.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const someshwariRiver: Destination = {
  id: 'someshwari-river',
  name: 'Someshwari River',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.5,
  reviews: 290,
  description: 'A serene river with boat rides, fishing communities, and riverside forests.',
  fullHistory: 'The Someshwari River is one of Mymensingh\'s peaceful waterways, with local villages and boat traffic that reflect rural river life.',
  images: ['Someshwari River.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for calm water and birdlife',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1-2 hours from Mymensingh city',
      fareRange: { min: 100, max: 180 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Riverside Snack Stall',
      description: 'Tea and local snacks beside the river.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Stay near marked tourist areas and avoid strong currents.',
    'Bring insect repellent for river edges.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const garoHillsFoothills: Destination = {
  id: 'garo-hills-foothills',
  name: 'Garo Hills Foothills',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Hill/Hill-Tracts'],
  rating: 4.5,
  reviews: 240,
  description: 'The gentle foothills leading up to the Garo Hills with forest paths and village scenes.',
  fullHistory: 'The Garo Hills Foothills provide access to tribal villages and forested trails, offering a mild hill trekking experience near Mymensingh.',
  images: ['Garo Hills Foothills.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for cooler forest walks',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Hill Village Stall',
      description: 'Local snacks in the foothill villages.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Stay on the main paths and avoid venturing into dense forest alone.',
    'Prepare for uneven ground and cooler temperatures.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const shalbonForestAreas: Destination = {
  id: 'shalbon-forest-areas',
  name: 'Shalbon Forest Areas',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Adventure/Wildlife'],
  rating: 4.4,
  reviews: 215,
  description: 'A forested region filled with sal trees and wildlife, perfect for nature walks and birding.',
  fullHistory: 'Shalbon Forest is home to native sal trees and supports diverse wildlife species. It offers visitors a chance to experience deeper woodland ecology in Mymensingh.',
  images: ['Shalbon Forest Areas.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '8:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for birdwatching and cool shade',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Forest Snack Hut',
      description: 'Tea and light snacks near the forest entry.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Stay on marked trails and avoid disturbing wildlife.',
    'Carry water and insect repellent.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const netrokonaWetlands: Destination = {
  id: 'netrokona-wetlands',
  name: 'Netrokona Wetlands',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.3,
  reviews: 170,
  description: 'Wetland zones around Netrokona with birdlife and seasonal waterways.',
  fullHistory: 'The Netrokona wetlands are part of the haor ecosystem in northeastern Bangladesh, supporting fishing villages and migratory birds.',
  images: ['Netrokona Wetlands.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for quiet wetland views',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '3-4 hours from Mymensingh city',
      fareRange: { min: 200, max: 320 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Wetland Local Stall',
      description: 'Simple local cuisine near the wetland.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Wear suitable shoes for muddy paths.',
    'Carry mosquito repellent.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const durgapurLake: Destination = {
  id: 'durgapur-lake',
  name: 'Durgapur Lake',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.4,
  reviews: 200,
  description: 'A pleasant lake destination with boat rides and lakeside recreation.',
  fullHistory: 'Durgapur Lake is a local leisure spot in Mymensingh, featuring clean water and scenic surroundings for family outings.',
  images: ['Durgapur Lake.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 80,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Afternoon for lakeside relaxation',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '15-20 minutes from Mymensingh city',
      fareRange: { min: 30, max: 70 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Lakeside Refreshment Stall',
      description: 'Tea and snacks by the lake.',
      priceRange: { min: 40, max: 120 },
    },
  ],
  safetyTips: [
    'The lake is best for scenic visits rather than swimming.',
    'Wear sun protection for open waterfront areas.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const kangshaRiver: Destination = {
  id: 'kangsha-river',
  name: 'Kangsha River',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.5,
  reviews: 255,
  description: 'A scenic river with boat rides, river banks, and peaceful countryside views.',
  fullHistory: 'The Kangsha River flows through the Mymensingh region, offering riverside villages and natural landscapes that are great for relaxed day trips.',
  images: ['Kangsha River.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for calm water and cool temperatures',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1-2 hours from Mymensingh city',
      fareRange: { min: 90, max: 180 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Riverside Stall',
      description: 'Local refreshments beside the river.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Avoid going into the river without a guide.',
    'Carry water and insect repellent.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const oldBrahmaputraRiver: Destination = {
  id: 'old-brahmaputra-river',
  name: 'Old Brahmaputra River',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.4,
  reviews: 235,
  description: 'A historic river channel with broad banks, ferries, and rural riverside communities.',
  fullHistory: 'The Old Brahmaputra River is a historic waterway in Mymensingh, offering scenic riverbank views and a sense of traditional river life.',
  images: ['Old Brahmaputra River.png'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for quiet river atmosphere',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '1-2 hours from Mymensingh city',
      fareRange: { min: 90, max: 180 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Riverbank Tea Stall',
      description: 'Tea and snacks beside the river.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Observe local boat traffic and stay near designated visitor areas.',
    'Bring sun protection for open riverbanks.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const netrokonaEcoZones: Destination = {
  id: 'netrokona-eco-zones',
  name: 'Netrokona Eco Zones',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.4,
  reviews: 210,
  description: 'Protected ecological zones with wetlands, forests, and rural nature trails.',
  fullHistory: 'Netrokona eco zones conserve important wetland and forest habitats in the northern Mymensingh region. They are intended for sustainable ecotourism and nature appreciation.',
  images: ['Netrokona Eco Zones.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 80,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for wildlife and vegetation sightings',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '3-4 hours from Mymensingh city',
      fareRange: { min: 200, max: 320 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Eco Zone Snack Stall',
      description: 'Local refreshments for eco zone visitors.',
      priceRange: { min: 40, max: 120 },
    },
  ],
  safetyTips: [
    'Do not litter in the eco zones.',
    'Follow guide instructions in protected areas.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const sherpurForestAreas: Destination = {
  id: 'sherpur-forest-areas',
  name: 'Sherpur Forest Areas',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Adventure/Wildlife'],
  rating: 4.3,
  reviews: 190,
  description: 'Forest zones near Sherpur with wildlife, trekking routes, and natural shade.',
  fullHistory: 'Sherpur forest areas protect native trees and wildlife habitats. They are ideal for nature walks and observing the region\'s forest ecosystems.',
  images: ['Sherpur Forest Areas.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '8:00 AM - 4:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for bird and wildlife activity',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Forest Stall',
      description: 'Tea and snacks near the forest entrance.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Stay on marked trails and keep a steady pace.',
    'Carry insect repellent and water.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const madhutilaEcoPark: Destination = {
  id: 'madhutila-eco-park',
  name: 'Madhutila Eco Park',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Adventure/Wildlife'],
  rating: 4.5,
  reviews: 260,
  description: 'A managed eco-park with trails, forest cover, and biodiversity education.',
  fullHistory: 'Madhutila Eco Park is an established conservation and recreation site in Mymensingh, featuring tree trails, picnic areas, and nature awareness programs.',
  images: ['Madhutila Eco Park.jpg'],
  localEntryFee: 30,
  foreignEntryFee: 120,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for cooler forest trails',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Eco Park Stall',
      description: 'Snacks and tea within the park area.',
      priceRange: { min: 40, max: 110 },
    },
  ],
  safetyTips: [
    'Follow park rules for protected wildlife areas.',
    'Wear suitable shoes for forest trails.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const gajniLeisurePark: Destination = {
  id: 'gajni-leisure-park',
  name: 'Gajni Leisure Park',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Urban/Modern'],
  rating: 4.1,
  reviews: 160,
  description: 'A recreational park with gardens, walking paths, and family-friendly amenities.',
  fullHistory: 'Gajni Leisure Park is a local urban green space in Mymensingh with gardens and leisure facilities for families.',
  images: ['Gajni Leisure Park.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 50,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Afternoon for relaxed park strolling',
  },
  transportOptions: [
    {
      type: 'Rickshaw',
      estimatedTime: '10-15 minutes from Mymensingh city',
      fareRange: { min: 30, max: 70 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Park Snack Stall',
      description: 'Light refreshments within the park area.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Use park benches and stay on paved paths.',
    'Keep an eye on children in busy park areas.',
  ],
  userReviews: [],
  estimatedVisitDuration: '1-2 hours',
};

const nalitabariNatureTrails: Destination = {
  id: 'nalitabari-nature-trails',
  name: 'Nalitabari Nature Trails',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Hill/Hill-Tracts'],
  rating: 4.3,
  reviews: 145,
  description: 'Nature trails through forests and gentle hills near Nalitabari.',
  fullHistory: 'Nalitabari nature trails offer wooded walks and wildlife spotting near the northern hills of Mymensingh.',
  images: ['Nalitabari Nature Trails.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 50,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for cooler trail conditions',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Trail Snack Hut',
      description: 'Local snacks near the nature trail entrance.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Bring a flashlight if you stay until late afternoon.',
    'Stay on established nature paths.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const susangNaturalLandscape: Destination = {
  id: 'susang-natural-landscape',
  name: 'Susang Natural Landscape',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Hill/Hill-Tracts'],
  rating: 4.2,
  reviews: 130,
  description: 'An area of rolling countryside, small hills, and peaceful rural scenery.',
  fullHistory: 'Susang Natural Landscape is a quiet rural area showcasing Mymensingh\'s pastoral beauty and traditional village life.',
  images: ['Susang Natural Landscape.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for cool country air',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 120, max: 220 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Rural Tea Stall',
      description: 'Tea and snacks in village areas.',
      priceRange: { min: 30, max: 80 },
    },
  ],
  safetyTips: [
    'Respect local farms and avoid trespassing in fields.',
    'Carry water and sun protection.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};

const teaGardenBorderAreas: Destination = {
  id: 'tea-garden-border-areas',
  name: 'Tea Garden Border Areas',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Hill/Hill-Tracts'],
  rating: 4.4,
  reviews: 175,
  description: 'Tea gardens along the border regions with rolling hills and plantation views.',
  fullHistory: 'Border tea garden areas near Mymensingh are known for their scenic plantations and hay-strewn hillside roads, offering an alternative tea estate experience.',
  images: ['Tea Garden Border Areas.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for misty tea hill views',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Plantation Tea Stall',
      description: 'Tea and snacks served on the plantation edge.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Follow plantation visitor rules.',
    'Wear sensible shoes for uneven paths.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const tribalVillageTourism: Destination = {
  id: 'tribal-village-tourism',
  name: 'Tribal Village Tourism',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Adventure/Wildlife'],
  rating: 4.4,
  reviews: 195,
  description: 'Village visits that introduce tribal culture, crafts, and local rural lifestyles.',
  fullHistory: 'Tribal village tourism in Mymensingh allows visitors to learn about traditional tribal customs and daily life in rural settlements.',
  images: ['Tribal Village Tourism.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for cultural village activities',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Village Food Stall',
      description: 'Home-cooked local tribal dishes in village settings.',
      priceRange: { min: 60, max: 150 },
    },
  ],
  safetyTips: [
    'Always seek permission before photographing villagers.',
    'Respect local traditions and offerings.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const riversideCampingZones: Destination = {
  id: 'riverside-camping-zones',
  name: 'Riverside Camping Zones',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Adventure/Wildlife'],
  rating: 4.3,
  reviews: 180,
  description: 'Camping spots beside rivers and lakes offering a night under the stars in nature.',
  fullHistory: 'Riverside camping zones in Mymensingh allow visitors to camp near rivers, lakes, and forest edges, bringing eco-tourism closer to nature.',
  images: ['Riverside Camping Zones.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '24/7',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Evening for campfire and stargazing',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Camp Food Stall',
      description: 'Picnic supplies and simple camping meals.',
      priceRange: { min: 50, max: 130 },
    },
  ],
  safetyTips: [
    'Camp only in approved zones and keep fires contained.',
    'Carry adequate warm clothing for cool nights.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Overnight',
};

const haorEcosystemAreas: Destination = {
  id: 'haor-ecosystem-areas',
  name: 'Haor Ecosystem Areas',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'River/Waterfall'],
  rating: 4.5,
  reviews: 230,
  description: 'Large wetland ecosystems with seasonal water landscapes and birdwatching opportunities.',
  fullHistory: 'Haor ecosystems in Mymensingh are seasonal wetlands that transform into water expanses in monsoon and are home to unique wildlife and rural communities.',
  images: ['Haor Ecosystem Areas.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 80,
  openingHours: '6:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for broad wetland vistas',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '3-4 hours from Mymensingh city',
      fareRange: { min: 200, max: 320 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Haor Village Stall',
      description: 'Local cuisine near the haor margins.',
      priceRange: { min: 40, max: 110 },
    },
  ],
  safetyTips: [
    'Haor water levels can rise quickly; follow local advice.',
    'Wear a life jacket if boating on the haor.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Half day',
};

const ruralEcoTourismSpots: Destination = {
  id: 'rural-eco-tourism-spots',
  name: 'Rural Eco Tourism Spots',
  division: 'Mymensingh',
  categories: ['Natural/Scenic', 'Urban/Modern'],
  rating: 4.4,
  reviews: 210,
  description: 'Rural eco-tourism areas that highlight sustainable village tourism and natural landscapes.',
  fullHistory: 'Rural eco tourism spots in Mymensingh promote cultural exchange and natural site protection, focusing on small communities and environmental awareness.',
  images: ['Rural Eco Tourism Spots.jpg'],
  localEntryFee: 10,
  foreignEntryFee: 80,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for calm rural scenery',
  },
  transportOptions: [
    {
      type: 'Bus',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 120, max: 220 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Village Food Stall',
      description: 'Local food served in rural eco-tourism areas.',
      priceRange: { min: 40, max: 110 },
    },
  ],
  safetyTips: [
    'Respect local communities and the environment.',
    'Use reusable water bottles to reduce waste.',
  ],
  userReviews: [],
  estimatedVisitDuration: '3-4 hours',
};

const garoHills: Destination = {
  id: 'garo-hills',
  name: 'Garo Hills',
  division: 'Mymensingh',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic'],
  rating: 4.6,
  reviews: 320,
  description: 'A hill range offering panoramic views, forests, and tribal village visits.',
  fullHistory: 'The Garo Hills extend into Mymensingh and are home to tribal communities and scenic hill trails, making them a major nature tourism destination.',
  images: ['Garo Hills.jpg'],
  localEntryFee: 20,
  foreignEntryFee: 100,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for clear hill vistas and cool weather',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '3-4 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Hilltop Tea Stall',
      description: 'Tea and snacks with hillside views.',
      priceRange: { min: 50, max: 120 },
    },
  ],
  safetyTips: [
    'Bring warm layers for cooler hill conditions.',
    'Hire a local guide for deeper trails.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Full day',
};

const birisiriHills: Destination = {
  id: 'birisiri-hills',
  name: 'Birisiri Hills',
  division: 'Mymensingh',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 210,
  description: 'The hills around Birisiri offering forest trails and scenic valley views.',
  fullHistory: 'Birisiri Hills are part of the local hill region and are a popular destination for short treks and nature escapes.',
  images: ['Birisiri Hills.jpg'],
  localEntryFee: 15,
  foreignEntryFee: 80,
  openingHours: '8:00 AM - 6:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for fresh hill air',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Hill Snack Stall',
      description: 'Simple food offered near hiking start points.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Hiking paths can be steep; wear sturdy footwear.',
    'Stay with a guide if you are unfamiliar with the trails.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Half day',
};

const durgapurHills: Destination = {
  id: 'durgapur-hills',
  name: 'Durgapur Hills',
  division: 'Mymensingh',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic'],
  rating: 4.4,
  reviews: 180,
  description: 'A quiet hill area with forest scenery and peaceful hilltop viewpoints.',
  fullHistory: 'Durgapur Hills provide a scenic backdrop to the region and are valued for their natural views and hiking opportunities.',
  images: ['Durgapur Hills.jpg'],
  localEntryFee: 15,
  foreignEntryFee: 80,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'October to March',
    timeOfDay: 'Morning for cooler hill paths',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Hillside Snack Stand',
      description: 'Light refreshments for hikers.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Wear sturdy hiking shoes and bring water.',
    'Check weather before heading out to the hills.',
  ],
  userReviews: [],
  estimatedVisitDuration: 'Half day',
};

const borderHillViewpoints: Destination = {
  id: 'border-hill-viewpoints',
  name: 'Border Hill Viewpoints',
  division: 'Mymensingh',
  categories: ['Hill/Hill-Tracts', 'Natural/Scenic'],
  rating: 4.5,
  reviews: 200,
  description: 'Viewpoints near the border hills that showcase distant ridges and forested valleys.',
  fullHistory: 'Border Hill Viewpoints in Mymensingh provide panoramic outlooks over the region\'s hill country, making them attractive for scenic photography and peaceful nature stops.',
  images: ['Border Hill Viewpoints.jpg'],
  localEntryFee: 0,
  foreignEntryFee: 0,
  openingHours: '8:00 AM - 5:00 PM (Daily)',
  bestTimeToVisit: {
    season: 'November to March',
    timeOfDay: 'Morning for the clearest long-range views',
  },
  transportOptions: [
    {
      type: 'Ride-share',
      estimatedTime: '2-3 hours from Mymensingh city',
      fareRange: { min: 300, max: 450 },
    },
  ],
  nearbyHotels: [],
  nearbyFood: [
    {
      name: 'Viewpoint Snack Stall',
      description: 'Tea and snacks with guided hill views.',
      priceRange: { min: 40, max: 100 },
    },
  ],
  safetyTips: [
    'Stay away from steep cliff edges.',
    'Bring warm clothing for cooler hilltop conditions.',
  ],
  userReviews: [],
  estimatedVisitDuration: '2-3 hours',
};
//===========================================
// Sample Tour Guides
const rafikAhmed: TourGuide = {
  id: 'rafik-ahmed',
  name: 'Rafik Ahmed',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  yearsOfExperience: 8,
  languages: ['Bengali', 'English', 'Hindi'],
  rating: 4.8,
  reviews: 145,
  specialization: ['Hill Tracts', 'Trekking', 'Culture Tours'],
  pricePerDay: 3000,
  bio: 'Experienced guide specializing in hill tracts and cultural tours',
  location: 'Chattogram',
};

const fatimaBegum: TourGuide = {
  id: 'fatima-begum',
  name: 'Fatima Begum',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  yearsOfExperience: 12,
  languages: ['Bengali', 'English', 'French'],
  rating: 4.9,
  reviews: 203,
  specialization: ['History', 'Architecture', 'Museum Tours'],
  pricePerDay: 2500,
  bio: 'Historian and expert on Mughal architecture and Bangladesh heritage',
  location: 'Dhaka',
};

export const divisions: Division[] = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
];

export const categories: Category[] = [
  'Historical',
  'Natural/Scenic',
  'Hill/Hill-Tracts',
  'Sea/Beach',
  'River/Waterfall',
  'Religious',
  'Adventure/Wildlife',
  'Urban/Modern',
];

export const destinations: Destination[] = [
  lalbaughFort,
  ahsanManzil,
  starMosque,
  dhakeshwariTemple,
  baitulMukarram,
  bangabandhuMuseum,
  baraKatra,
  chotoKatra,
  sonargaon,
  bhawalRajbari,
  baliatiPalace,
  wariBateshwar,
  joydebpurTempleAreas,
  babaLoknathTemple,
  nuhashPalli,
  madhupurForestBelt,
  fantasyKingdom,
  nationalParliamentHouse,
  coxsBazar,
  sajekValley,
  bayazidBostamiShrine,
  mainamati,
  shalbanVihara,
  zamindarHouses,
  riverPortAreas,
  foysLake,
  kaptaiRiverEdge,
  khoiyachoraWaterfall,
  napittachoraWaterfall,
  kaptaiLake,
  shuvolongWaterfall,
  nilgiri,
  nilachal,
  keokradong,
  tazingDong,
  bogaLake,
  thanchi,
  ruma,
  hangingBridge,
  alutilaCave,
  richangWaterfall,
  inaniBeach,
  laboniBeach,
  himchari,
  saintMartinsIsland,
  sonadiaIsland,
  moheskhaliIsland,
  cheraDwip,
  patengaBeach,
  parkiBeach,
  nijhumDwip,
  mahasthangarh,
  somapuraMahavihara,
  puthiaRajbari,
  natoreRajbari,
  padmaRiverBank,
  localWetlands,
  mangoOrchardTourism,
  sixtyDomeMosque,
  liberationWarMuseumKhulna,
  sundarbans,
  mangroveEcosystemZones,
  dublarChar,
  kuakataSeaBeach,
  manpuraIsland,
  meghnaEstuaryViews,
  riverfrontTourismBarishal,
  floatingMarketAreas,
  shahjalalMazar,
  shahParanMazar,
  teaGardenHeritageZones,
  ratargulSwampForest,
  jaflong,
  lalakhal,
  lawacharaNationalPark,
  hamHamWaterfall,
  madhabpurLake,
  satchariNationalPark,
  hakalukiHaor,
  tanguarHaor,
  baikkaBeel,
  kantajewTemple,
  tajhatPalace,
  nayabadMosque,
  begumRokeyaMemorialCentre,
  maharajaDighi,
  thakurgaonZamindarHouse,
  chilmariRiverPort,
  balashiGhat,
  nilsagarHistoricalArea,
  rangpurZamindarHouses,
  ramsagarNationalPark,
  nilsagarPark,
  panchagarhTeaGardens,
  teestaBarrage,
  teestaRiverViewpoint,
  chickliWaterReservoir,
  ghughudangaWetlands,
  charRiverIslands,
  dinajpurEcoAreas,
  thakurgaonGreenFields,
  nilphamariNatureParks,
  rangpurRiverfront,
  karatoaRiverArea,
  atraiRiverArea,
  ruralLandscapeTourism,
  panchagarhHimalayanViewpoint,
  banglabandhaZeroPoint,
  shashiLodge,
  alexanderCastle,
  agriUniversityMuseum,
  susangDurgapurRajbari,
  tonkMovementMemorial,
  hazratShahKamalShrine,
  garoCulturalHeritageSites,
  birisiri,
  chinaClayHills,
  someshwariRiver,
  garoHillsFoothills,
  shalbonForestAreas,
  netrokonaWetlands,
  durgapurLake,
  kangshaRiver,
  oldBrahmaputraRiver,
  netrokonaEcoZones,
  sherpurForestAreas,
  madhutilaEcoPark,
  gajniLeisurePark,
  nalitabariNatureTrails,
  susangNaturalLandscape,
  teaGardenBorderAreas,
  tribalVillageTourism,
  riversideCampingZones,
  haorEcosystemAreas,
  ruralEcoTourismSpots,
  garoHills,
  birisiriHills,
  durgapurHills,
  borderHillViewpoints,
];

export const hotels: Hotel[] = [
  sayemanBeachResort,
  oceanParadise,
  hotelTheCoxToday,
  seaBreezeResort,
  sajekEcolodge,
];

export const tourGuides: TourGuide[] = [rafikAhmed, fatimaBegum];
