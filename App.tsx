import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  ScrollView,
  Image,
  ImageSourcePropType,
  Dimensions,
  FlatList,
  Modal,
  Alert,
  Switch,
  LogBox
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerUser, loginUser, logoutUser, subscribeToAuthChanges } from './firebase';
import type { UserProfile as FirebaseUserProfile } from './firebase';

LogBox.ignoreAllLogs(); // Suppress the yellow warning banners inside the app
import { divisions, destinations, categories, hotels, tourGuides } from './shared/data';
import type { Division, Category, Destination, TourGuide, Hotel } from './shared/data';
import { 
  t, 
  translateGeneral, 
  translateSpecialty, 
  translateDivision, 
  translateDivisionTagline, 
  translateCategory, 
  translateBudgetType, 
  translateDestination,
  translateDestinationName,
  translateHotel,
  translateTourGuide, 
  translateGuideAgency, 
  translateNearbyAttraction,
  translateActivity
} from './shared/localization';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const translateTime = (time: string, isBn: boolean) => {
  if (!isBn) return time;
  return time
    .replace('AM', 'সকাল')
    .replace('PM', 'বিকাল')
    .replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]);
};
const lalbaghImage: ImageSourcePropType = require('./lalbagh.jpg');
const chattogramImage: ImageSourcePropType = require('./chattogram.jpg');
const rajshahiImage: ImageSourcePropType = require('./Rajshahi.jpg');
const khulnaImage: ImageSourcePropType = require('./khulna.jpg');
const barishalImage: ImageSourcePropType = require('./barishal.jpg');
const sylhetImage: ImageSourcePropType = require('./sylhet.jpg');
const rangpurImage: ImageSourcePropType = require('./rangpur.jpg');
const mymensinghImage: ImageSourcePropType = require('./mymanshing.jpg');
const destinationLocalImages: Record<string, ImageSourcePropType> = {
  'lalbagh.jpg': require('./lalbagh.jpg'),
  'Ahsan Manzil.jpg': require('./Ahsan Manzil.jpg'),
  'tara mosjid.jpg': require('./tara mosjid.jpg'),
  'Dhakeshwari Temple.jpg': require('./Dhakeshwari Temple.jpg'),
  'Baitul Mukarram.jpg': require('./Baitul Mukarram.jpg'),
  'memorial museuam .jpg': require('./memorial museuam .jpg'),
  'BaraKatraDhaka.jpg': require('./BaraKatraDhaka.jpg'),
  'ChotoKatra.jpg': require('./ChotoKatra.jpg'),
  'Sonargaon.jpg': require('./Sonargaon.jpg'),
  'Bhawal-Rajbari.jpg': require('./Bhawal-Rajbari.jpg'),
  'Baliati Palace.jpg': require('./Baliati Palace.jpg'),
  'wari-boteshori.jpg': require('./wari-boteshori.jpg'),
  'joydebpur.jpg': require('./joydebpur.jpg'),
  'baba.jpg': require('./baba.jpg'),
  'palli.jpg': require('./palli.jpg'),
  'madhupur.jpg': require('./madhupur.jpg'),
  'fantasy.jpg': require('./fantasy.jpg'),
  'national.jpg': require('./national.jpg'),
  'kuakata.jpg': require('./kuakata.jpg'),
  'monpura.jpg': require('./monpura.jpg'),
  'meghna.jpg': require('./meghna.jpg'),
  'riverfront.jpg': require('./riverfront.jpg'),
  'market.jpg': require('./market.jpg'),
  'CoxsBazar.jpg': require('./CoxsBazar.jpg'),
  'shajek.jpg': require('./shajek.jpg'),
  'Baizid_Bostami_Mazar.jpg': require('./Baizid_Bostami_Mazar.jpg'),
  'mainamati.jpg': require('./mainamati.jpg'),
  'shalbon-bihar.jpg': require('./shalbon-bihar.jpg'),
  'local-zamindar-houses.jpg': require('./local-zamindar-houses.jpg'),
  'Patenga_Road.jpg': require('./Patenga_Road.jpg'),
  'foys-lake.jpg': require('./foys-lake.jpg'),
  'kaptai-river-ecosystem-edge.jpg': require('./kaptai-river-ecosystem-edge.jpg'),
  'khoiyachora-waterfall.jpg': require('./khoiyachora-waterfall.jpg'),
  'napittachoraWaterfall.jpg': require('./napittachoraWaterfall.jpg'),
  'kaptaiLake.jpg': require('./kaptaiLake.jpg'),
  'shuvolong-waterfall.png': require('./shuvolong-waterfall.png'),
  'nilgiri.jpg': require('./nilgiri.jpg'),
  'Nilachal.jpg': require('./Nilachal.jpg'),
  'keokradong.jpg': require('./keokradong.jpg'),
  'tazing-dong.jpg': require('./tazing-dong.jpg'),
  'Boga Lake.jpg': require('./Boga Lake.jpg'),
  'Thanchi.jpg': require('./Thanchi.jpg'),
  'Ruma.jpg': require('./Ruma.jpg'),
  'Hanging Bridge.jpg': require('./Hanging Bridge.jpg'),
  'Alutila Cave.jpg': require('./Alutila Cave.jpg'),
  'Richang Waterfall.jpg': require('./Richang Waterfall.jpg'),
  'Inani Beach.jpg': require('./Inani Beach.jpg'),
  'Laboni Beach.jpg': require('./Laboni Beach.jpg'),
  'Himchari.jpg': require('./Himchari.jpg'),
  'Saint Martin’s Island.jpg': require('./Saint Martin’s Island.jpg'),
  'Sonadia Island.jpg': require('./Sonadia Island.jpg'),
  'moheskhali.jpg': require('./moheskhali.jpg'),
  'Chera Dwip.jpg': require('./Chera Dwip.jpg'),
  'Patenga Beach.jpg': require('./Patenga Beach.jpg'),
  'Parki Beach.jpg': require('./Parki Beach.jpg'),
  'Nijhum Dwip.jpg': require('./Nijhum Dwip.jpg'),
  'Mahasthangarh.jpg': require('./Mahasthangarh.jpg'),
  'Somapura Mahavihara.jpg': require('./Somapura Mahavihara.jpg'),
  'Puthia Rajbari.jpg': require('./Puthia Rajbari.jpg'),
  'Natore Rajbari.jpg': require('./Natore Rajbari.jpg'),
  'Padma River Bank.jpg': require('./Padma River Bank.jpg'),
  'Local Wetlands.jpg': require('./Local Wetlands.jpg'),
  'Mango Orchard Tourism.jpg': require('./Mango Orchard Tourism.jpg'),
  'Sixty Dome Mosque.jpg': require('./Sixty Dome Mosque.jpg'),
  'Liberation War Museum.jpg': require('./Liberation War Museum.jpg'),
  'Sundarbans.jpg': require('./Sundarbans.jpg'),
  'Mangrove Ecosystem Zones.jpg': require('./Mangrove Ecosystem Zones.jpg'),
  'Dublar Char.jpg': require('./Dublar Char.jpg'),
  'Shahjalal Mazar.jpg': require('./Shahjalal Mazar.jpg'),
  'Shah Paran Mazar.jpg': require('./Shah Paran Mazar.jpg'),
  'Tea Garden Heritage Zones.jpg': require('./Tea Garden Heritage Zones.jpg'),
  'Ratargul Swamp Forest.jpg': require('./Ratargul Swamp Forest.jpg'),
  'Jaflong.jpg': require('./Jaflong.jpg'),
  'Lalakhal.png': require('./Lalakhal.png'),
  'Lawachara National Park.jpg': require('./Lawachara National Park.jpg'),
  'Ham Ham Waterfall.jpg': require('./Ham Ham Waterfall.jpg'),
  'Madhabpur Lake.jpg': require('./Madhabpur Lake.jpg'),
  'Satchari National Park.jpg': require('./Satchari National Park.jpg'),
  'Hakaluki Haor.jpg': require('./Hakaluki Haor.jpg'),
  'Tanguar Haor.jpg': require('./Tanguar Haor.jpg'),
  'Baikka Beel.png': require('./Baikka Beel.png'),
  'Kantajew Temple.jpg': require('./Kantajew Temple.jpg'),
  'Tajhat Palace.jpg': require('./Tajhat Palace.jpg'),
  'Nayabad Mosque.jpg': require('./Nayabad Mosque.jpg'),
  'Begum Rokeya Memorial Centre.jpg': require('./Begum Rokeya Memorial Centre.jpg'),
  'Maharaja Dighi.jpg': require('./Maharaja Dighi.jpg'),
  'thakurgaon-zamindar-house.jpg': require('./thakurgaon-zamindar-house.jpg'),
  'chilmari-river-port.jpg': require('./chilmari-river-port.jpg'),
  'balashi-ghat.jpg': require('./balashi-ghat.jpg'),
  'nilsagar-historical-area.jpg': require('./nilsagar-historical-area.jpg'),
  'rangpur-zamindar-houses.jpg': require('./rangpur-zamindar-houses.jpg'),
  'ramsagar-national-park.jpg': require('./ramsagar-national-park.jpg'),
  'nilsagar-park.jpg': require('./nilsagar-park.jpg'),
  'panchagarh-tea-gardens.jpg': require('./panchagarh-tea-gardens.jpg'),
  'teesta-barrage.jpg': require('./teesta-barrage.jpg'),
  'teesta-river-viewpoint.jpg': require('./teesta-river-viewpoint.jpg'),
  'chikli-water-reservoir.jpg': require('./chikli-water-reservoir.jpg'),
  'ghughudanga-wetlands.jpg': require('./ghughudanga-wetlands.jpg'),
  'char-river-islands.jpg': require('./char-river-islands.jpg'),
  'dinajpur-eco-areas.jpg': require('./dinajpur-eco-areas.jpg'),
  'thakurgaon-green-fields.jpg': require('./thakurgaon-green-fields.jpg'),
  'nilphamari-nature-parks.jpg': require('./nilphamari-nature-parks.jpg'),
  'rangpur-riverfront.jpg': require('./rangpur-riverfront.jpg'),
  'karatoa-river-area.jpg': require('./karatoa-river-area.jpg'),
  'atrai-river-area.jpg': require('./atrai-river-area.jpg'),
  'rural-landscape-tourism.jpg': require('./rural-landscape-tourism.jpg'),
  'panchagarh-himalayan-viewpoint.jpg': require('./panchagarh-himalayan-viewpoint.jpg'),
  'banglabandha-zero-point.jpg': require('./banglabandha-zero-point.jpg'),
  'Shashi Lodge.jpg': require('./Shashi Lodge.jpg'),
  'alexander-castle.jpg': require('./alexander-castle.jpg'),
  'agri-university-museum.jpg': require('./agri-university-museum.jpg'),
  'susang-durgapur-rajbari.jpg': require('./susang-durgapur-rajbari.jpg'),
  'tonk-movement-memorial.jpg': require('./tonk-movement-memorial.jpg'),
  'hazrat-shah-kamal-shrine.jpg': require('./hazrat-shah-kamal-shrine.jpg'),
  'garo-cultural-heritage-sites.jpg': require('./garo-cultural-heritage-sites.jpg'),
  'birisiri.jpg': require('./birisiri.jpg'),
  'china-clay-hills.jpg': require('./china-clay-hills.jpg'),
  'Someshwari River.jpg': require('./Someshwari River.jpg'),
  'Garo Hills Foothills.jpg': require('./Garo Hills Foothills.jpg'),
  'Shalbon Forest Areas.jpg': require('./Shalbon Forest Areas.jpg'),
  'Netrokona Wetlands.jpg': require('./Netrokona Wetlands.jpg'),
  'Durgapur Lake.jpg': require('./Durgapur Lake.jpg'),
  'Kangsha River.jpg': require('./Kangsha River.jpg'),
  'Old Brahmaputra River.png': require('./Old Brahmaputra River.png'),
  'Netrokona Eco Zones.jpg': require('./Netrokona Eco Zones.jpg'),
  'Sherpur Forest Areas.jpg': require('./Sherpur Forest Areas.jpg'),
  'Madhutila Eco Park.jpg': require('./Madhutila Eco Park.jpg'),
  'Gajni Leisure Park.jpg': require('./Gajni Leisure Park.jpg'),
  'Nalitabari Nature Trails.jpg': require('./Nalitabari Nature Trails.jpg'),
  'Susang Natural Landscape.jpg': require('./Susang Natural Landscape.jpg'),
  'Tea Garden Border Areas.jpg': require('./Tea Garden Border Areas.jpg'),
  'Tribal Village Tourism.jpg': require('./Tribal Village Tourism.jpg'),
  'Riverside Camping Zones.jpg': require('./Riverside Camping Zones.jpg'),
  'Haor Ecosystem Areas.jpg': require('./Haor Ecosystem Areas.jpg'),
  'Rural Eco Tourism Spots.jpg': require('./Rural Eco Tourism Spots.jpg'),
  'Garo Hills.jpg': require('./Garo Hills.jpg'),
  'Birisiri Hills.jpg': require('./Birisiri Hills.jpg'),
  'Durgapur Hills.jpg': require('./Durgapur Hills.jpg'),
  'Border Hill Viewpoints.jpg': require('./Border Hill Viewpoints.jpg'),

};

// Cover images for divisions
const divisionImages: Record<Division, ImageSourcePropType> = {
  Dhaka: lalbaghImage,
  Chattogram: chattogramImage,
  Rajshahi: rajshahiImage,
  Khulna: khulnaImage,
  Barishal: barishalImage,
  Sylhet: sylhetImage,
  Rangpur: rangpurImage,
  Mymensingh: mymensinghImage,
};

const divisionTaglines: Record<Division, string> = {
  Dhaka: 'The City of Mosques & The City of Rickshaws',
  Chattogram: 'The Port City & The City of Hills and Sea',
  Rajshahi: 'The Silk City & The Mango Capital',
  Khulna: 'The Industrial City & Gateway to the Sundarbans',
  Barishal: 'The Venice of Bengal & The Granary of Bengal',
  Sylhet: 'The Land of Two Leaves and a Bud',
  Rangpur: ' The Home of Bhawaiya & The Tobacco Hub',
  Mymensingh: 'The Land of Maimansingha Gitika & The Garo Hills Region',
};

// Interface for app booking state
interface AppBooking {
  id: string;
  type: 'hotel' | 'guide' | 'spot' | 'trip' | 'complaint';
  name: string;
  detail: string;
  image: ImageSourcePropType;
  price: string;
  date: string;
  spotDestination?: Destination;
  guideMeta?: {
    guideName: string;
    agencyName: string;
    destination: string;
    startDate: string;
    endDate: string;
    status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  };
  tripPlan?: any;
  createdAt?: string;
  status?: 'Planned' | 'Upcoming' | 'Completed';
  complaintMeta?: {
    userName: string;
    contactNumber: string;
    touristPlace: string;
    message: string;
    images: string[];
    submissionDate: string;
    status: 'Pending' | 'Under Review' | 'Resolved';
  };
}

interface GuideProfile {
  id: string;
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
  bio: string;
}

interface GuideAgency {
  id: string;
  name: string;
  division: string;
  shortDescription: string;
  fullDescription: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  logo: string;
  coveredDestinations: string[];
  guides: GuideProfile[];
}

const createGuide = (
  id: string,
  name: string,
  division: string,
  fee: number,
  rating: number,
  reviewCount: number,
  photo: string,
  specializations: string[],
  bio: string,
  status: 'Available' | 'On Duty' = 'Available',
): GuideProfile => ({
  id,
  name,
  photo,
  age: 28 + (fee % 7),
  division,
  languages: ['Bengali', 'English'],
  yearsOfExperience: 4 + (fee % 6),
  fee,
  status,
  rating,
  reviewCount,
  specialization: specializations,
  expertise: specializations.concat(['Local Support', 'Safe Travel']),
  totalToursCompleted: reviewCount * 2,
  popularDestinations: ['Local Highlights', 'Hidden Gems'],
  certifications: ['Certified Tour Guide', 'First Aid'],
  safetyTraining: ['Emergency First Aid', 'Tour Safety'],
  bio,
});

const guideAgencies: GuideAgency[] = [
  {
    id: 'agency-dhaka-heritage',
    name: 'Dhaka Heritage Guides',
    division: 'Dhaka',
    shortDescription: 'Historic city, wetland, and food-focused tours with expert local storytelling.',
    fullDescription: 'Dhaka Heritage Guides blends old-city history, culinary discovery, and practical city navigation for visitors who want a deeper local connection.',
    rating: 4.8,
    reviewCount: 278,
    startingPrice: 2200,
    logo: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400',
    coveredDestinations: ['Dhaka', 'Sundarbans', 'Ratargul'],
    guides: [createGuide('guide-dhaka-1', 'Sajedul Karim', 'Dhaka', 3000, 4.8, 76, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', ['Historical Tours', 'Religious Tourism'], 'Best for city history, heritage stops, and local food walks.')],
  },
  {
    id: 'agency-dhaka-city',
    name: 'City Nest Travel Guides',
    division: 'Dhaka',
    shortDescription: 'Flexible urban and day-trip assistance for business and leisure travelers.',
    fullDescription: 'City Nest Travel Guides provides smooth transportation support, local insights, and short-stay itinerary planning around Dhaka and nearby districts.',
    rating: 4.7,
    reviewCount: 194,
    startingPrice: 1900,
    logo: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=400',
    coveredDestinations: ['Dhaka', 'Sonargaon', 'Bhawal'],
    guides: [createGuide('guide-dhaka-2', 'Rimsha Chowdhury', 'Dhaka', 2400, 4.7, 58, 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', ['Photography', 'Food Tours'], 'A friendly planner who excels at flexible day tours and quick transfers.')],
  },
  {
    id: 'agency-ctg-coastal',
    name: 'Coastal Breeze Guides',
    division: 'Chattogram',
    shortDescription: 'Coastal and hill guides focused on beaches, trekking, and island travel.',
    fullDescription: 'Coastal Breeze Guides offers dependable support for Chattogram’s beaches, hills, and island routes with strong safety and local knowledge.',
    rating: 4.9,
    reviewCount: 312,
    startingPrice: 2500,
    logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
    coveredDestinations: ["Cox's Bazar", 'Sajek Valley', 'Bandarban'],
    guides: [createGuide('guide-ctg-1', 'Ahsan Rahman', 'Chattogram', 3200, 4.9, 88, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', ['Beach Tours', 'Adventure Tours'], 'Calm, safety-first support for coastal and hill itineraries.')],
  },
  {
    id: 'agency-ctg-hills',
    name: 'Hill Route Tourists',
    division: 'Chattogram',
    shortDescription: 'Nature-led guides for remote trekking paths, eco stays, and village explorations.',
    fullDescription: 'Hill Route Tourists is trusted for scenic treks, eco stays, and local village experiences across the Chattogram hill tracts.',
    rating: 4.8,
    reviewCount: 241,
    startingPrice: 2300,
    logo: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400',
    coveredDestinations: ['Bandarban', 'Ruma', 'Khagrachhari'],
    guides: [createGuide('guide-ctg-2', 'Nadia Islam', 'Chattogram', 2800, 4.8, 71, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', ['Nature Tours', 'Camping'], 'Known for scenic treks and comfortable camping logistics.')],
  },
  {
    id: 'agency-sylhet-nature',
    name: 'Sylhet Green Trails',
    division: 'Sylhet',
    shortDescription: 'Tea gardens, wetland, and waterfall tours with attentive local service.',
    fullDescription: 'Sylhet Green Trails offers immersive nature tours around Sylhet with dependable guides for tea gardens, lakes, and rainforests.',
    rating: 4.8,
    reviewCount: 236,
    startingPrice: 2100,
    logo: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400',
    coveredDestinations: ['Jaflong', 'Lalakhal', 'Lawachara'],
    guides: [createGuide('guide-sylhet-1', 'Mehdi Hasan', 'Sylhet', 2800, 4.8, 66, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', ['Nature Tours', 'Wildlife Tours'], 'Perfect for wetland, tea garden, and rainforest experiences.')],
  },
  {
    id: 'agency-sylhet-culture',
    name: 'Sylhet Heritage Circle',
    division: 'Sylhet',
    shortDescription: 'Culture-first tours through shrines, villages, and regional food scenes.',
    fullDescription: 'Sylhet Heritage Circle combines spiritual stops, local cuisine, and village visits into easy-paced guided journeys.',
    rating: 4.7,
    reviewCount: 189,
    startingPrice: 2000,
    logo: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400',
    coveredDestinations: ['Sylhet', 'Hakaluki Haor', 'Tanguar Haor'],
    guides: [createGuide('guide-sylhet-2', 'Farhan Rahman', 'Sylhet', 2500, 4.7, 61, 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400', ['Cultural Tours', 'Food Tours'], 'Great for village visits, local food, and shrine-based itineraries.')],
  },
  {
    id: 'agency-rajshahi-royal',
    name: 'Rajshahi Royal Guides',
    division: 'Rajshahi',
    shortDescription: 'Historic palaces, educational tours, and riverside trips around the silk city.',
    fullDescription: 'Rajshahi Royal Guides focuses on heritage sites, mango orchards, and the river landscapes that make Rajshahi memorable.',
    rating: 4.7,
    reviewCount: 173,
    startingPrice: 1800,
    logo: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400',
    coveredDestinations: ['Rajshahi', 'Puthia', 'Natore'],
    guides: [createGuide('guide-raj-1', 'Tariq Hossain', 'Rajshahi', 2200, 4.7, 53, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', ['Heritage Tours', 'River Tours'], 'Trusted for palace visits, local history, and calm riverside travel.')],
  },
  {
    id: 'agency-rajshahi-food',
    name: 'Mango Route Guides',
    division: 'Rajshahi',
    shortDescription: 'Food, farming, and cultural day trips with local hosts and practical support.',
    fullDescription: 'Mango Route Guides offers orchard visits, artisan stops, and small-group cultural journeys across Rajshahi and nearby towns.',
    rating: 4.6,
    reviewCount: 149,
    startingPrice: 1700,
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    coveredDestinations: ['Rajshahi', 'Mango Orchards', 'Puthia'],
    guides: [createGuide('guide-raj-2', 'Anika Noor', 'Rajshahi', 2000, 4.6, 47, 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400', ['Food Tours', 'Cultural Tours'], 'Great for orchard visits, local food, and easy day tours.')],
  },
  {
    id: 'agency-khulna-sundarbans',
    name: 'Sundarbans Explorer Guides',
    division: 'Khulna',
    shortDescription: 'Mangrove and river travel specialists for eco adventures and wildlife safaris.',
    fullDescription: 'Sundarbans Explorer Guides specializes in mangrove ecology, boat travel, and wildlife-focused trips across Khulna.',
    rating: 4.9,
    reviewCount: 265,
    startingPrice: 2600,
    logo: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400',
    coveredDestinations: ['Sundarbans', 'Dublar Char', 'Khulna'],
    guides: [createGuide('guide-khulna-1', 'Shamim Akter', 'Khulna', 3100, 4.9, 79, 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400', ['Wildlife Tours', 'Boat Tours'], 'A knowledgeable guide for wildlife routes, boat transfers, and eco stays.')],
  },
  {
    id: 'agency-khulna-river',
    name: 'River Delta Travel Co.',
    division: 'Khulna',
    shortDescription: 'Practical river delta tours with local transport and cultural stops.',
    fullDescription: 'River Delta Travel Co. arranges smooth river travel, village visits, and eco-tour support around Khulna and the delta.',
    rating: 4.6,
    reviewCount: 162,
    startingPrice: 1900,
    logo: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400',
    coveredDestinations: ['Khulna', 'Bagerhat', 'Mongla'],
    guides: [createGuide('guide-khulna-2', 'Mariam Rahman', 'Khulna', 2300, 4.6, 49, 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400', ['River Tours', 'Cultural Tours'], 'Good for river routes, heritage towns, and slow-paced travel.')],
  },
  {
    id: 'agency-barishal-water',
    name: 'Barishal Waterways',
    division: 'Barishal',
    shortDescription: 'Boat-centered trips through the southern delta and floating markets.',
    fullDescription: 'Barishal Waterways focuses on boat journeys, floating markets, and riverside stays across Barishal’s watery landscapes.',
    rating: 4.7,
    reviewCount: 208,
    startingPrice: 2000,
    logo: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400',
    coveredDestinations: ['Barishal', 'Kuakata', 'Monpura'],
    guides: [createGuide('guide-barishal-1', 'Jahidul Islam', 'Barishal', 2500, 4.7, 63, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', ['Boat Tours', 'Beach Tours'], 'Excellent for river travel, island hopping, and coastal comfort.')],
  },
  {
    id: 'agency-barishal-culture',
    name: 'Delta Culture Guides',
    division: 'Barishal',
    shortDescription: 'Local culture, village interaction, and easy-paced river sightseeing.',
    fullDescription: 'Delta Culture Guides brings together village storytelling, local food, and river-view stops for comfortable barishal exploration.',
    rating: 4.6,
    reviewCount: 176,
    startingPrice: 1800,
    logo: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400',
    coveredDestinations: ['Barishal', 'Barguna', 'Patuakhali'],
    guides: [createGuide('guide-barishal-2', 'Nusrat Jahan', 'Barishal', 2200, 4.6, 54, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400', ['Cultural Tours', 'Village Tours'], 'Best for village visits, local traditions, and relaxed travel days.')],
  },
  {
    id: 'agency-rangpur-heritage',
    name: 'Rangpur Heritage Explorers',
    division: 'Rangpur',
    shortDescription: 'Historic houses, riverfront trips, and northern Bengal cultural tours.',
    fullDescription: 'Rangpur Heritage Explorers highlights zamindar houses, river views, and northern Bengal traditions with thoughtful pacing.',
    rating: 4.6,
    reviewCount: 154,
    startingPrice: 1800,
    logo: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400',
    coveredDestinations: ['Rangpur', 'Dinajpur', 'Nilphamari'],
    guides: [createGuide('guide-rangpur-1', 'Moshiur Rahman', 'Rangpur', 2100, 4.6, 51, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', ['Heritage Tours', 'River Tours'], 'Great for northern heritage sites, riverfront views, and easy logistics.')],
  },
  {
    id: 'agency-rangpur-eco',
    name: 'Northern Green Guides',
    division: 'Rangpur',
    shortDescription: 'Eco-friendly trips through wetlands, forests, and rural landscapes.',
    fullDescription: 'Northern Green Guides focuses on scenic wetlands, village routes, and green landscapes across Rangpur and nearby districts.',
    rating: 4.5,
    reviewCount: 131,
    startingPrice: 1700,
    logo: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400',
    coveredDestinations: ['Rangpur', 'Panchagarh', 'Thakurgaon'],
    guides: [createGuide('guide-rangpur-2', 'Laila Akter', 'Rangpur', 1900, 4.5, 43, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400', ['Nature Tours', 'Village Tours'], 'A calm guide for wetlands, villages, and green route planning.')],
  },
  {
    id: 'agency-mymensingh-hills',
    name: 'Mymensingh Valley Guides',
    division: 'Mymensingh',
    shortDescription: 'River and hill-area routes with scenic village stays and cultural discovery.',
    fullDescription: 'Mymensingh Valley Guides offers river routes, hill-area travel, and cultural visits through the northern and eastern regions of Mymensingh.',
    rating: 4.6,
    reviewCount: 147,
    startingPrice: 1750,
    logo: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400',
    coveredDestinations: ['Mymensingh', 'Sherpur', 'Jamalpur'],
    guides: [createGuide('guide-mymensingh-1', 'Nahidul Alam', 'Mymensingh', 2050, 4.6, 45, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', ['Village Tours', 'Nature Tours'], 'Great for riverside travel, hill-area exploration, and local stories.')],
  },
  {
    id: 'agency-mymensingh-tribal',
    name: 'Garo Hills Travel Assist',
    division: 'Mymensingh',
    shortDescription: 'Community-based rural tourism and tribal cultural experiences.',
    fullDescription: 'Garo Hills Travel Assist helps visitors reach tribal villages, hill viewpoints, and rural paths with respectful local guidance.',
    rating: 4.7,
    reviewCount: 163,
    startingPrice: 1950,
    logo: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400',
    coveredDestinations: ['Mymensingh', 'Garo Hills', 'Netrokona'],
    guides: [createGuide('guide-mymensingh-2', 'Shila Marma', 'Mymensingh', 2150, 4.7, 49, 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400', ['Cultural Tours', 'Rural Tours'], 'Specialized in respectful cultural visits and hill-region travel.')],
  },
];

// ===== Nearby Attractions Types & Data =====
interface NearbyAttraction {
  name: string;
  description: string;
  whyVisit: string;
  bestTime: string;
  visitDuration: string;
  localTransport: string;
  travelTime: string;
  travelCostBDT: number;
  localFood: string[];
  priority: number; // 1 = must-see, 2 = highly recommended, 3 = bonus
  lat: number;
  lon: number;
}

const nearbyAttractionsData: Record<string, NearbyAttraction[]> = {
  'coxs-bazar': [
    {
      name: 'Laboni Beach (Main Beach)',
      description: 'The heart of Cox\'s Bazar — the most accessible stretch of the world\'s longest unbroken sea beach with golden sand and rolling waves.',
      whyVisit: 'Most vibrant and accessible beach zone with hotels, beach chairs, local vendors, and the iconic Bangladesh flag flying over the shore.',
      bestTime: '06:00 AM – 09:00 AM / 04:00 PM – 06:30 PM',
      visitDuration: '2 hours',
      localTransport: 'Walking from Cox\'s Bazar town centre',
      travelTime: '5 min walk',
      travelCostBDT: 0,
      localFood: ['Grilled fresh fish at beach stalls', 'Coconut water', 'Jhuri Bhaja (crispy dried fish snack)'],
      priority: 1,
      lat: 21.4272, lon: 91.9702,
    },
    {
      name: 'Kolatoli Beach',
      description: 'A more relaxed beach zone south of Laboni with calmer waters and beautiful sunsets, popular with local families.',
      whyVisit: 'Less crowded than Laboni with a peaceful atmosphere, great for swimming and photography during golden hour.',
      bestTime: '04:30 PM – 07:00 PM',
      visitDuration: '1.5 hours',
      localTransport: 'Rickshaw / Walking',
      travelTime: '~15 min from Laboni',
      travelCostBDT: 30,
      localFood: ['Seafood BBQ stalls', 'Fresh coconut', 'Fried Hilsa (Shorshe Ilish)'],
      priority: 1,
      lat: 21.4178, lon: 91.9714,
    },
    {
      name: 'Sugandha Beach',
      description: 'A clean, quieter beach stretch with good facilities and panoramic ocean views, ideal for sunrise photography.',
      whyVisit: 'One of the cleanest stretches of the beach with minimal crowds in early morning, perfect for sunrise walks.',
      bestTime: '05:30 AM – 08:00 AM',
      visitDuration: '1.5 hours',
      localTransport: 'CNG Auto-rickshaw',
      travelTime: '~10 min',
      travelCostBDT: 50,
      localFood: ['Fresh prawn curry', 'Beach side tea & biscuits'],
      priority: 2,
      lat: 21.4220, lon: 91.9708,
    },
    {
      name: 'Himchari National Park & Waterfall',
      description: 'A lush national park along the sea with a beautiful hillside waterfall, panoramic views of the Bay of Bengal, and lush forest trails.',
      whyVisit: 'Only place in Bangladesh where a forested hill meets the sea coast — stunning waterfall and wildlife make it unmissable.',
      bestTime: '09:00 AM – 12:00 PM',
      visitDuration: '2.5 hours',
      localTransport: 'CNG or Reserved Jeep',
      travelTime: '~30 min south of Cox\'s Bazar',
      travelCostBDT: 120,
      localFood: ['Hillside local tea shops', 'Bamboo Chicken at park entrance'],
      priority: 1,
      lat: 21.3580, lon: 92.0010,
    },
    {
      name: 'Cox\'s Bazar–Teknaf Marine Drive',
      description: 'An 80 km scenic coastal road — one of Asia\'s longest marine drives — connecting Cox\'s Bazar to Teknaf along the Bay of Bengal.',
      whyVisit: 'Breathtaking coastal drive with the sea on one side and green hills on the other, offering some of Bangladesh\'s most scenic road views.',
      bestTime: '08:00 AM – 11:00 AM',
      visitDuration: '3 hours (partial drive)',
      localTransport: 'Reserved CNG / Jeep / Microbus',
      travelTime: 'Starts 5 km from Cox\'s Bazar',
      travelCostBDT: 300,
      localFood: ['Roadside seafood shacks', 'Fresh coconut water'],
      priority: 1,
      lat: 21.3000, lon: 92.0200,
    },
    {
      name: 'Inani Beach',
      description: 'A pristine beach 32 km south of Cox\'s Bazar, famous for its unique black coral rocks scattered along the shore and crystal-clear water.',
      whyVisit: 'Arguably the most scenic beach near Cox\'s Bazar — the coral rock formations during low tide are unlike anywhere else in Bangladesh.',
      bestTime: '07:00 AM – 11:00 AM',
      visitDuration: '2 hours',
      localTransport: 'Reserved CNG or Marine Drive Bus',
      travelTime: '~45 min from Cox\'s Bazar',
      travelCostBDT: 200,
      localFood: ['Fresh seafood at Inani Bazaar', 'Dried fish snacks'],
      priority: 2,
      lat: 21.2613, lon: 92.0313,
    },
    {
      name: 'Burmese Market (Rakhain Market)',
      description: 'A vibrant local market run by the Rakhain community, selling authentic Burmese handicrafts, fabrics, wood carvings, and local snacks.',
      whyVisit: 'Experience the rich Rakhain cultural heritage and pick up unique handmade souvenirs unavailable anywhere else in Bangladesh.',
      bestTime: '10:00 AM – 01:00 PM',
      visitDuration: '1.5 hours',
      localTransport: 'Rickshaw from town centre',
      travelTime: '~10 min',
      travelCostBDT: 30,
      localFood: ['Rakhain rice cakes', 'Burmese sesame sweets', 'Local palm wine (tari)'],
      priority: 2,
      lat: 21.4290, lon: 91.9680,
    },
    {
      name: 'Dolphin Point (Kollatoli Point)',
      description: 'A scenic ocean viewpoint at the south end of Kolatoli Beach from where spinner dolphins can sometimes be spotted in the early morning.',
      whyVisit: 'The best chance to spot wild dolphins off the Bangladesh coast — a truly rare wildlife experience.',
      bestTime: '06:00 AM – 08:00 AM',
      visitDuration: '1 hour',
      localTransport: 'Walking from Kolatoli Beach',
      travelTime: '~10 min walk',
      travelCostBDT: 0,
      localFood: ['Beach-side tea stalls'],
      priority: 3,
      lat: 21.4140, lon: 91.9720,
    },
    {
      name: 'Radiant Fish World (Aquarium)',
      description: 'Bangladesh\'s largest marine aquarium, showcasing hundreds of species of sea creatures including sharks, rays, and coral reef fish.',
      whyVisit: 'A great family attraction — children and adults alike are amazed by the massive tanks and diverse marine life from the Bay of Bengal.',
      bestTime: '10:00 AM – 04:00 PM',
      visitDuration: '1.5 hours',
      localTransport: 'Rickshaw / CNG',
      travelTime: '~15 min from town centre',
      travelCostBDT: 50,
      localFood: ['Restaurant inside the complex'],
      priority: 3,
      lat: 21.4300, lon: 91.9650,
    },
  ],

  'sajek-valley': [
    {
      name: 'Sajek Helipad Viewpoint',
      description: 'The most iconic viewpoint in Sajek — a flat clearing above the clouds where the famous sea-of-clouds photos are taken at dawn.',
      whyVisit: 'The single most photographed spot in Bangladesh — clouds rolling over the valleys at sunrise is a once-in-a-lifetime view.',
      bestTime: '05:30 AM – 08:00 AM',
      visitDuration: '1.5 hours',
      localTransport: 'Walking (5 min from resort area)',
      travelTime: '5 min walk',
      travelCostBDT: 0,
      localFood: ['Hot tea from local Chakma stalls'],
      priority: 1,
      lat: 23.3820, lon: 92.2940,
    },
    {
      name: 'Ruilui Para (Chakma Village)',
      description: 'An authentic indigenous Chakma tribal village in the Sajek valley where traditional weaving, bamboo houses, and a peaceful lifestyle are preserved.',
      whyVisit: 'Immerse yourself in the genuine culture of the Chakma community — see traditional weaving, try bamboo rice, and interact with locals.',
      bestTime: '09:00 AM – 11:30 AM',
      visitDuration: '2 hours',
      localTransport: 'Walking trail from Sajek base',
      travelTime: '~20 min walk',
      travelCostBDT: 0,
      localFood: ['Bamboo-steamed rice (Pita)', 'Chakma-style smoked pork', 'Local herbal tea'],
      priority: 1,
      lat: 23.3750, lon: 92.2880,
    },
    {
      name: 'Konglak Para & Lusai Village',
      description: 'A serene hilltop Lusai (Mizo) tribal community with panoramic views, orange orchards, and traditional bamboo homes.',
      whyVisit: 'One of the few places in Bangladesh where you can see an authentic Lusai tribal lifestyle with stunning valley panoramas.',
      bestTime: '10:00 AM – 01:00 PM',
      visitDuration: '2.5 hours',
      localTransport: 'Jeep / Walking trail',
      travelTime: '~30 min from Sajek centre',
      travelCostBDT: 150,
      localFood: ['Freshly harvested oranges', 'Bamboo shoot curry'],
      priority: 2,
      lat: 23.3650, lon: 92.3010,
    },
    {
      name: 'Cloud Viewpoints & Valley Trail',
      description: 'Multiple informal viewpoints along the main Sajek ridge road offering different angles of the cloud-filled valleys and surrounding mountain ranges.',
      whyVisit: 'Each viewpoint reveals a different perspective of the rolling green hills and cotton-cloud valleys — perfect for photography enthusiasts.',
      bestTime: '06:00 AM – 09:00 AM',
      visitDuration: '1.5 hours',
      localTransport: 'Walking along ridge road',
      travelTime: 'Along the ridge',
      travelCostBDT: 0,
      localFood: ['Local tea stalls at each viewpoint'],
      priority: 2,
      lat: 23.3800, lon: 92.2960,
    },
    {
      name: 'Alutila Cave (nearby, Khagrachhari)',
      description: 'A dramatic 350-metre-long natural cave through which a crystal-clear mountain stream flows — adventurers wade through the cave with lanterns.',
      whyVisit: 'The most thrilling adventure activity accessible on the Sajek route — wading through a dark underground river is an unforgettable experience.',
      bestTime: '09:00 AM – 12:00 PM',
      visitDuration: '2 hours',
      localTransport: 'Reserved Jeep / CNG from Sajek route',
      travelTime: '~45 min from Sajek',
      travelCostBDT: 300,
      localFood: ['Khagrachhari local market food', 'Tribal rice beer (optional)'],
      priority: 3,
      lat: 23.1254, lon: 91.9480,
    },
  ],

  'ratargul-swamp-forest': [
    {
      name: 'Boat Trail – Core Swamp Zone',
      description: 'A magical boat journey through the flooded swamp forest where tall Koroch trees rise from the water and sunlight filters through the canopy.',
      whyVisit: 'The most mesmerizing part of Ratargul — gliding silently through submerged trees in a wooden boat feels like entering another world.',
      bestTime: '07:00 AM – 10:00 AM',
      visitDuration: '2 hours',
      localTransport: 'Traditional wooden boat (from Ratargul ghat)',
      travelTime: '10 min from entrance',
      travelCostBDT: 200,
      localFood: ['Gowainghat river-fish curry at jetty'],
      priority: 1,
      lat: 24.9961, lon: 91.9304,
    },
    {
      name: 'Swamp Watch Tower',
      description: 'A wooden observation tower rising above the forest canopy offering a bird\'s-eye view of the entire swamp forest and surrounding wetlands.',
      whyVisit: 'The only place to see the full extent of the swamp forest from above — stunning for photography and birdwatching.',
      bestTime: '08:00 AM – 11:00 AM',
      visitDuration: '45 min',
      localTransport: 'Boat to base, then short walk',
      travelTime: '~15 min from core zone',
      travelCostBDT: 50,
      localFood: ['Local packed snacks from jetty vendors'],
      priority: 1,
      lat: 24.9970, lon: 91.9320,
    },
    {
      name: 'Gowainghat River Viewpoint',
      description: 'The scenic Gowainghat River runs alongside Ratargul, with emerald-green water, fishing boats, and misty hills visible in the distance.',
      whyVisit: 'A beautiful riverside setting for photography, especially at dawn when mist rises from the water and kingfishers dart along the banks.',
      bestTime: '06:30 AM – 09:00 AM',
      visitDuration: '1 hour',
      localTransport: 'Short walk from Ratargul main ghat',
      travelTime: '10 min walk',
      travelCostBDT: 0,
      localFood: ['River-side tea stalls', 'Fresh fish fry from local vendors'],
      priority: 2,
      lat: 25.0010, lon: 91.9200,
    },
    {
      name: 'Bishwanath Riverside Trail',
      description: 'A peaceful riverside walking trail through local villages and paddy fields leading away from the main tourist area into authentic rural Sylhet.',
      whyVisit: 'Experience the tranquil rural Sylhet landscape that most tourists miss — paddy fields, bamboo groves, and authentic village life.',
      bestTime: '09:00 AM – 11:30 AM',
      visitDuration: '1.5 hours',
      localTransport: 'Walking',
      travelTime: '20 min walk from Ratargul',
      travelCostBDT: 0,
      localFood: ['Village tea stalls with freshly made bread (roti)'],
      priority: 3,
      lat: 24.9880, lon: 91.9100,
    },
  ],

  'kuakata-sea-beach': [
    {
      name: 'Sunrise & Sunset Viewing Point',
      description: 'Kuakata\'s defining feature — the rare beach from which both sunrise and sunset over the Bay of Bengal can be watched from the same spot.',
      whyVisit: 'Only one of two places in the world where you can watch both sunrise and sunset over the sea from a single beach — truly unique.',
      bestTime: '05:30 AM (sunrise) / 05:30 PM (sunset)',
      visitDuration: '1.5 hours each',
      localTransport: 'Walking from Kuakata town',
      travelTime: '5 min walk',
      travelCostBDT: 0,
      localFood: ['Beach-side tea & ruti', 'Fresh coconut water'],
      priority: 1,
      lat: 21.8122, lon: 90.1218,
    },
    {
      name: 'Gangamati Reserved Forest',
      description: 'A scenic mangrove and mixed forest reserve stretching along the eastern end of Kuakata beach, with excellent birdwatching opportunities.',
      whyVisit: 'A peaceful escape from the busy main beach — the forest meets the ocean in a beautiful mangrove landscape perfect for nature walks.',
      bestTime: '08:00 AM – 11:00 AM',
      visitDuration: '2 hours',
      localTransport: 'Motorcycle taxi / Walking',
      travelTime: '~20 min east of Kuakata',
      travelCostBDT: 80,
      localFood: ['Local snacks at forest entry point'],
      priority: 1,
      lat: 21.8060, lon: 90.1450,
    },
    {
      name: 'Fatrar Char (Island)',
      description: 'A small uninhabited offshore island accessible by boat, with pristine mangrove forest, diverse birdlife, and the feeling of total isolation.',
      whyVisit: 'An off-the-beaten-path island boat adventure — the pristine mangroves and bird diversity here rival even the Sundarbans in microcosm.',
      bestTime: '08:00 AM – 12:00 PM',
      visitDuration: '3 hours (including boat)',
      localTransport: 'Local fishing boat from Kuakata ghat',
      travelTime: '~45 min by boat',
      travelCostBDT: 400,
      localFood: ['Fresh fish grilled on the boat by the boatman'],
      priority: 2,
      lat: 21.7600, lon: 90.0900,
    },
    {
      name: 'Misripara Buddhist Temple',
      description: 'An ancient Buddhist temple in the Rakhain para area of Kuakata — one of the oldest temples in Bangladesh\'s coastal region.',
      whyVisit: 'Explore the ancient Rakhain Buddhist heritage that predates modern Kuakata — the intricate woodwork and statues are beautifully preserved.',
      bestTime: '10:00 AM – 12:00 PM',
      visitDuration: '1 hour',
      localTransport: 'Rickshaw / Motorcycle taxi',
      travelTime: '~15 min from main beach',
      travelCostBDT: 50,
      localFood: ['Rakhain rice cakes from nearby stalls'],
      priority: 2,
      lat: 21.8150, lon: 90.1100,
    },
    {
      name: 'Three Rivers Mohona (Confluence)',
      description: 'The dramatic meeting point of the Andharmanik, Kalapona, and Buriswar rivers with the Bay of Bengal, forming a vast open estuary.',
      whyVisit: 'Witnessing three major rivers merge into the sea simultaneously is a rare and powerful natural spectacle, best experienced by boat.',
      bestTime: '09:00 AM – 11:00 AM',
      visitDuration: '2 hours (boat trip)',
      localTransport: 'Local boat from Kuakata ghat',
      travelTime: '~30 min by boat',
      travelCostBDT: 350,
      localFood: ['Catch-of-day fish curry at the ghat restaurants'],
      priority: 3,
      lat: 21.7800, lon: 90.0700,
    },
  ],

  'sundarbans': [
    {
      name: 'Karamjal Wildlife Centre',
      description: 'An eco-tourism spot at the entrance of the Sundarbans with captive Royal Bengal Tigers, spotted deer, crocodiles, and raised walkway through mangroves.',
      whyVisit: 'The most accessible part of the Sundarbans with guaranteed wildlife sightings — ideal as a first stop to acclimate to the mangrove ecosystem.',
      bestTime: '08:00 AM – 11:00 AM',
      visitDuration: '2.5 hours',
      localTransport: 'Motorboat from Mongla Port',
      travelTime: '~1 hour from Mongla',
      travelCostBDT: 500,
      localFood: ['Honey and Sundarbans products at the market', 'Fresh prawn at Mongla fish market'],
      priority: 1,
      lat: 22.3420, lon: 89.5780,
    },
    {
      name: 'Kotka Wildlife Sanctuary',
      description: 'One of the most biodiversity-rich areas of the Sundarbans — spotted deer, wild boar, and occasionally Royal Bengal Tiger are seen on the beaches.',
      whyVisit: 'The open beach near Kotka is where deer graze by the hundreds at dawn — one of the most spectacular wildlife scenes in South Asia.',
      bestTime: '06:00 AM – 09:00 AM',
      visitDuration: '3 hours',
      localTransport: 'Motorboat (overnight tour from Khulna)',
      travelTime: '8-10 hours from Khulna',
      travelCostBDT: 1200,
      localFood: ['Freshwater shrimp cooked on the boat', 'Sundarbans mangrove honey'],
      priority: 1,
      lat: 21.8390, lon: 89.7270,
    },
    {
      name: 'Harbaria Eco-tourism Spot',
      description: 'A well-maintained eco-tourism area with raised wooden walkways through dense mangrove, a watchtower, and frequent spotted deer sightings.',
      whyVisit: 'The best raised walkway experience in the Sundarbans — the elevated path takes you right into the mangrove canopy at eye level.',
      bestTime: '09:00 AM – 12:00 PM',
      visitDuration: '2 hours',
      localTransport: 'Motorboat (day trip from Mongla)',
      travelTime: '~1.5 hours from Mongla',
      travelCostBDT: 600,
      localFood: ['Packed lunch from Mongla', 'Local honey sold at Harbaria'],
      priority: 2,
      lat: 22.1880, lon: 89.6490,
    },
    {
      name: 'Hiron Point (Nilkamal)',
      description: 'A remote sanctuary area at the south edge of the Sundarbans, known as one of the best spots for tiger pugmark trails and river dolphin sightings.',
      whyVisit: 'The hauntingly beautiful isolation of Hiron Point — where the jungle meets the sea and Gangetic dolphins play in the channel — is unforgettable.',
      bestTime: '07:00 AM – 10:00 AM',
      visitDuration: '3 hours',
      localTransport: 'Overnight launch or multi-day tour boat',
      travelTime: '~12 hours from Khulna',
      travelCostBDT: 1500,
      localFood: ['Boat-cooked freshwater fish', 'Sundarbans crab curry'],
      priority: 2,
      lat: 21.7580, lon: 89.4660,
    },
    {
      name: 'Dublar Char (Island)',
      description: 'A seasonal island in the deep Sundarbans that transforms into a massive fishing camp each November-December, with thousands of boats and fishermen.',
      whyVisit: 'One of Bangladesh\'s most extraordinary seasonal spectacles — the temporary fishermen\'s settlement creates a bustling city in the middle of nowhere.',
      bestTime: 'November – January',
      visitDuration: 'Half day',
      localTransport: 'Multi-day boat tour',
      travelTime: '~14 hours from Khulna',
      travelCostBDT: 2000,
      localFood: ['Freshest possible dried fish (shutki)', 'Boat-side fish curry'],
      priority: 3,
      lat: 21.6100, lon: 89.5200,
    },
  ],

  'jaflong': [
    {
      name: 'Piyain River Stone Collection',
      description: 'The iconic activity of Jaflong — watching Khasi tribal workers collect smooth river stones from the crystal-clear Piyain River at the Indian border.',
      whyVisit: 'The combination of workers collecting stones, emerald water, and the Indian hills directly in front creates one of Bangladesh\'s most unique scenes.',
      bestTime: '08:00 AM – 11:00 AM',
      visitDuration: '2 hours',
      localTransport: 'Walking from Jaflong main point',
      travelTime: '5 min walk',
      travelCostBDT: 0,
      localFood: ['Local Khasi tribal snacks', 'Pineapple and jackfruit from riverside stalls'],
      priority: 1,
      lat: 25.1610, lon: 92.0197,
    },
    {
      name: 'Dauki River & Indian Border Viewpoint',
      description: 'The border crossing area at Dauki where the Piyain River flows into India — boats cruise on the crystal-clear water with Indian hills directly visible.',
      whyVisit: 'Standing at the international border in the middle of an emerald river surrounded by green hills is an extraordinary geographical experience.',
      bestTime: '09:00 AM – 12:00 PM',
      visitDuration: '2 hours',
      localTransport: 'Reserved boat / local boat (shared)',
      travelTime: 'On the Piyain River',
      travelCostBDT: 300,
      localFood: ['Border-area fresh pineapple', 'Stone-grilled fish at waterside stalls'],
      priority: 1,
      lat: 25.1650, lon: 92.0320,
    },
    {
      name: 'Khasi Palli (Tribal Village)',
      description: 'An authentic Khasi tribal village near Jaflong where the matriarchal Khasi community lives in bamboo homes and cultivates betel-leaf plantations.',
      whyVisit: 'A rare chance to respectfully observe one of Bangladesh\'s most unique tribal cultures where women are the head of the household.',
      bestTime: '10:00 AM – 12:30 PM',
      visitDuration: '1.5 hours',
      localTransport: 'Walking trail from Jaflong',
      travelTime: '~20 min walk',
      travelCostBDT: 0,
      localFood: ['Betel leaf (paan)', 'Tribal rice wine (optional, respect customs)'],
      priority: 2,
      lat: 25.1500, lon: 92.0150,
    },
    {
      name: 'Volagonj White Stone Quarry',
      description: 'A vast open quarry where pristine white limestone boulders extracted from the hills create a surreal landscape unlike anything else in Bangladesh.',
      whyVisit: 'The alien-like landscape of white boulders against green hills is one of the most photographically striking scenes in all of Sylhet.',
      bestTime: '09:00 AM – 11:30 AM',
      visitDuration: '1.5 hours',
      localTransport: 'CNG / Motorcycle taxi',
      travelTime: '~30 min from Jaflong',
      travelCostBDT: 150,
      localFood: ['Quarry-side tea and snacks'],
      priority: 3,
      lat: 25.1200, lon: 91.9900,
    },
  ],

  'tanguar-haor': [
    {
      name: 'Houseboat Sunrise Cruise',
      description: 'An overnight traditional wooden houseboat experience on the Tanguar Haor wetland, waking to sunrise over the open water with migrating birds.',
      whyVisit: 'The dawn light reflecting on the still water of Tanguar Haor from a houseboat is one of Bangladesh\'s most serene and beautiful experiences.',
      bestTime: '05:30 AM – 08:00 AM',
      visitDuration: 'Overnight',
      localTransport: 'Reserved wooden houseboat from Sunamganj',
      travelTime: '3-4 hours from Sunamganj',
      travelCostBDT: 1500,
      localFood: ['Freshly caught haor fish (koi, catfish, hilsa)', 'Traditional boat-cooked meals'],
      priority: 1,
      lat: 25.1500, lon: 91.0667,
    },
    {
      name: 'Watchtower & Birdwatching Hides',
      description: 'Elevated watchtowers built specifically for birdwatching — Tanguar Haor hosts over 200 species of migratory birds October to March.',
      whyVisit: 'During peak season the sky literally fills with thousands of migratory waterfowl — one of South Asia\'s premier birdwatching sites.',
      bestTime: '06:00 AM – 09:00 AM (October – March best)',
      visitDuration: '2 hours',
      localTransport: 'Small boat from houseboat anchoring point',
      travelTime: '30 min by small boat',
      travelCostBDT: 200,
      localFood: ['Tea and snacks at the watchtower keeper\'s cabin'],
      priority: 1,
      lat: 25.1600, lon: 91.0800,
    },
    {
      name: 'Village Homestay & Cultural Interaction',
      description: 'Spend a night or afternoon with a local Haor fishing family, sharing their daily boat-based lifestyle, meals, and fishing techniques.',
      whyVisit: 'The most authentic way to understand the unique amphibious culture of the Haor region where life revolves entirely around the water.',
      bestTime: '03:00 PM – 09:00 PM',
      visitDuration: '5 hours',
      localTransport: 'Local boat to village',
      travelTime: '~1 hour from Tanguar ghat',
      travelCostBDT: 300,
      localFood: ['Home-cooked Haor fish curry', 'Freshly made pitha (rice cakes)', 'Wild mustard vegetables'],
      priority: 2,
      lat: 25.1400, lon: 91.0500,
    },
  ],

  'saint-martins-island': [
    {
      name: 'North Beach & Coral Zone',
      description: 'The northern tip of Saint Martin\'s Island with the densest concentration of living coral reefs, perfect for snorkelling and clear-water swimming.',
      whyVisit: 'Bangladesh\'s only coral reef — the rich underwater world at North Beach is unlike anything visible elsewhere in the country.',
      bestTime: '08:00 AM – 11:00 AM',
      visitDuration: '2.5 hours',
      localTransport: 'Walking / Bicycle hire on the island',
      travelTime: '30 min walk from jetty',
      travelCostBDT: 50,
      localFood: ['Coconut crab curry at beachside shacks', 'Grilled squid & lobster'],
      priority: 1,
      lat: 20.6350, lon: 92.3240,
    },
    {
      name: 'Chera Dwip (Separate Island)',
      description: 'A tiny uninhabited island separated from Saint Martin\'s at high tide — only accessible by boat when the tide rises, creating a magical isolated getaway.',
      whyVisit: 'Stranded in paradise — the clear water surrounding Chera Dwip at high tide creates the impression of a floating island with no other humans in sight.',
      bestTime: '09:00 AM – 12:00 PM',
      visitDuration: '2 hours',
      localTransport: 'Small local boat from Saint Martin jetty',
      travelTime: '~15 min by boat',
      travelCostBDT: 200,
      localFood: ['Pack lunch from Saint Martin main market', 'Coconut straight from palm'],
      priority: 1,
      lat: 20.6200, lon: 92.3200,
    },
    {
      name: 'Island Night Fishing Experience',
      description: 'Join local fishermen on an evening boat fishing trip using traditional methods, returning before midnight with the fresh catch for a late-night feast.',
      whyVisit: 'An authentic island fishing experience under a star-filled sky — a genuine connection with the island\'s traditional way of life.',
      bestTime: '07:00 PM – 10:00 PM',
      visitDuration: '3 hours',
      localTransport: 'Local fishing boat from jetty',
      travelTime: 'From main jetty',
      travelCostBDT: 500,
      localFood: ['Fresh catch grilled immediately after return', 'Island-style coconut fish curry'],
      priority: 2,
      lat: 20.6277, lon: 92.3234,
    },
    {
      name: 'Coconut Grove Walk & Island Circuit',
      description: 'A walking circuit around the entire perimeter of Saint Martin\'s Island (about 8 km), passing through coconut groves, coral beaches, and fishing villages.',
      whyVisit: 'The full island circuit reveals the different personalities of the island — from busy east beaches to deserted western shores and quiet village life.',
      bestTime: '07:00 AM – 10:00 AM',
      visitDuration: '3 hours',
      localTransport: 'Walking (hire a bicycle for ৳100)',
      travelTime: 'Self-guided circuit',
      travelCostBDT: 0,
      localFood: ['Fresh coconut water from roadside sellers', 'Morning ruti at village tea stalls'],
      priority: 3,
      lat: 20.6300, lon: 92.3180,
    },
  ],

  'nilgiri': [
    {
      name: 'Nilgiri Summit & Cloud Deck',
      description: 'The highest point accessible by road in the Bandarban area — a military-controlled hilltop at 2,200 ft that sits above the clouds on clear mornings.',
      whyVisit: 'Bangladesh\'s highest road-accessible viewpoint — the sea of clouds stretching in every direction at dawn is one of the country\'s most spectacular sights.',
      bestTime: '05:30 AM – 08:30 AM',
      visitDuration: '2 hours',
      localTransport: 'Reserved Jeep from Bandarban (military clearance needed)',
      travelTime: '~2 hours from Bandarban town',
      travelCostBDT: 600,
      localFood: ['Nilgiri resort café breakfast with valley view', 'Bamboo Chicken cooked in hillside shacks'],
      priority: 1,
      lat: 21.9169, lon: 92.3175,
    },
    {
      name: 'Chimbuk Hill (Tong Ha village)',
      description: 'The third highest peak in Bangladesh, accessible on the Nilgiri road, with a famous viewpoint and the Marma tribal Tong Ha village.',
      whyVisit: 'A stop at Chimbuk breaks the Nilgiri journey perfectly and reveals a different perspective of the Bandarban valleys, plus authentic Marma culture.',
      bestTime: '08:00 AM – 11:00 AM',
      visitDuration: '1.5 hours',
      localTransport: 'Jeep (en route to Nilgiri)',
      travelTime: '~1.5 hours from Bandarban',
      travelCostBDT: 0,
      localFood: ['Marma tribal food at Tong Ha village', 'Pineapple and papaya from roadside'],
      priority: 1,
      lat: 22.0000, lon: 92.2960,
    },
    {
      name: 'Boga Lake Trek',
      description: 'A crater lake at 1,246 ft altitude surrounded by dense jungle — one of the most remote and beautiful natural lakes in Bangladesh.',
      whyVisit: 'The mysterious blue-green lake with its origin unknown (possibly volcanic crater) surrounded by forest is one of Bangladesh\'s greatest natural wonders.',
      bestTime: '08:00 AM – 02:00 PM (full day trek)',
      visitDuration: '5-6 hours (trek)',
      localTransport: 'Jeep to trailhead + 3 hour hike each way',
      travelTime: '~3 hours from Bandarban (trek start)',
      travelCostBDT: 800,
      localFood: ['Trail-side camp food', 'Boga Lake local BGB camp tea'],
      priority: 2,
      lat: 22.0290, lon: 92.4560,
    },
    {
      name: 'Remakri Waterfall',
      description: 'A powerful multi-tiered waterfall accessible by a boat trip up the Sangu River from Thanchi, surrounded by dense jungle.',
      whyVisit: 'The combination of a river boat adventure and dramatic jungle waterfall makes Remakri one of Bangladesh\'s most rewarding off-the-beaten-path experiences.',
      bestTime: '09:00 AM – 01:00 PM',
      visitDuration: '4 hours (including boat)',
      localTransport: 'Boat on Sangu River from Thanchi',
      travelTime: '~3 hours boat from Thanchi',
      travelCostBDT: 1000,
      localFood: ['Jungle campfire-cooked fish', 'Local Bawm tribal rice beer (optional)'],
      priority: 3,
      lat: 21.8700, lon: 92.5500,
    },
  ],

  'nilachal': [
    {
      name: 'Nilachal Summit Viewpoint',
      description: 'An elevated hilltop park above Bandarban town with panoramic views of the Sangu River valley, the town, and surrounding hills — especially beautiful at dusk.',
      whyVisit: 'The best and most accessible viewpoint for first-time visitors to Bandarban — the sunset from Nilachal over the winding Sangu River is magnificent.',
      bestTime: '05:00 PM – 07:00 PM',
      visitDuration: '1.5 hours',
      localTransport: 'CNG / Jeep from Bandarban town',
      travelTime: '~15 min from Bandarban',
      travelCostBDT: 80,
      localFood: ['Hilltop tea and snack stalls', 'Local Marma-style bamboo rice'],
      priority: 1,
      lat: 22.1764, lon: 92.2031,
    },
    {
      name: 'Sangu River Boat Ride',
      description: 'A leisurely boat trip on the Sangu River through Bandarban — passing under hills and bridges with excellent views of the surrounding tribal landscape.',
      whyVisit: 'The Sangu River is one of the most scenic in Bangladesh — the clear mountain water and forested hills create a calming, beautiful atmosphere.',
      bestTime: '09:00 AM – 11:30 AM',
      visitDuration: '2 hours',
      localTransport: 'Local boat from Bandarban boat ghat',
      travelTime: 'From town centre',
      travelCostBDT: 250,
      localFood: ['Riverside grilled corn', 'Fresh pineapple from floating vendors'],
      priority: 1,
      lat: 22.1940, lon: 92.2170,
    },
    {
      name: 'Meghla Eco Park',
      description: 'A scenic eco-tourism park with a suspension bridge, boat lake, cable car, and lush hillside gardens — a great family-friendly attraction near Bandarban.',
      whyVisit: 'A fun half-day out combining adventure (suspension bridge, cable car) with natural scenery — one of the more accessible attractions near Bandarban.',
      bestTime: '10:00 AM – 01:00 PM',
      visitDuration: '2 hours',
      localTransport: 'CNG from Bandarban town',
      travelTime: '~10 min',
      travelCostBDT: 60,
      localFood: ['Park-side restaurant with tribal dishes', 'Bamboo shoot pickle'],
      priority: 2,
      lat: 22.1870, lon: 92.2200,
    },
  ],
};

// ===== Trip Feasibility Validation =====
// Throws a descriptive Error when the requested destinations are physically
// impossible to visit within the chosen number of days.
function validateMobileTripFeasibility(dests: Destination[], durationDays: number, isBn: boolean): void {
  if (dests.length <= 1) return;

  const divisions = Array.from(new Set(dests.map(d => d.division)));

  const hasRemoteIsland = dests.some(d =>
    d.name.toLowerCase().includes("saint martin") ||
    d.name.toLowerCase().includes("chera dwip")
  );

  // 1. Multi-division check
  if (divisions.length > 1) {
    let minDays = 3;
    if (divisions.length === 3) minDays = 5;
    if (divisions.length >= 4) minDays = 7;
    if (hasRemoteIsland) minDays += 1;

    if (durationDays < minDays) {
      const examples = isBn
        ? dests.slice(0, 2).map(d => `${translateDestination(d, true).name} (${translateDivision(d.division, true)})`).join(' এবং ')
        : dests.slice(0, 2).map(d => `${d.name} (${d.division})`).join(' and ');
      
      const divNames = isBn
        ? divisions.map(div => translateDivision(div, true)).join(' ও ')
        : divisions.join(' and ');

      let msg = isBn
        ? `${examples} — এই দুটি জায়গা ভিন্ন বিভাগে (${divNames}), তাই মাত্র ${durationDays} দিনে ভ্রমণ করা সম্ভব নয়।\n\n`
        : `${examples} — these two places are in different divisions (${divNames}), so it is not possible to travel in just ${durationDays} day(s).\n\n`;

      if (hasRemoteIsland) {
        msg += isBn
          ? `সেন্ট মার্টিনে যেতে টেকনাফ থেকে ফেরিতে অতিরিক্ত সময় লাগে।\n\n`
          : `Taking a ferry from Teknaf to Saint Martin requires extra travel time.\n\n`;
      } else {
        msg += isBn
          ? `এই বিভাগগুলোর মধ্যে যাতায়াতে সাধারণত ৬–১০ ঘণ্টা সময় লাগে।\n\n`
          : `Transit between these divisions typically takes 6–10 hours.\n\n`;
      }

      msg += isBn
        ? ` সুপারিশ: ট্রিপ কমপক্ষে ${minDays} দিনে পরিকল্পনা করুন, অথবা একই বিভাগের মধ্যে গন্তব্য বেছে নিন।`
        : ` Recommendation: Plan a trip of at least ${minDays} days, or choose destinations within the same division.`;
      throw new Error(msg);
    }
  }

  // 2. Deep hill tracts + beach combo (within Chattogram division)
  const hasMountain = dests.some(d =>
    d.name.toLowerCase().includes("sajek") ||
    d.name.toLowerCase().includes("bandarban") ||
    d.name.toLowerCase().includes("nilgiri") ||
    d.name.toLowerCase().includes("nilachal") ||
    d.name.toLowerCase().includes("boga lake") ||
    d.name.toLowerCase().includes("keokradong")
  );
  const hasBeach = dests.some(d =>
    d.name.toLowerCase().includes("saint martin") ||
    d.name.toLowerCase().includes("chera dwip") ||
    d.name.toLowerCase().includes("cox") ||
    d.name.toLowerCase().includes("inani")
  );

  if (hasMountain && hasBeach && durationDays < 4) {
    const hillPlace = dests.find(d =>
      d.name.toLowerCase().includes("sajek") || d.name.toLowerCase().includes("bandarban")
    );
    const hillName = hillPlace
      ? (isBn ? translateDestination(hillPlace, true).name : hillPlace.name)
      : (isBn ? "পাহাড়ি গন্তব্য" : "Mountain destination");

    const beachPlace = dests.find(d =>
      d.name.toLowerCase().includes("saint martin") || d.name.toLowerCase().includes("cox")
    );
    const beachName = beachPlace
      ? (isBn ? translateDestination(beachPlace, true).name : beachPlace.name)
      : (isBn ? "সমুদ্র সৈকত" : "Beach destination");

    const errorMsg = isBn
      ? `${hillName} (পাহাড়) এবং ${beachName} (সমুদ্র সৈকত) একসাথে মাত্র ${durationDays} দিনে ভ্রমণ করা সম্ভব নয়।\n\nপাহাড় থেকে সৈকতে যেতে পাহাড়ি রাস্তায় ১০–১২ ঘণ্টা সময় লাগে।\n\n সুপারিশ: ট্রিপ কমপক্ষে ৪ দিনে পরিকল্পনা করুন, অথবা শুধু পাহাড় অথবা শুধু সমুদ্র সৈকত বেছে নিন।`
      : `${hillName} (Mountains) and ${beachName} (Beach) cannot be visited together in just ${durationDays} day(s).\n\nTraveling from the mountains to the beach takes 10–12 hours on winding hilly roads.\n\n Recommendation: Plan a trip of at least 4 days, or select only mountains or only beach destinations.`;

    throw new Error(errorMsg);
  }
}

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'explore' | 'planner' | 'guides' | 'bookings' | 'profile'>('explore');

  // Explore Tab State
  const [exploreStep, setExploreStep] = useState<'divisions' | 'spots' | 'detail'>('divisions');
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [detailImageIndex, setDetailImageIndex] = useState(0);
  const [expandedDesc, setExpandedDesc] = useState(false);

  // Planner Tab State - Enhanced Trip Builder
  const [tripBuilderStep, setTripBuilderStep] = useState<'form' | 'result'>('form');
  const [tripBuilderData, setTripBuilderData] = useState({
    travelers: 1,
    durationDays: 3,
    durationNights: 2,
    budgetType: 'Medium Budget' as 'Low Budget' | 'Medium Budget' | 'Premium Budget',
    fromLocation: '',
    exploreDivision: true,
    selectedDivision: null as Division | null,
    selectedCategories: [] as Category[],
    customPlaces: [] as Destination[],
    customPlaceInput: '',
  });
  const [generatedTripPlan, setGeneratedTripPlan] = useState<any | null>(null);
  const [placeSearchQuery, setPlaceSearchQuery] = useState('');

  // Old planner state (kept for backwards compatibility if needed)
  const [plannerDivision, setPlannerDivision] = useState<Division | null>(null);
  const [plannerDuration, setPlannerDuration] = useState('3');
  const [plannerBudget, setPlannerBudget] = useState<'budget' | 'mid' | 'luxury'>('mid');
  const [generatedItinerary, setGeneratedItinerary] = useState<any | null>(null);

  // Chat State
  const [selectedChatGuide, setSelectedChatGuide] = useState<TourGuide | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Record<string, Array<{ sender: 'user' | 'guide'; text: string; time: string }>>>({});

  // Dynamic Booking list
  const [selectedSavedTrip, setSelectedSavedTrip] = useState<AppBooking | null>(null);
  const [bookings, setBookings] = useState<AppBooking[]>([
    {
      id: 'mock-1',
      type: 'spot',
      name: "Cox's Bazar Beach",
      detail: 'Visit saved',
      image: { uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800' },
      price: 'Free',
      date: 'Saved on June 22, 2026',
    }
  ]);

  // Dark Mode, Booking Filters, and Feedback States
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to true because the original app has a dark slate theme
  const [isBangla, setIsBangla] = useState(false);
  const [profileViewMode, setProfileViewMode] = useState<'menu' | 'feedback'>('menu');
  const [bookingFilter, setBookingFilter] = useState<'All' | 'Saved' | 'Confirmed' | 'Cancelled' | 'Complaints'>('All');
  
  // Feedback form fields
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackPhone, setFeedbackPhone] = useState('');
  const [feedbackPlace, setFeedbackPlace] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackImages, setFeedbackImages] = useState<string[]>([]);

  // Load persisted theme and language
  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (!AsyncStorage) {
          setIsDarkMode(true);
          setIsBangla(false);
          return;
        }
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme === 'dark') {
          setIsDarkMode(true);
        } else if (savedTheme === 'light') {
          setIsDarkMode(false);
        } else {
          // If no theme is saved, default to dark theme since the original app uses dark colors (#0E1116)
          setIsDarkMode(true);
        }

        const savedLang = await AsyncStorage.getItem('app_language');
        if (savedLang === 'bn') {
          setIsBangla(true);
        } else {
          setIsBangla(false);
        }
      } catch (err) {
        // Log silently to console instead of console.error to avoid React Native LogBox toasts
        console.log('Failed to load settings silently:', err);
        setIsDarkMode(true);
        setIsBangla(false);
      }
    };
    loadSettings();
  }, []);

  // Persistent auth session listener
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((profile) => {
      if (profile) {
        setUserProfile(profile);
        setIsLoggedIn(true);
      } else {
        setUserProfile(null);
        setIsLoggedIn(false);
      }
    }, isBangla);
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = async (value: boolean) => {
    try {
      setIsDarkMode(value);
      if (AsyncStorage) {
        await AsyncStorage.setItem('theme', value ? 'dark' : 'light');
      }
    } catch (err) {
      console.log('Failed to save theme silently:', err);
    }
  };

  const toggleLanguage = async (value: boolean) => {
    try {
      setIsBangla(value);
      if (AsyncStorage) {
        await AsyncStorage.setItem('app_language', value ? 'bn' : 'en');
      }
    } catch (err) {
      console.log('Failed to save language preference silently:', err);
    }
  };

  const styles = getStyles(isDarkMode);

  const handlePickImage = async () => {
    if (feedbackImages.length >= 5) {
      Alert.alert('Limit Reached', 'You can upload a maximum of 5 images.');
      return;
    }

    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Permission to access gallery is required to upload images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setFeedbackImages((prev) => [...prev, result.assets[0].uri]);
      }
    } catch (err) {
      console.error('Image picking error:', err);
      Alert.alert('Error', 'Failed to pick image.');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFeedbackImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitFeedback = () => {
    if (!feedbackName.trim() || !feedbackPhone.trim() || !feedbackPlace.trim() || !feedbackMessage.trim()) {
      Alert.alert('Missing Fields', 'Please complete all required fields (Name, Contact Number, Place Name, and Message).');
      return;
    }

    const cleanedPhone = feedbackPhone.replace(/\D/g, '');
    if (cleanedPhone.length !== 11) {
      Alert.alert('Invalid Contact Number', 'Contact number must be exactly 11 digits.');
      return;
    }

    const newComplaint: AppBooking = {
      id: `complaint-${Date.now()}`,
      type: 'complaint',
      name: `Complaint for ${feedbackPlace}`,
      detail: feedbackMessage,
      image: { uri: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=400' },
      price: 'Pending',
      date: new Date().toLocaleDateString(),
      createdAt: new Date().toLocaleDateString(),
      status: 'Planned',
      complaintMeta: {
        userName: feedbackName,
        contactNumber: feedbackPhone,
        touristPlace: feedbackPlace,
        message: feedbackMessage,
        images: feedbackImages,
        submissionDate: new Date().toLocaleDateString(),
        status: 'Pending',
      }
    };

    if (feedbackImages.length > 0) {
      newComplaint.image = { uri: feedbackImages[0] };
    }

    setBookings((prev) => [newComplaint, ...prev]);

    Alert.alert(
      'Feedback Submitted',
      'Thank you. Your feedback has been submitted successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            setFeedbackName('');
            setFeedbackPhone('');
            setFeedbackPlace('');
            setFeedbackMessage('');
            setFeedbackImages([]);
            setProfileViewMode('menu');
            setActiveTab('bookings');
            setBookingFilter('Complaints');
          }
        }
      ]
    );
  };

  // Guide Marketplace State
  const [guideSearchQuery, setGuideSearchQuery] = useState('');
  const [guideDivisionFilter, setGuideDivisionFilter] = useState<string | null>(null);
  const [guideViewMode, setGuideViewMode] = useState<'list' | 'agency' | 'guide' | 'booking'>('list');
  const [selectedGuideAgency, setSelectedGuideAgency] = useState<GuideAgency | null>(null);
  const [selectedGuideProfile, setSelectedGuideProfile] = useState<GuideProfile | null>(null);
  const [guideBookingForm, setGuideBookingForm] = useState({
    travelers: '2',
    contactNumber: '',
    destination: '',
    startDate: '2026-07-10',
    endDate: '2026-07-12',
    hotelName: '',
    hotelAddress: '',
    specialRequests: '',
  });
  const [guideBookingError, setGuideBookingError] = useState<string | null>(null);
  const [guideBookingSuccess, setGuideBookingSuccess] = useState<string | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [activeDateField, setActiveDateField] = useState<'start' | 'end'>('start');
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false); // kept for legacy compat
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [userProfile, setUserProfile] = useState<FirebaseUserProfile | null>(null);

  // Auth View State ('login' | 'register' | null = not shown)
  const [authView, setAuthView] = useState<'login' | 'register' | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Login form fields
  const [loginFormEmail, setLoginFormEmail] = useState('');
  const [loginFormPassword, setLoginFormPassword] = useState('');
  const [loginShowPassword, setLoginShowPassword] = useState(false);

  // Registration form fields
  const [regName, setRegName] = useState('');
  const [regContact, setRegContact] = useState('');
  const [regGender, setRegGender] = useState<'Male' | 'Female'>('Male');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regShowPassword, setRegShowPassword] = useState(false);
  const [regDocType, setRegDocType] = useState<'NID' | 'Passport' | null>(null);
  const [regDocFront, setRegDocFront] = useState<string | null>(null);
  const [regDocBack, setRegDocBack] = useState<string | null>(null);

  // Toast / Status Message
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Filtered Spots logic
  const filteredDestinations = destinations.filter(d => {
    if (d.division !== selectedDivision) return false;
    if (selectedCategories.length === 0) return true;
    return d.categories.some(cat => selectedCategories.includes(cat));
  });

  const getTodayDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const formatDateValue = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const parseDateValue = (value: string) => {
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
  };

  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstWeekday = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days: (Date | null)[] = [];
    for (let i = firstWeekday - 1; i >= 0; i -= 1) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i));
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      days.push(new Date(year, month, day));
    }
    while (days.length % 7 !== 0) {
      days.push(new Date(year, month + 1, days.length - daysInMonth - firstWeekday + 1));
    }
    return days;
  };

  const filteredGuideAgencies = guideAgencies.filter((agency) => {
    const matchesDivision = !guideDivisionFilter || agency.division === guideDivisionFilter;
    const searchText = guideSearchQuery.trim().toLowerCase();
    const matchesSearch = !searchText || [agency.name, agency.shortDescription, agency.fullDescription, ...agency.coveredDestinations]
      .join(' ')
      .toLowerCase()
      .includes(searchText);
    return matchesDivision && matchesSearch;
  });

  const toggleCategory = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Actions
  const handleBookHotel = (hotel: Hotel) => {
    const newBooking: AppBooking = {
      id: `hotel-${Date.now()}`,
      type: 'hotel',
      name: hotel.name,
      detail: `Room reservation, 1 night`,
      image: getImageSource(hotel.images[0]),
      price: `৳${hotel.ratePerNight.toLocaleString()}`,
      date: 'June 25, 2026',
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast(isBangla ? ` ${translateHotel(hotel, true).name}-এ বুকিং সম্পন্ন!` : ` Booked ${hotel.name}!`);
  };

  const getImageSource = (image: string): ImageSourcePropType => {
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return { uri: image };
    }
    return destinationLocalImages[image] ?? { uri: image };
  };

  const handleBookSpot = (dest: Destination) => {
    const newBooking: AppBooking = {
      id: `spot-${Date.now()}`,
      type: 'spot',
      name: dest.name,
      detail: `${dest.division} · ${dest.categories.join(', ')}`,
      image: getImageSource(dest.images[0]),
      price: dest.localEntryFee > 0 ? `৳${dest.localEntryFee} entry` : 'Free Entry',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      spotDestination: dest,
    };
    setBookings(prev => {
      const alreadySaved = prev.some(b => b.type === 'spot' && b.name === dest.name);
      if (alreadySaved) return prev;
      return [newBooking, ...prev];
    });
    setActiveTab('bookings');
    setBookingFilter('Saved');
    showToast(isBangla ? ` ${translateDestination(dest, true).name} সংরক্ষিত গন্তব্যে যোগ হয়েছে!` : ` ${dest.name} saved to destinations!`);
  };

  const resetGuideFlow = () => {
    setGuideViewMode('list');
    setSelectedGuideAgency(null);
    setSelectedGuideProfile(null);
    setGuideBookingError(null);
    setGuideBookingSuccess(null);
  };

  const openGuideAgency = (agency: GuideAgency) => {
    setSelectedGuideAgency(agency);
    setSelectedGuideProfile(null);
    setGuideViewMode('agency');
    setGuideBookingError(null);
    setGuideBookingSuccess(null);
  };

  const openGuideProfile = (guide: GuideProfile) => {
    setSelectedGuideProfile(guide);
    setGuideViewMode('guide');
    setGuideBookingError(null);
    setGuideBookingSuccess(null);
  };

  const openGuideBooking = (guide: GuideProfile) => {
    setSelectedGuideProfile(guide);
    setGuideBookingForm((prev) => ({
      ...prev,
      destination: selectedGuideAgency?.coveredDestinations[0] ?? '',
      contactNumber: '01700000000',
      hotelName: 'Hotel Stay',
    }));
    setGuideViewMode('booking');
    setGuideBookingError(null);
    setGuideBookingSuccess(null);
  };

  const handleContactNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 11);
    setGuideBookingForm((prev) => ({ ...prev, contactNumber: digitsOnly }));
  };

  const openDatePicker = (field: 'start' | 'end') => {
    setActiveDateField(field);
    setCalendarMonth(parseDateValue(field === 'start' ? guideBookingForm.startDate : guideBookingForm.endDate) || new Date());
    setDatePickerVisible(true);
  };

  const handleDateSelect = (date: Date) => {
    const value = formatDateValue(date);
    setGuideBookingForm((prev) => ({
      ...prev,
      [activeDateField === 'start' ? 'startDate' : 'endDate']: value,
    }));
    setDatePickerVisible(false);
  };

  const handleConfirmGuideBooking = (guide: GuideProfile) => {
    if (!selectedGuideAgency) return;

    const startDate = guideBookingForm.startDate;
    const endDate = guideBookingForm.endDate;

    if (!guideBookingForm.contactNumber || !guideBookingForm.destination || !guideBookingForm.hotelName || !startDate || !endDate) {
      setGuideBookingError('Please complete the required guide booking fields.');
      return;
    }

    if (guideBookingForm.contactNumber.length !== 11) {
      setGuideBookingError('Contact number must be exactly 11 digits.');
      return;
    }

    const overlap = bookings.some((booking) => {
      if (booking.type !== 'guide' || booking.guideMeta?.guideName !== guide.name) return false;
      const existingStart = new Date(booking.guideMeta!.startDate);
      const existingEnd = new Date(booking.guideMeta!.endDate);
      const proposedStart = new Date(startDate);
      const proposedEnd = new Date(endDate);
      return proposedStart <= existingEnd && proposedEnd >= existingStart;
    });

    if (overlap) {
      setGuideBookingError('This guide is already booked for the selected dates. Please choose another guide or travel dates.');
      return;
    }

    const newBooking: AppBooking = {
      id: `guide-${Date.now()}`,
      type: 'guide',
      name: `${guide.name} • ${selectedGuideAgency.name}`,
      detail: `Guide booking for ${guideBookingForm.destination}`,
      image: { uri: guide.photo },
      price: `৳${guide.fee.toLocaleString()}/day`,
      date: `${startDate} → ${endDate}`,
      guideMeta: {
        guideName: guide.name,
        agencyName: selectedGuideAgency.name,
        destination: guideBookingForm.destination,
        startDate,
        endDate,
        status: 'Upcoming',
      },
    };

    setBookings(prev => [newBooking, ...prev]);
    setGuideBookingSuccess(isBangla ? 'গাইড বুকিং সফলভাবে সম্পন্ন হয়েছে।' : 'Guide booking completed successfully.');
    setGuideBookingError(null);
    setGuideViewMode('agency');
    showToast(isBangla ? ` ${translateTourGuide(guide, true).name}-এর বুকিং নিশ্চিত হয়েছে!` : ` Booking confirmed for ${guide.name}!`);
  };

  const handleCancelBooking = (id: string, name: string) => {
    Alert.alert(
      isBangla ? 'বুকিং বাতিল' : 'Cancel Booking',
      isBangla ? `আপনি কি নিশ্চিত যে ${name}-এর বুকিং বাতিল করতে চান?` : `Are you sure you want to cancel your booking for ${name}?`,
      [
        { text: isBangla ? 'না' : 'No', style: 'cancel' },
        {
          text: isBangla ? 'হ্যাঁ, বাতিল করুন' : 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            setBookings(prev => prev.filter(b => b.id !== id));
            showToast(isBangla ? `${name}-এর বুকিং বাতিল হয়েছে` : `Cancelled booking for ${name}`);
          },
        },
      ]
    );
  };

  const handleLogin = () => {
    // Legacy modal handler (kept for compatibility but auth now uses full-screen views)
    if (!loginName || !loginEmail) {
      Alert.alert(
        isBangla ? 'ত্রুটি' : 'Error',
        isBangla ? 'অনুগ্রহ করে নাম এবং ইমেইল পূরণ করুন।' : 'Please fill in both name and email.'
      );
      return;
    }
    setUserProfile({ uid: 'legacy', name: loginName, email: loginEmail, contactNumber: '', gender: 'Male', memberSince: 'July 2026' });
    setIsLoggedIn(true);
    setAuthModalVisible(false);
    showToast(isBangla ? `স্বাগতম, ${loginName}!` : `Welcome, ${loginName}!`);
  };

  const handleLogout = () => {
    Alert.alert(
      isBangla ? 'সাইন আউট' : 'Sign Out',
      isBangla ? 'আপনি কি নিশ্চিত সাইন আউট করতে চান?' : 'Are you sure you want to sign out?',
      [
        { text: isBangla ? 'বাতিল' : 'Cancel', style: 'cancel' },
        {
          text: isBangla ? 'সাইন আউট' : 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logoutUser();
            } catch (e) {
              console.log('Logout error:', e);
            }
            setIsLoggedIn(false);
            setUserProfile(null);
            setLoginName('');
            setLoginEmail('');
            showToast(isBangla ? 'সফলভাবে সাইন আউট হয়েছে।' : 'Signed out successfully.');
          },
        },
      ]
    );
  };

  // Firebase-backed Login handler
  const handleFirebaseLogin = async () => {
    if (!loginFormEmail.trim() || !loginFormPassword.trim()) {
      setAuthError(isBangla ? 'ইমেল এবং পাসওয়ার্ড আবশ্যক।' : 'Email and password are required.');
      return;
    }
    setAuthLoading(true);
    setAuthError(null);
    try {
      const profile = await loginUser(loginFormEmail, loginFormPassword, isBangla);
      setUserProfile(profile);
      setIsLoggedIn(true);
      setAuthView(null);
      setLoginFormEmail('');
      setLoginFormPassword('');
      setActiveTab('explore');
      showToast(isBangla ? `স্বাগতম, ${profile.name}!` : `Welcome, ${profile.name}!`);
    } catch (err: any) {
      setAuthError(err.message || (isBangla ? 'লগইন ব্যর্থ হয়েছে।' : 'Login failed.'));
    } finally {
      setAuthLoading(false);
    }
  };

  // Firebase-backed Register handler
  const handleFirebaseRegister = async () => {
    // Validation
    if (!regName.trim()) {
      setAuthError(isBangla ? 'পূর্ণ নাম আবশ্যক।' : 'Full name is required.'); return;
    }
    if (!regContact.trim() || !/^[0-9]{11}$/.test(regContact.trim())) {
      setAuthError(isBangla ? 'যোগাযোগ নম্বর অবশ্যই ঠিক ১১ সংখ্যার হতে হবে।' : 'Contact number must be exactly 11 digits.'); return;
    }
    if (!regEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.trim())) {
      setAuthError(isBangla ? 'বৈধ ইমেল ঠিকানা প্রয়োজন।' : 'A valid email address is required.'); return;
    }
    if (!regPassword.trim() || regPassword.length < 6) {
      setAuthError(isBangla ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে।' : 'Password must be at least 6 characters.'); return;
    }
    setAuthLoading(true);
    setAuthError(null);
    try {
      await registerUser(
        {
          name: regName.trim(),
          email: regEmail.trim(),
          contactNumber: regContact.trim(),
          gender: regGender,
          documentType: regDocType || undefined,
          documentFront: regDocFront || undefined,
          documentBack: regDocBack || undefined,
        },
        regPassword,
        isBangla
      );
      // Reset form
      setRegName(''); setRegContact(''); setRegEmail(''); setRegPassword('');
      setRegDocType(null); setRegDocFront(null); setRegDocBack(null);
      // Navigate to login
      setAuthView('login');
      setAuthError(null);
      showToast(isBangla ? '✓ অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! লগইন করুন।' : '✓ Account created successfully! Please log in.');
    } catch (err: any) {
      setAuthError(err.message || (isBangla ? 'নিবন্ধন ব্যর্থ হয়েছে।' : 'Registration failed.'));
    } finally {
      setAuthLoading(false);
    }
  };

  // Image picker for registration documents
  const handlePickDocImage = async (side: 'front' | 'back') => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(isBangla ? 'অনুমতি প্রয়োজন' : 'Permission Denied', isBangla ? 'ছবি আপলোড করতে গ্যালারি অ্যাক্সেস প্রয়োজন।' : 'Gallery access is required to upload images.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });
      if (!result.canceled && result.assets?.[0]?.uri) {
        if (side === 'front') setRegDocFront(result.assets[0].uri);
        else setRegDocBack(result.assets[0].uri);
      }
    } catch (err) {
      Alert.alert(isBangla ? 'ত্রুটি' : 'Error', isBangla ? 'ছবি বাছাই করতে ব্যর্থ হয়েছে।' : 'Failed to pick image.');
    }
  };

  // Generate mock planner itinerary
  const generateItineraryPlan = () => {
    if (!plannerDivision) {
      Alert.alert('Setup Trip', 'Please select a division to explore.');
      return;
    }
    const durationDays = parseInt(plannerDuration) || 3;
    const divisionSpots = destinations.filter(d => d.division === plannerDivision);
    const divisionHotels = hotels.filter(h => h.division === plannerDivision);
    const divisionGuides = tourGuides.filter(g => g.location === plannerDivision || g.location === 'Dhaka');

    if (divisionSpots.length === 0) {
      Alert.alert('No Spots', 'No spots available for this division in our guide system yet.');
      return;
    }

    const selectedHotel = divisionHotels[0] || hotels[0];
    const selectedGuide = divisionGuides[0] || tourGuides[0];

    const itineraryDays = [];
    for (let i = 1; i <= durationDays; i++) {
      const spotIndex = (i - 1) % divisionSpots.length;
      const spot = divisionSpots[spotIndex];
      itineraryDays.push({
        day: i,
        morning: `Breakfast at hotel. Depart for ${spot.name}.`,
        afternoon: `Explore ${spot.name}. Lunch: ${spot.nearbyFood?.[0]?.name || 'Local Bengali Cuisine'}.`,
        evening: `Rest & shopping. Scenic evening views at ${spot.name} surroundings.`,
        spot,
      });
    }

    // Calculations
    const hotelCost = selectedHotel.ratePerNight * durationDays;
    const guideCost = selectedGuide.pricePerDay * durationDays;
    const entranceCost = divisionSpots.reduce((sum, s) => sum + s.localEntryFee, 0);
    const totalCost = hotelCost + guideCost + entranceCost + 1500; // 1500 for transit

    setGeneratedItinerary({
      division: plannerDivision,
      daysCount: durationDays,
      hotel: selectedHotel,
      guide: selectedGuide,
      days: itineraryDays,
      costs: { hotelCost, guideCost, entranceCost, totalCost },
    });
  };

  const handleSavePlannerTrip = () => {
    if (!generatedItinerary) return;
    const newBooking: AppBooking = {
      id: `trip-${Date.now()}`,
      type: 'trip',
      name: `${generatedItinerary.daysCount}-Day ${generatedItinerary.division} Custom Tour`,
      detail: `Hotel: ${generatedItinerary.hotel.name} & Guide: ${generatedItinerary.guide.name}`,
      image: divisionImages[generatedItinerary.division],
      price: `৳${generatedItinerary.costs.totalCost.toLocaleString()}`,
      date: 'Start Date: July 10, 2026',
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast(isBangla ? '\u2713 \u099c\u09c7\u09a8\u09be\u09b0\u09c7\u099f \u099f\u09cd\u09b0\u09bf\u09aa \u09ac\u09c1\u0995\u09bf\u0982\u09af\u09bc\u09c7 \u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09bf\u09a4 \u09b9\u09af\u09bc\u09c7\u099b\u09c7!' : '\u2713 Generated trip saved to Bookings!');
    setGeneratedItinerary(null);
    setActiveTab('bookings');
  };

  // ===== Coordinate Helper Data & Routing Optimization (TSP) =====
  const divisionCoords: Record<Division, { lat: number; lon: number }> = {
    Dhaka: { lat: 23.8103, lon: 90.4125 },
    Chattogram: { lat: 22.3569, lon: 91.7832 },
    Sylhet: { lat: 24.8949, lon: 91.8687 },
    Rajshahi: { lat: 24.3636, lon: 88.6241 },
    Khulna: { lat: 22.8456, lon: 89.5403 },
    Barishal: { lat: 22.7010, lon: 90.3535 },
    Rangpur: { lat: 25.7558, lon: 89.2444 },
    Mymensingh: { lat: 24.7471, lon: 90.4203 }
  };

  const spotCoords: Record<string, { lat: number; lon: number }> = {
    'lalbagh-fort': { lat: 23.7188, lon: 90.3882 },
    'ahsan-manzil': { lat: 23.7086, lon: 90.4060 },
    'star-mosque': { lat: 23.7156, lon: 90.4012 },
    'dhakeshwari-temple': { lat: 23.7222, lon: 90.3901 },
    'baitul-mukarram': { lat: 23.7292, lon: 90.4128 },
    'bangabandhu-museum': { lat: 23.7516, lon: 90.3775 },
    'bara-katra': { lat: 23.7154, lon: 90.3976 },
    'choto-katra': { lat: 23.7150, lon: 90.3995 },
    'sonargaon': { lat: 23.6393, lon: 90.6014 },
    'bhawal-rajbari': { lat: 24.0042, lon: 90.4253 },
    'baliati-palace': { lat: 23.9936, lon: 90.0427 },
    'wari-bateshwar': { lat: 24.1039, lon: 90.7182 },
    'coxs-bazar': { lat: 21.4272, lon: 91.9702 },
    'sajek-valley': { lat: 23.3814, lon: 92.2938 },
    'bayazid-bostami-shrine': { lat: 22.3831, lon: 91.8105 },
    'mainamati': { lat: 23.4475, lon: 91.1340 },
    'shalban-vihara': { lat: 23.4283, lon: 91.1332 },
    'foys-lake': { lat: 22.3712, lon: 91.7915 },
    'kaptai-river-edge': { lat: 22.4969, lon: 92.2222 },
    'khoiyachora-waterfall': { lat: 22.7533, lon: 91.6033 },
    'nilgiri': { lat: 21.9169, lon: 92.3175 },
    'nilachal': { lat: 22.1764, lon: 92.2031 },
    'keokradong': { lat: 21.9500, lon: 92.5167 },
    'thanchi': { lat: 21.7865, lon: 92.4283 },
    'saint-martins-island': { lat: 20.6277, lon: 92.3234 },
    'sundarbans': { lat: 21.9497, lon: 89.1833 },
    'kuakata-sea-beach': { lat: 21.8122, lon: 90.1218 },
    'ratargul-swamp-forest': { lat: 24.9961, lon: 91.9304 },
    'jaflong': { lat: 25.1610, lon: 92.0197 },
    'somapura-mahavihara': { lat: 25.0312, lon: 88.9774 },
    'tanguar-haor': { lat: 25.1500, lon: 91.0667 }
  };

  const [deviceCoords, setDeviceCoords] = useState<{ lat: number; lon: number } | undefined>(undefined);

  const getCoordsForLocation = (location: string): { lat: number; lon: number } => {
    const norm = location.trim().toLowerCase();
    if (deviceCoords && (norm.includes('my location') || norm.includes('current') || norm.includes('detected'))) {
      return deviceCoords;
    }
    for (const div in divisionCoords) {
      if (div.toLowerCase() === norm || norm.includes(div.toLowerCase())) {
        return divisionCoords[div as Division];
      }
    }
    for (const spotId in spotCoords) {
      if (norm.includes(spotId.replace(/-/g, ' '))) {
        return spotCoords[spotId];
      }
    }
    return divisionCoords.Dhaka; // default fallback
  };

  const getDistance = (c1: { lat: number; lon: number }, c2: { lat: number; lon: number }) => {
    const R = 6371; // km
    const dLat = (c2.lat - c1.lat) * Math.PI / 180;
    const dLon = (c2.lon - c1.lon) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const sortDestinationsByDistance = (startCoords: { lat: number; lon: number }, dests: Destination[]) => {
    const unvisited = [...dests];
    const route: Destination[] = [];
    let currentCoords = startCoords;

    while (unvisited.length > 0) {
      let nearestIdx = 0;
      let minDistance = Infinity;

      for (let i = 0; i < unvisited.length; i++) {
        const spotId = unvisited[i].id;
        const divisionName = unvisited[i].division;
        const targetCoords = spotCoords[spotId] || divisionCoords[divisionName] || divisionCoords.Dhaka;
        const d = getDistance(currentCoords, targetCoords);
        if (d < minDistance) {
          minDistance = d;
          nearestIdx = i;
        }
      }

      const nextDest = unvisited.splice(nearestIdx, 1)[0];
      route.push(nextDest);
      currentCoords = spotCoords[nextDest.id] || divisionCoords[nextDest.division] || divisionCoords.Dhaka;
    }
    return route;
  };

  const generateRouteExplanation = (startName: string, sortedDests: Destination[], bn: boolean = false) => {
    if (sortedDests.length === 0) return '';
    if (sortedDests.length === 1) {
      const destName = bn ? translateDestination(sortedDests[0], true).name : sortedDests[0].name;
      return bn
        ? `আপনার যাত্রা ${startName} থেকে শুরু হয়ে সরাসরি ${destName}-এ যাবে। এটি সবচেয়ে সরাসরি ভ্রমণ পথ।`
        : `Your trip starts from ${startName} and heads directly to ${sortedDests[0].name}. This is the most direct travel route.`;
    }

    const hopDetails: string[] = [];
    let prevCoords = getCoordsForLocation(startName);

    sortedDests.forEach((dest) => {
      const destCoords = spotCoords[dest.id] || divisionCoords[dest.division] || divisionCoords.Dhaka;
      const distance = getDistance(prevCoords, destCoords);
      const estTime = Math.ceil(distance / 50 + 0.5);
      const destName = bn ? translateDestination(dest, true).name : dest.name;
      if (bn) {
        hopDetails.push(`${destName} প্রায় ${distance.toFixed(0)} কি.মি. দূরে (~${estTime} ঘণ্টা যাত্রা)`);
      } else {
        hopDetails.push(`${destName} is about ${distance.toFixed(0)} km away (~${estTime} hrs transit)`);
      }
      prevCoords = destCoords;
    });

    if (bn) {
      const stops = sortedDests.map(d => translateDestination(d, true).name).join('  ');
      let explanation = `${startName} থেকে শুরু করে অপ্টিমাইজড ভ্রমণ ক্রম হলো: ${stops}। `;
      explanation += `এই ক্রমটি পেছনের যাত্রার সময় কমিয়ে দেয়। `;
      explanation += `বিশেষভাবে, ${hopDetails.join(', তারপর ') || 'সরাসরি যাত্রা'}। এতে আপনার রোড টাইম সর্বনিম্ন থাকে।`;
      return explanation;
    } else {
      const stops = sortedDests.map(d => d.name).join('  ');
      let explanation = `Starting from ${startName}, the optimized travel sequence is: ${stops}. `;
      explanation += `This order minimizes backtrack travel times. `;
      explanation += `Specifically, ${hopDetails.join(', then ') || 'traveling direct'}. This keeps your road time to a minimum.`;
      return explanation;
    }
  };

  // ===== Dynamic Data Generators =====
  const getHotelSuggestion = (division: Division, budget: string) => {
    const divisionHotels = hotels.filter(h => h.division === division);
    if (divisionHotels.length > 0) {
      const sorted = [...divisionHotels].sort((a, b) => a.ratePerNight - b.ratePerNight);
      if (budget === 'Low Budget') return sorted[0];
      if (budget === 'Premium Budget') return sorted[sorted.length - 1];
      return sorted[Math.floor(sorted.length / 2)];
    }

    const fallbackHotels: Record<string, Record<string, { name: string; ratePerNight: number; rating: number; suitableFor: string }>> = {
      Dhaka: {
        'Low Budget': { name: 'Hotel Pacific Dhaka', ratePerNight: 1500, rating: 3.8, suitableFor: 'Solo/Budget Travelers' },
        'Medium Budget': { name: 'Hotel 71 Dhaka', ratePerNight: 4000, rating: 4.2, suitableFor: 'Families & Couples' },
        'Premium Budget': { name: 'Pan Pacific Sonargaon Dhaka', ratePerNight: 15000, rating: 4.7, suitableFor: 'Business & Luxury Travelers' }
      },
      Sylhet: {
        'Low Budget': { name: 'Green bari Guesthouse', ratePerNight: 1200, rating: 3.9, suitableFor: 'Solo Travelers' },
        'Medium Budget': { name: 'Hotel Supreme Sylhet', ratePerNight: 3500, rating: 4.1, suitableFor: 'Couples & Small Families' },
        'Premium Budget': { name: 'Rose View Hotel Sylhet', ratePerNight: 11000, rating: 4.6, suitableFor: 'Luxury Seekers' }
      },
      Rajshahi: {
        'Low Budget': { name: 'Hotel Nice International', ratePerNight: 1000, rating: 3.7, suitableFor: 'Budget Travelers' },
        'Medium Budget': { name: 'Hotel Parjatan Rajshahi', ratePerNight: 2800, rating: 4.0, suitableFor: 'Families' },
        'Premium Budget': { name: 'Grand Riverview Hotel Rajshahi', ratePerNight: 7500, rating: 4.5, suitableFor: 'Premium Travelers' }
      },
      Khulna: {
        'Low Budget': { name: 'Hotel Jalico Khulna', ratePerNight: 1200, rating: 3.8, suitableFor: 'Solo Travelers' },
        'Medium Budget': { name: 'Hotel Castle Salam', ratePerNight: 3800, rating: 4.2, suitableFor: 'Couples & Business' },
        'Premium Budget': { name: 'City Inn Khulna', ratePerNight: 8500, rating: 4.5, suitableFor: 'Luxury Seekers' }
      },
      Barishal: {
        'Low Budget': { name: 'Hotel Athena Barishal', ratePerNight: 1000, rating: 3.6, suitableFor: 'Solo Travelers' },
        'Medium Budget': { name: 'Hotel Grand Park Barishal', ratePerNight: 4500, rating: 4.3, suitableFor: 'Families & Corporate' },
        'Premium Budget': { name: 'Hotel Arena Barishal (Suite)', ratePerNight: 8000, rating: 4.4, suitableFor: 'Premium Seekers' }
      },
      Rangpur: {
        'Low Budget': { name: 'Hotel Golden Tower Rangpur', ratePerNight: 900, rating: 3.7, suitableFor: 'Budget Travelers' },
        'Medium Budget': { name: 'Hotel Parjatan Rangpur', ratePerNight: 2500, rating: 4.0, suitableFor: 'Families' },
        'Premium Budget': { name: 'Grand Palace Hotel Rangpur', ratePerNight: 7000, rating: 4.4, suitableFor: 'Premium Seekers' }
      },
      Mymensingh: {
        'Low Budget': { name: 'Hotel Amir Mymensingh', ratePerNight: 1000, rating: 3.6, suitableFor: 'Solo Travelers' },
        'Medium Budget': { name: 'Hotel Parjatan Mymensingh', ratePerNight: 2600, rating: 4.0, suitableFor: 'Families' },
        'Premium Budget': { name: 'Birasiri Eco Resort (VIP)', ratePerNight: 6500, rating: 4.3, suitableFor: 'Nature Lovers' }
      },
      Chattogram: {
        'Low Budget': { name: 'Hotel Landmark Chattogram', ratePerNight: 2200, rating: 4.0, suitableFor: 'Solo & Families' },
        'Medium Budget': { name: 'Hotel Avenue 9 Chattogram', ratePerNight: 4500, rating: 4.2, suitableFor: 'Business & Couples' },
        'Premium Budget': { name: 'Radisson Blu Chattogram Bay View', ratePerNight: 16000, rating: 4.8, suitableFor: 'Luxury & Business' }
      }
    };

    const divOptions = fallbackHotels[division] || fallbackHotels.Dhaka;
    return divOptions[budget] || divOptions['Medium Budget'];
  };

  const getWhyVisitText = (dest: Destination) => {
    const customWhyVisit: Record<string, string> = {
      'lalbagh-fort': 'Immerse yourself in authentic 17th-century Mughal heritage and take stunning photographs of the historic tomb of Pari Bibi.',
      'ahsan-manzil': 'Explore the luxurious lifestyle of the Nawabs of Dhaka and marvel at the pink palace architectural heritage.',
      'sajek-valley': 'Witness clouds rolling over green valleys, interact with local tribal communities, and experience absolute peace above the clouds.',
      'coxs-bazar': 'Relax on the world\'s longest unbroken sandy beach, enjoy fresh local seafood, and watch unforgettable sunsets.',
      'saint-martins-island': 'Experience Bangladesh\'s only coral island, with crystal clear blue waters, coconut groves, and fresh marine life.',
      'sundarbans': 'Explore the world\'s largest mangrove forest, track the royal Bengal tiger, and cruise through mystical saltwater rivers.',
      'kuakata-sea-beach': 'Known as the "Daughter of the Ocean", it is the unique spot where you can watch both sunrise and sunset over the Bay of Bengal.',
      'ratargul-swamp-forest': 'Navigate the only freshwater swamp forest in Bangladesh by traditional wooden boat, surrounded by submerged evergreen trees.',
      'jaflong': 'See the scenic stone collection from the mari river right at the Indian border, with rolling green hills of tea in the backdrop.',
      'tanguar-haor': 'Sail on a traditional houseboat in one of the country\'s largest freshwater wetland sanctuaries, perfect for stargazing.'
    };
    const customWhyVisitBn: Record<string, string> = {
      'lalbagh-fort': '১৭ শতকের আসল মুঘল ঐতিহ্যের কাছাকাছি যান এবং পরী বিবির ঐতিহাসিক সমাধির চমৎকার ছবি তুলুন।',
      'ahsan-manzil': 'ঢাকার নবাবদের বিলাসবহুল জীবনধারা অন্বেষণ করুন এবং চমৎকার গোলাপী প্রাসাদের স্থাপত্যশৈলী দেখে মুগ্ধ হন।',
      'sajek-valley': 'সবুজ উপত্যকার ওপর মেঘের ভেলা ভেসে যাওয়া দেখুন, স্থানীয় আদিবাসীদের সাথে মেলামেশা করুন এবং মেঘের ওপরে সম্পূর্ণ মানসিক প্রশান্তি অনুভব করুন।',
      'coxs-bazar': 'বিশ্বের দীর্ঘতম অখণ্ড বালুকাময় সমুদ্র সৈকতে আরাম করুন, তাজা স্থানীয় সামুদ্রিক খাবার উপভোগ করুন এবং অবিস্মরণীয় সূর্যাস্ত দেখুন।',
      'saint-martins-island': 'স্বচ্ছ নীল জল, নারকেল বাগান এবং তাজা সামুদ্রিক মাছের প্রাচুর্য নিয়ে বাংলাদেশের একমাত্র প্রবাল দ্বীপের রোমাঞ্চকর অভিজ্ঞতা নিন।',
      'sundarbans': 'বিশ্বের বৃহত্তম ম্যানগ্রোভ বন অন্বেষণ করুন, রয়েল বেঙ্গল টাইগার খুঁজুন এবং মায়াবী লবণাক্ত নদীর মধ্য দিয়ে নৌ ক্রুজ উপভোগ করুন।',
      'kuakata-sea-beach': '"সাগর কন্যা" হিসেবে পরিচিত এই অনন্য স্থানে একই সাথে বঙ্গোপসাগরের ওপর সূর্যোদয় এবং সূর্যাস্ত দেখুন।',
      'ratargul-swamp-forest': 'পানিতে নিমজ্জিত চিরসবুজ হিজল-করচ গাছে ঘেরা বাংলাদেশের একমাত্র মিঠা পানির জলাবন ঐতিহ্যবাহী কাঠের নৌকায় ঘুরে দেখুন।',
      'jaflong': 'চা বাগানের সবুজ পাহাড়ের পটভূমিতে ভারত সীমান্ত বরাবর পিয়াইন নদী থেকে পাথর শ্রমিকদের পাথর উত্তোলনের মনোরম দৃশ্য দেখুন।',
      'tanguar-haor': 'তারা দেখার জন্য আদর্শ, দেশের অন্যতম বৃহত্তম মিঠা পানির জলাভূমি অভয়ারণ্যে ঐতিহ্যবাহী হাউসবোটে ঘুরে বেড়ান।'
    };
    if (isBangla) {
      if (customWhyVisitBn[dest.id]) return customWhyVisitBn[dest.id];
      const firstCat = translateCategory(dest.categories[0] || 'scenic', isBangla);
      return `একটি চমৎকার ${firstCat.toLowerCase()} গন্তব্য যা স্থানীয় সংস্কৃতি অন্বেষণ, সুন্দর ছবি তোলার এবং বাংলাদেশের প্রাকৃতিক ঐতিহ্যের সাথে যুক্ত হওয়ার অনন্য সুযোগ দেয়।`;
    }
    if (customWhyVisit[dest.id]) return customWhyVisit[dest.id];
    const firstCat = dest.categories[0] || 'scenic';
    return `A spectacular ${firstCat.toLowerCase()} destination offering a unique opportunity to explore the local culture, take beautiful photos, and connect with the natural heritage of Bangladesh.`;
  };

  const getIntercityTransportGuide = (from: string, division: Division, budget: string) => {
    const isFlightAvailable = ['Chattogram', 'Sylhet', 'Rajshahi', 'Barishal'].includes(division) &&
      (from.toLowerCase().includes('dhaka') || from.toLowerCase().includes('sylhet') || from.toLowerCase().includes('airport'));

    if (budget === 'Low Budget') {
      return {
        method: isBangla ? 'নন-এসি আন্তঃনগর বাস / লোকাল ট্রেন' : 'Non-AC Intercity Bus / Local Train',
        overview: isBangla
          ? `${from} থেকে ${translateDivision(division, true)} পর্যন্ত সরাসরি নন-এসি হাইওয়ে বাস বা লোকাল মেইল ট্রেনে ভ্রমণ করুন। এটি ভ্রমণের সবচেয়ে সাশ্রয়ী মাধ্যম।`
          : `Take a direct non-AC highway bus or local train mail service from ${from} to ${division}. It is the most economical way to travel.`,
        alternatives: isBangla
          ? ['লোকাল প্যাসেঞ্জার ট্রেন (দ্বিতীয় শ্রেণী)', 'লঞ্চ (ডেক সিট, যদি বরিশাল/ঢাকা ভ্রমণ করেন)']
          : ['Local Passenger Train (Second Class)', 'Launch (Deck seat, if traveling to Barishal/Dhaka)'],
        estimatedTime: isBangla
          ? (division === 'Dhaka' ? '১.৫-২.৫ ঘণ্টা' : '৬-৯ ঘণ্টা')
          : (division === 'Dhaka' ? '1.5-2.5 hours' : '6-9 hours'),
        costPerPerson: 500
      };
    } else if (budget === 'Premium Budget') {
      return {
        method: isBangla
          ? (isFlightAvailable ? 'অভ্যন্তরীণ ফ্লাইট (ইউএস-বাংলা/বিমান/এয়ার অ্যাস্ট্রা)' : 'ব্যক্তিগত সেডান / এসইউভি কার রেন্টাল')
          : (isFlightAvailable ? 'Domestic Flight (US-Bangla/Biman/Air Astra)' : 'Private Sedan / SUV Rental'),
        overview: isFlightAvailable
          ? (isBangla
              ? `বিমানবন্দর থেকে সরাসরি ${translateDivision(division, true)}-এ উড়াল দিন। দ্রুত, আরামদায়ক এবং আপনার মূল্যবান সময় বাঁচায়।`
              : `Fly directly from the airport to ${division}. Swift, comfortable, and saves valuable travel time.`)
          : (isBangla
              ? `${from} থেকে সরাসরি ও আরামদায়ক ভ্রমণের জন্য ড্রাইভারসহ একটি ব্যক্তিগত এসি গাড়ি ভাড়া করুন।`
              : `Hire a private air-conditioned car with a driver for a direct, comfortable road trip from ${from} to ${division}.`),
        alternatives: isBangla
          ? [isFlightAvailable ? 'ব্যক্তিগত কার / এসইউভি রেন্টাল' : 'লাক্সারি স্লিপার বাস (গ্রিন লাইন / দেশ ট্রাভেলস)', 'এসি ট্রেন বগি (স্নিগ্ধা/এসি কেবিন)']
          : [isFlightAvailable ? 'Private Car / SUV Rental' : 'Luxury Sleeper Bus (Green Line / Desh Travel)', 'AC Train Compartment (Snigdha/AC Cabin)'],
        estimatedTime: isBangla
          ? (isFlightAvailable ? '৪৫ মিনিট - ১ ঘণ্টা' : '৪-৬ ঘণ্টা')
          : (isFlightAvailable ? '45 mins - 1 hour' : '4-6 hours'),
        costPerPerson: isFlightAvailable ? 5500 : 3500
      };
    } else {
      return {
        method: isBangla ? 'এসি চেয়ার ট্রেন (স্নিগ্ধা) / এসি হাইওয়ে কোচ' : 'AC Chair Train (Snigdha) / AC Highway Coach',
        overview: isBangla
          ? `${from} থেকে ${translateDivision(division, true)} পর্যন্ত এসি চেয়ার ট্রেন বা সরাসরি এসি হাইওয়ে কোচে (যেমন: গ্রিন লাইন, এনা বা হানিফ) ভ্রমণ করুন।`
          : `Travel via AC chair train or direct AC highway coach (like Green Line, Ena, or Hanif) from ${from} to ${division}.`,
        alternatives: isBangla
          ? ['নন-এসি বাস (যেকোনো সময়ের জন্য)', 'কার পুলিং/শেয়ার্ড ট্যাক্সি']
          : ['Non-AC Bus (for flexible timings)', 'Car pooling/shared taxi'],
        estimatedTime: isBangla
          ? (division === 'Dhaka' ? '১.৫-২.৫ ঘণ্টা' : '৫-৮ ঘণ্টা')
          : (division === 'Dhaka' ? '1.5-2.5 hours' : '5-8 hours'),
        costPerPerson: 1300
      };
    }
  };

  const getLocalTransportGuide = (budget: string) => {
    if (budget === 'Low Budget') {
      return {
        mode: isBangla ? 'রিকশা ও লোকাল শেয়ার্ড অটো-রিকশা' : 'Rickshaw & Share Auto-Rickshaw',
        description: isBangla
          ? 'সবচেয়ে কম খরচে যাতায়াত। অল্প দূরত্বের জন্য ম্যানুয়াল রিকশা এবং দীর্ঘ বা নিয়মিত দূরত্বের জন্য শেয়ার ভিত্তিতে ব্যাটারিচালিত অটো-রিকশা ব্যবহার করুন।'
          : 'Cheapest local transit. Use manual rickshaws for short trips and battery-operated auto-rickshaws on sharing basis.',
        costPerDayPerPerson: 150
      };
    } else if (budget === 'Premium Budget') {
      return {
        mode: isBangla ? 'ব্যক্তিগত এসি রেন্টাল কার / এসইউভি' : 'Dedicated AC Rental Car / SUV',
        description: isBangla
          ? 'আপনার সেবায় সারাদিনের জন্য স্থানীয় চালকসহ ব্যক্তিগত গাড়ি। পরিবার ও গ্রুপ ভ্রমণের জন্য অত্যন্ত সুপারিশকৃত।'
          : 'Private car with a local driver at your service all day. Highly recommended for group travel and families.',
        costPerDayPerPerson: 1500
      };
    } else {
      return {
        mode: isBangla ? 'রিজার্ভড সিএনজি অটো-রিকশা ও রাইড-শেয়ারিং' : 'Reserved CNG Auto-Rickshaw & Ride-sharing',
        description: isBangla
          ? 'দ্রুত যাতায়াতের জন্য ব্যক্তিগত সিএনজি অটো-রিকশা ভাড়া করুন অথবা স্থানীয় রাইড-শেয়ারিং অ্যাপ (উবার/পাঠাও) ব্যবহার করুন।'
          : 'Hire a private CNG auto-rickshaw or use local ride-share apps (Uber/Pathao) for quick commutes.',
        costPerDayPerPerson: 400
      };
    }
  };

  const getFoodRecommendations = (division: Division, budget: string, dests: Destination[]) => {
    const famousDishes: Record<string, string[]> = isBangla ? {
      Dhaka: ['ঢাকাইয়া কাচ্চি বিরিয়ানি', 'মিষ্টি দই সহ বাকরখানি', 'চকবাজারের ঐতিহ্যবাহী স্ট্রিট ফুড', 'বোরহানি'],
      Chattogram: ['মেজবানি গরুর মাংস (মেজবানি গোশত)', 'লইট্টা ফ্রাই সহ কালা ভুনা', 'কক্সবাজারের সি-ফুড প্ল্যাটার', 'ব্যাম্বু চিকেন'],
      Sylhet: ['সাতকরা দিয়ে গরুর মাংস (লেবু জাতীয় ফল দিয়ে রান্না)', 'শ্রীমঙ্গলের বিখ্যাত সাত রঙের চা', 'চুঙ্গা পিঠা', 'সিলেটি বিরিয়ানি'],
      Rajshahi: ['ফজলি/আশ্বিনা মিষ্টি আম', 'হাঁসের ভুনা সহ কালাই রুটি', 'রাজশাহীর বিখ্যাত রেশমি মিষ্টি'],
      Khulna: ['চুইঝাল দিয়ে খাসির মাংস', 'সুন্দরবনের খাঁটি মধু', 'নারকেলের দুধে গলদা চিংড়ি'],
      Barishal: ['তাজা ইলিশ মাছের তরকারি', 'ডাবের পানি ও স্থানীয় পিঠা', 'তাজা পেয়ারার প্ল্যাটার'],
      Rangpur: ['সিদল ভর্তা (শুটকি মাছের ঐতিহ্যবাহী ভর্তা)', 'হাড়িভাঙ্গা মিষ্টি আম', 'রংপুরের গরুর মাংসের কারি'],
      Mymensingh: ['মুক্তাগাছের মণ্ডা (ঐতিহ্যবাহী মিষ্টি)', 'নেত্রকোনার শুটকি মাছ', 'স্থানীয় হাঁসের মাংসের তরকারি']
    } : {
      Dhaka: ['Dhakaiya Kacchi Biryani', 'Bakarkhani with Sweet Curd', 'Chawkbazar Street Foods', 'Borhani'],
      Chattogram: ['Mezban Beef (Mezbani Gosht)', 'Kala Bhuna with Loitta Fry', 'Cox\'s Bazar Seafood Platters', 'Bamboo Chicken'],
      Sylhet: ['Shatkora Beef (Citrus Beef Curry)', 'Seven-Layer Tea at Sreemangal', 'Chunga Pitha', 'Sylheti Biryani'],
      Rajshahi: ['Fazli/Ashwina Sweet Mangoes', 'Kalai Roti with Duck Bhuna', 'Rajshahi Silk City Sweets'],
      Khulna: ['Chui Jhal Mutton Curry', 'Sundarbans Honey', 'Coconut Milk Prawn Curry'],
      Barishal: ['Fresh Hilsa (Ilish) Curry', 'Coconut Water & Local Pitha', 'Guava Fruit Platters'],
      Rangpur: ['Shidol Bhorta (Dry Fish Paste)', 'Haribhanga Sweet Mangoes', 'Rangpuri Beef Curry'],
      Mymensingh: ['Monda of Muktagacha (Traditional Sweet)', 'Netrokona Dry Fish', 'Local Duck Curry']
    };

    const divDishes = famousDishes[division] || famousDishes.Dhaka;

    const spotRestaurants: string[] = [];
    dests.forEach(d => {
      if (d.nearbyFood) {
        d.nearbyFood.forEach(f => {
          if (!spotRestaurants.includes(f.name)) {
            const rName = isBangla ? (f.name.replace('Restaurant', 'রেস্তোরাঁ').replace('Cafe', 'ক্যাফে').replace('Hotel', 'হোটেল')) : f.name;
            const rDesc = isBangla ? (f.description.replace('Traditional Bengali Mezban', 'ঐতিহ্যবাহী মেজবান').replace('Fresh seafood with sunset view', 'সূর্যাস্তের দৃশ্যসহ তাজা সি-ফুড').replace('River views and hilsa fish', 'নদীর দৃশ্য ও ইলিশ মাছ').replace('Local street food & tea', 'লোকাল স্ট্রিট ফুড ও চা')) : f.description;
            spotRestaurants.push(`${rName} (${rDesc})`);
          }
        });
      }
    });

    const attractionFoods: string[] = [];
    dests.forEach(dest => {
      const attractions = nearbyAttractionsData[dest.id] || [];
      attractions.forEach(a => {
        a.localFood.forEach(food => {
          const foodName = isBangla
            ? food.replace('seafood', 'সামুদ্রিক খাবার').replace('Seafood', 'সামুদ্রিক খাবার').replace('prawn', 'চিংড়ি').replace('tea', 'চা').replace('Tea', 'চা').replace('sweets', 'মিষ্টি').replace('sweet', 'মিষ্টি').replace('Bamboo', 'ব্যাম্বু').replace('bamboo', 'ব্যাম্বু')
            : food;
          if (!attractionFoods.includes(foodName) && !divDishes.includes(foodName)) {
            attractionFoods.push(foodName);
          }
        });
      });
    });

    let diningNotes = '';
    if (isBangla) {
      if (budget === 'Low Budget') {
        diningNotes = 'পরিষ্কার স্থানীয় বাংলা হোটেল বা রাস্তার ধারের দোকানে আহার করুন। প্রতি বেলা খাবারের গড় খরচ ১০০ - ১৫০ টাকা।';
      } else if (budget === 'Premium Budget') {
        diningNotes = 'প্রিমিয়াম হোটেলের বুফে এবং এসি ঐতিহ্যবাহী রেস্তোরাঁয় আহার করুন। প্রতি বেলা খাবারের গড় খরচ ৮০০ - ১৫০০ টাকা।';
      } else {
        diningNotes = 'জনপ্রিয় ও ভালো রেটিংযুক্ত স্থানীয় পর্যটক রেস্তোরাঁয় আহার করুন। প্রতি বেলা খাবারের গড় খরচ ২৫০ - ৪৫০ টাকা।';
      }
    } else {
      if (budget === 'Low Budget') {
        diningNotes = 'Eat at clean local Bengali dhabas / street stalls. Average cost per meal is ৳100 - ৳150 BDT.';
      } else if (budget === 'Premium Budget') {
        diningNotes = 'Dine at premium hotel buffets and air-conditioned heritage restaurants. Average cost per meal is ৳800 - ৳1,500 BDT.';
      } else {
        diningNotes = 'Dine at highly rated local tourist restaurants. Average cost per meal is ৳250 - ৳450 BDT.';
      }
    }

    return {
      mustTryFoods: [...divDishes, ...attractionFoods.slice(0, 4)],
      restaurants: spotRestaurants.slice(0, 4),
      diningNotes,
      attractionSpecificFood: attractionFoods.slice(0, 6),
    };
  };

  // ===== Nearby Attractions Helper =====
  const getAttractionsForDuration = (destId: string, days: number): NearbyAttraction[] => {
    const all = nearbyAttractionsData[destId];
    if (!all || all.length === 0) return [];

    // Sort by priority, then by lat proximity (greedy nearest-neighbour within same priority)
    const byPriority = [...all].sort((a, b) => a.priority - b.priority);

    // Determine how many attractions to include based on trip duration
    let maxAttractions: number;
    if (days <= 1) maxAttractions = 3;
    else if (days === 2) maxAttractions = 5;
    else if (days === 3) maxAttractions = 7;
    else if (days === 4) maxAttractions = 9;
    else maxAttractions = byPriority.length;

    return byPriority.slice(0, maxAttractions);
  };

  // Greedily sort attractions by nearest-neighbour from a given start point
  const sortAttractionsByProximity = (
    startLat: number, startLon: number, attractions: NearbyAttraction[]
  ): NearbyAttraction[] => {
    if (attractions.length <= 1) return attractions;
    const remaining = [...attractions];
    const ordered: NearbyAttraction[] = [];
    let curLat = startLat;
    let curLon = startLon;
    while (remaining.length > 0) {
      let nearestIdx = 0;
      let minDist = Infinity;
      remaining.forEach((a, i) => {
        const d = Math.sqrt(Math.pow(a.lat - curLat, 2) + Math.pow(a.lon - curLon, 2));
        if (d < minDist) { minDist = d; nearestIdx = i; }
      });
      const next = remaining.splice(nearestIdx, 1)[0];
      ordered.push(next);
      curLat = next.lat;
      curLon = next.lon;
    }
    return ordered;
  };

  const buildDailySchedule = (dests: Destination[], days: number, budget: string, hotelName: string) => {
    const schedule = [];
    const localTransportLabel = isBangla
      ? (budget === 'Low Budget' ? 'স্থানীয় রিকশা / পায়ে হাঁটা' : budget === 'Premium Budget' ? 'ব্যক্তিগত ভাড়া গাড়ি' : 'সিএনজি অটোরিকশা')
      : (budget === 'Low Budget' ? 'Local Rickshaw / Walk' : budget === 'Premium Budget' ? 'Private Rental Car' : 'CNG Auto-rickshaw');

    // Gather ALL nearby attractions across all selected destinations
    const allAttractions: NearbyAttraction[] = [];
    dests.forEach(dest => {
      const destAttractions = getAttractionsForDuration(dest.id, days);
      const destCoords = spotCoords[dest.id] || divisionCoords[dest.division] || divisionCoords.Dhaka;
      const ordered = sortAttractionsByProximity(destCoords.lat, destCoords.lon, destAttractions);
      ordered.forEach(a => {
        if (!allAttractions.find(existing => existing.name === a.name)) {
          allAttractions.push(a);
        }
      });
    });

    // Distribute attractions across days (skip last day which is departure)
    const usableDays = Math.max(1, days - 1);
    const attractionsPerDay = Math.ceil(allAttractions.length / usableDays);

    for (let d = 1; d <= days; d++) {
      const destIndex = (d - 1) % dests.length;
      const dest = dests[destIndex];

      let activities: string[] = [];
      let timeline: { time: string; activity: string }[] = [];

      if (d === 1) {
        // Day 1: Arrival + first 2-3 attractions
        const dayAttractions = allAttractions.slice(0, Math.min(2, allAttractions.length));
        activities = isBangla ? [
          `${translateDestination(dest, true).name} এলাকায় পৌঁছান এবং ${translateHotel({name: hotelName, amenities: [], division: ''}, true).name}-এ চেক-ইন করুন।`,
          ...dayAttractions.map(a => {
            const transA = translateNearbyAttraction(a, true);
            return `${transA.name} ভ্রমণ করুন — ${transA.description.split('—')[0].trim()}।`;
          }),
          `স্থানীয় সি-ফুড বা ঐতিহ্যবাহী রেস্তোরাঁয় স্বাগত ডিনার উপভোগ করুন।`
        ] : [
          `Arrive in ${dest.name} region and check in at ${hotelName}.`,
          ...dayAttractions.map(a => `Visit ${a.name} — ${a.description.split('—')[0].trim()}.`),
          `Enjoy a welcome dinner at a local seafood or regional restaurant.`
        ];
        timeline = isBangla ? [
          { time: '08:00 AM', activity: 'যাত্রা শুরুর স্থান থেকে রওনা হন' },
          { time: '12:00 PM', activity: `পৌঁছান এবং ${translateHotel({name: hotelName, amenities: [], division: ''}, true).name}-এ চেক-ইন করুন` },
          { time: '01:00 PM', activity: 'ঐতিহ্যবাহী স্থানীয় ভোজনশালায় দুপুরের খাবার' },
        ] : [
          { time: '08:00 AM', activity: 'Depart from starting location' },
          { time: '12:00 PM', activity: `Arrive & check-in at ${hotelName}` },
          { time: '01:00 PM', activity: 'Lunch at a traditional local eatery' },
        ];
        dayAttractions.forEach((a, idx) => {
          const transA = translateNearbyAttraction(a, isBangla);
          const startHour = 14 + idx * 2;
          const timeStr = `${startHour > 12 ? startHour - 12 : startHour}:${startHour >= 12 ? '00 PM' : '00 AM'}`;
          timeline.push({
            time: timeStr,
            activity: isBangla 
              ? `${transA.name} (${transA.visitDuration}) — মাধ্যমে ${transA.localTransport}, যাতায়াত সময় ${transA.travelTime}`
              : `${a.name} (${a.visitDuration}) — via ${a.localTransport}, ${a.travelTime}`
          });
        });
        timeline.push({
          time: '07:30 PM',
          activity: isBangla ? 'হোটেলের কাছাকাছি রাতের খাবার এবং সান্ধ্যকালীন হাঁটাচলা' : 'Dinner & evening stroll near hotel'
        });

      } else if (d === days) {
        // Last day: light activity + departure
        const lastAttractions = allAttractions.slice(-Math.min(1, allAttractions.length));
        activities = isBangla ? [
          `ভোরে একটি শেষ আকর্ষণে ভ্রমণ করুন।`,
          `স্থানীয় বাজারে স্মৃতিচিহ্ন কেনাকাটা।`,
          `হোটেল চেক-আউট এবং বাড়ির উদ্দেশ্যে যাত্রা।`
        ] : [
          `Early morning visit to a final attraction.`,
          `Souvenir shopping at local markets.`,
          `Hotel check-out and journey back home.`
        ];
        timeline = isBangla ? [
          { time: '07:00 AM', activity: 'হোটেল থেকে সকালের নাস্তা করুন' },
          ...(lastAttractions.length > 0 ? [{
            time: '08:30 AM',
            activity: `শেষ ভ্রমণ: ${translateNearbyAttraction(lastAttractions[0], true).name} (${translateNearbyAttraction(lastAttractions[0], true).visitDuration})`
          }] : []),
          { time: '10:30 AM', activity: 'স্থানীয় কারুশিল্প ও স্মৃতিচিহ্ন কেনাকাটা' },
          { time: '12:00 PM', activity: 'হোটেল থেকে চেক-আউট করুন' },
          { time: '01:00 PM', activity: 'প্রিয় স্থানীয় কোনো স্পটে দুপুরের শেষ খাবার' },
          { time: '02:30 PM', activity: 'বাড়ির উদ্দেশ্যে রওনা হন' },
          { time: '08:00 PM', activity: 'বাড়িতে পৌঁছান — ট্রিপ সমাপ্ত!' }
        ] : [
          { time: '07:00 AM', activity: 'Breakfast at hotel' },
          ...(lastAttractions.length > 0 ? [{
            time: '08:30 AM',
            activity: `Last visit: ${lastAttractions[0].name} (${lastAttractions[0].visitDuration})`
          }] : []),
          { time: '10:30 AM', activity: 'Local craft & souvenir shopping' },
          { time: '12:00 PM', activity: 'Checkout from hotel' },
          { time: '01:00 PM', activity: 'Final lunch at a favourite local spot' },
          { time: '02:30 PM', activity: 'Depart for home' },
          { time: '08:00 PM', activity: 'Arrive home — trip completed!' }
        ];

      } else {
        // Middle days: distribute nearby attractions evenly
        const startIdx = (d - 1) * attractionsPerDay;
        const dayAttractions = allAttractions.slice(startIdx, startIdx + attractionsPerDay);
        const dayLabel = dayAttractions.length > 0
          ? (isBangla
              ? dayAttractions.map(a => translateNearbyAttraction(a, true).name).join(' এবং ')
              : dayAttractions.map(a => a.name).join(' & '))
          : (isBangla ? translateDestination(dest, true).name : dest.name);

        activities = dayAttractions.length > 0
          ? (isBangla ? [
              ...dayAttractions.map(a => {
                const transA = translateNearbyAttraction(a, true);
                return `${transA.name}: ${transA.whyVisit}`;
              }),
              `স্থানীয় বিশেষ খাবার চেখে দেখুন যেমন: ${dayAttractions.flatMap(a => translateNearbyAttraction(a, true).localFood.slice(0, 1)).join(', ')}।`
            ] : [
              ...dayAttractions.map(a => `${a.name}: ${a.whyVisit}`),
              `Sample local food including: ${dayAttractions.flatMap(a => a.localFood.slice(0, 1)).join(', ')}.`
            ])
          : (isBangla ? [
              `${translateDestination(dest, true).name}-এর আশেপাশের এলাকায় সারাদিন অন্বেষণ করুন।`,
              `স্থানীয় ক্রিয়াকলাপ, ট্র্যাকিং, বোটিং বা সাংস্কৃতিক ভ্রমণে অংশ নিন।`,
              `ঐতিহ্যবাহী স্ট্রিট ফুড এবং স্থানীয় বিশেষ খাবার চেখে দেখুন।`
            ] : [
              `Full day exploration of ${dest.name} surroundings.`,
              `Engage in local activities, trekking, boating, or cultural visits.`,
              `Sample traditional street food and local specialties.`
            ]);

        timeline = isBangla ? [
          { time: '07:30 AM', activity: 'হোটেল থেকে সকালের নাস্তা করুন' },
        ] : [
          { time: '07:30 AM', activity: 'Breakfast at hotel' },
        ];

        const timeSlots = ['09:00 AM', '11:30 AM', '02:30 PM', '04:30 PM'];
        dayAttractions.forEach((a, idx) => {
          const transA = translateNearbyAttraction(a, isBangla);
          if (idx < timeSlots.length) {
            timeline.push({
              time: timeSlots[idx],
              activity: isBangla
                ? `${transA.name} (${transA.visitDuration}) — ${transA.localTransport}, ${transA.travelTime}${transA.travelCostBDT > 0 ? `, ~৳${String(transA.travelCostBDT).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)])}` : ''}`
                : `${a.name} (${a.visitDuration}) — ${a.localTransport}, ${a.travelTime}${a.travelCostBDT > 0 ? `, ~৳${a.travelCostBDT}` : ''}`
            });
            if (idx === 1 && dayAttractions.length > 2) {
              const tryFood = transA.localFood[0] || (isBangla ? 'স্থানীয় বিশেষ খাবার' : 'local specialties');
              timeline.push({
                time: '01:00 PM',
                activity: isBangla ? `দুপুরের খাবারের বিরতি — ট্রাই করুন: ${tryFood}` : `Lunch break — try: ${tryFood}`
              });
            }
          }
        });

        if (dayAttractions.length === 0) {
          if (isBangla) {
            timeline.push(
              { time: '09:30 AM', activity: `${translateDestination(dest, true).name}-এর আশেপাশের এলাকায় অন্বেষণ` },
              { time: '01:00 PM', activity: 'স্থানীয় রেস্তোরাঁয় দুপুরের খাবার' },
              { time: '03:00 PM', activity: 'সাংস্কৃতিক ভ্রমণ এবং স্থানীয় সংযোগ' },
              { time: '06:30 PM', activity: 'শহরের কেন্দ্রস্থলে সান্ধ্যকালীন হাঁটাচলা' }
            );
          } else {
            timeline.push(
              { time: '09:30 AM', activity: `Exploration of ${dest.name} surroundings` },
              { time: '01:00 PM', activity: 'Lunch at a local restaurant' },
              { time: '03:00 PM', activity: 'Cultural visits and local interactions' },
              { time: '06:30 PM', activity: 'Evening walk through town centre' }
            );
          }
        }

        const dinnerFoods = dayAttractions.length > 0
          ? dayAttractions.flatMap(a => translateNearbyAttraction(a, isBangla).localFood).slice(0, 2).join(' / ')
          : (isBangla ? 'স্থানীয় খাবার' : 'local cuisine');
        timeline.push({
          time: '07:30 PM',
          activity: isBangla ? `রাতের খাবার — ট্রাই করুন: ${dinnerFoods}` : `Dinner — ${dayAttractions.length > 0 ? dayAttractions.flatMap(a => a.localFood).slice(0, 2).join(' / ') : 'local cuisine'}`
        });

        // Use specific area label if attractions exist
        if (dayAttractions.length > 0) {
          schedule.push({
            day: d,
            destination: dayLabel,
            activities,
            meals: isBangla ? ['সকালের নাস্তা (হোটেল)', 'দুপুরের খাবার (লোকাল)', 'রাতের খাবার (রেস্তোরাঁ)'] : ['Breakfast (Hotel)', 'Lunch (Local)', 'Dinner (Restaurants)'],
            accommodation: hotelName,
            transportInfo: localTransportLabel,
            timeline
          });
          continue;
        }
      }

      schedule.push({
        day: d,
        destination: d === days ? (isBangla ? `${translateDestination(dest, true).name} — প্রস্থান` : `${dest.name} — Departure`) : (isBangla ? translateDestination(dest, true).name : dest.name),
        activities,
        meals: isBangla ? ['সকালের নাস্তা (হোটেল)', 'দুপুরের খাবার (লোকাল)', 'রাতের খাবার (রেস্তোরাঁ)'] : ['Breakfast (Hotel)', 'Lunch (Local)', 'Dinner (Restaurants)'],
        accommodation: d === days ? (isBangla ? 'চেক আউট' : 'Checked out') : hotelName,
        transportInfo: localTransportLabel,
        timeline
      });
    }
    return schedule;
  };


  // ===== Auto-Detect Starting Location =====
  const handleAutoDetectLocation = () => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setDeviceCoords({ lat: latitude, lon: longitude });
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            const city = data.address.city || data.address.town || data.address.village || data.address.state || 'Dhaka';
            setTripBuilderData(p => ({ ...p, fromLocation: `${city} (${isBangla ? '\u09b6\u09a8\u09be\u0995\u09cd\u09a4' : 'Detected'})` }));
            showToast(isBangla ? `\u2713 \u09b6\u09a8\u09be\u0995\u09cd\u09a4 \u0985\u09ac\u09b8\u09cd\u09a5\u09be\u09a8: ${city}` : `\u2713 Detected Location: ${city}`);
          } catch (e) {
            setTripBuilderData(p => ({ ...p, fromLocation: `${isBangla ? '\u0986\u09ae\u09be\u09b0 \u0985\u09ac\u09b8\u09cd\u09a5\u09be\u09a8' : 'My Location'} (${latitude.toFixed(2)}, ${longitude.toFixed(2)})` }));
            showToast(isBangla ? '\u2713 \u0985\u09ac\u09b8\u09cd\u09a5\u09be\u09a8\u09c7\u09b0 \u09a8\u09bf\u09b0\u09cd\u09a6\u09c7\u09b6\u09be\u0982\u0995 \u09b6\u09a8\u09be\u0995\u09cd\u09a4 \u09b9\u09af\u09bc\u09c7\u099b\u09c7!' : '\u2713 Detected Location Coordinates!');
          }
        },
        (error) => {
          Alert.alert(
            isBangla ? '\u0985\u09ac\u09b8\u09cd\u09a5\u09be\u09a8 \u09b8\u09c1\u09ac\u09bf\u09a7\u09be \u09ac\u09a8\u09cd\u09a7' : 'Location Access Denied',
            isBangla ? '\u0986\u09aa\u09a8\u09be\u09b0 \u0985\u09ac\u09b8\u09cd\u09a5\u09be\u09a8 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf\u0964 \u09a1\u09bf\u09ab\u09b2\u09cd\u099f \u09a2\u09be\u0995\u09be \u09b8\u09c7\u099f \u0995\u09b0\u09be \u09b9\u099a\u09cd\u099b\u09c7\u0964' : 'Could not access your location. Setting default to Dhaka. Error: ' + error.message
          );
          setTripBuilderData(p => ({ ...p, fromLocation: 'Dhaka' }));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      Alert.alert(
        isBangla ? '\u09b8\u09be\u09aa\u09cb\u09b0\u09cd\u099f\u09c7\u09a1 \u09a8\u09af\u09bc' : 'Not Supported',
        isBangla ? '\u0986\u09aa\u09a8\u09be\u09b0 \u09a1\u09bf\u09ad\u09be\u0987\u09b8\u09c7 \u099c\u09bf\u0993\u09b2\u09cb\u0995\u09c7\u09b6\u09a8 \u09b8\u09be\u09aa\u09cb\u09b0\u09cd\u099f \u09a8\u09c7\u0987\u0964' : 'Geolocation is not supported by your device.'
      );
      setTripBuilderData(p => ({ ...p, fromLocation: 'Dhaka' }));
    }
  };

  // ===== Trip Generator Functions =====
  const generateTripPlan = () => {
    if (!tripBuilderData.fromLocation.trim()) {
      Alert.alert(
        isBangla ? 'ত্রুটি' : 'Error',
        isBangla ? 'অনুগ্রহ করে আপনার যাত্রা শুরুর স্থান লিখুন।' : 'Please enter where you are traveling from.'
      );
      return;
    }

    if (tripBuilderData.exploreDivision) {
      if (!tripBuilderData.selectedDivision) {
        Alert.alert(
          isBangla ? 'ত্রুটি' : 'Error',
          isBangla ? 'অনুগ্রহ করে একটি বিভাগ নির্বাচন করুন।' : 'Please select a division.'
        );
        return;
      }

      let filtered = destinations.filter(d => d.division === tripBuilderData.selectedDivision);
      if (tripBuilderData.selectedCategories.length > 0) {
        filtered = filtered.filter(d =>
          d.categories.some(cat => tripBuilderData.selectedCategories.includes(cat))
        );
      }

      if (filtered.length === 0) {
        filtered = destinations.filter(d => d.division === tripBuilderData.selectedDivision);
      }

      if (filtered.length === 0) {
        Alert.alert(
          isBangla ? 'কোনো গন্তব্য পাওয়া যায়নি' : 'No Destinations Found',
          isBangla
            ? `${translateDivision(tripBuilderData.selectedDivision, true)}-এ কোনো পর্যটন স্থান পাওয়া যায়নি।`
            : `No tourist spots available in ${tripBuilderData.selectedDivision}.`
        );
        return;
      }

      const startCoords = getCoordsForLocation(tripBuilderData.fromLocation);
      const sortedDests = sortDestinationsByDistance(startCoords, filtered);

      try {
        validateMobileTripFeasibility(sortedDests, tripBuilderData.durationDays, isBangla);
      } catch (err: any) {
        Alert.alert(isBangla ? 'অযৌক্তিক ট্যুর প্ল্যান ' : 'Improbable Tour Plan ', err.message);
        return;
      }

      generateAndShowPlan(sortedDests);
    } else {
      if (tripBuilderData.customPlaces.length === 0) {
        Alert.alert(
          isBangla ? 'ত্রুটি' : 'Error',
          isBangla ? 'অনুগ্রহ করে কমপক্ষে একটি গন্তব্য যোগ করুন।' : 'Please add at least one destination.'
        );
        return;
      }
      const startCoords = getCoordsForLocation(tripBuilderData.fromLocation);
      const sortedDests = sortDestinationsByDistance(startCoords, tripBuilderData.customPlaces);

      try {
        validateMobileTripFeasibility(sortedDests, tripBuilderData.durationDays, isBangla);
      } catch (err: any) {
        Alert.alert(isBangla ? 'অযৌক্তিক ট্যুর প্ল্যান ' : 'Improbable Tour Plan ', err.message);
        return;
      }

      generateAndShowPlan(sortedDests);
    }
  };

  const generateAndShowPlan = (selectedDestinations: Destination[]) => {
    const data = tripBuilderData;
    const travelerNum = Math.max(1, typeof data.travelers === 'number' ? data.travelers : 1);

    const durationDays = data.durationDays;
    const durationNights = data.durationNights;
    const budgetType = data.budgetType;
    const fromLocation = data.fromLocation;

    const mainDivision = selectedDestinations[0].division;
    const hotelSuggestion = getHotelSuggestion(mainDivision, budgetType);
    const roomRate = hotelSuggestion.ratePerNight;
    const roomsNeeded = Math.ceil(travelerNum / 2);
    const accommodationCost = roomRate * durationNights * roomsNeeded;

    const intercityGuide = getIntercityTransportGuide(fromLocation, mainDivision, budgetType);
    const intercityTransportCost = intercityGuide.costPerPerson * travelerNum;

    const localGuide = getLocalTransportGuide(budgetType);
    const localTransportCost = localGuide.costPerDayPerPerson * durationDays * travelerNum;
    const totalTransportCost = intercityTransportCost + localTransportCost;

    let foodCostPerDayPerPerson = 450;
    if (budgetType === 'Medium Budget') foodCostPerDayPerPerson = 1200;
    else if (budgetType === 'Premium Budget') foodCostPerDayPerPerson = 3000;
    const totalFoodCost = foodCostPerDayPerPerson * durationDays * travelerNum;

    const totalAttractionCost = selectedDestinations.reduce((sum, d) => sum + (d.localEntryFee || 0), 0) * travelerNum;

    const subtotal = accommodationCost + totalTransportCost + totalFoodCost + totalAttractionCost;
    const totalMiscCost = Math.ceil(subtotal * 0.1);

    const totalTripCost = accommodationCost + totalTransportCost + totalFoodCost + totalAttractionCost + totalMiscCost;
    const dailySchedule = buildDailySchedule(selectedDestinations, durationDays, budgetType, hotelSuggestion.name);

    let recommendedStyle = isBangla ? 'সাশ্রয়ী অভিযাত্রী' : 'Comfortable Explorer';
    if (budgetType === 'Low Budget') recommendedStyle = isBangla ? 'বাজেট ব্যাকপ্যাকার' : 'Budget Backpacker';
    else if (budgetType === 'Premium Budget') recommendedStyle = isBangla ? 'প্রিমিয়াম লাক্সারি ট্রাভেলার' : 'Premium Luxury Traveler';

    const routeExplanation = generateRouteExplanation(fromLocation, selectedDestinations, isBangla);
    const foodRecs = getFoodRecommendations(mainDivision, budgetType, selectedDestinations);

    setGeneratedTripPlan({
      id: `trip-${Date.now()}`,
      name: selectedDestinations.length === 1 ? selectedDestinations[0].name : `${selectedDestinations[0].name} & ${selectedDestinations.length - 1} more`,
      numberOfPeople: travelerNum,
      durationDays,
      durationNights,
      fromLocation,
      mainDivision,
      budgetType,
      recommendedStyle,
      destinations: selectedDestinations,
      routeExplanation,
      dailySchedule,
      intercityTransport: intercityGuide,
      localTransport: localGuide,
      foodRecommendations: foodRecs,
      hotel: hotelSuggestion,
      costs: {
        accommodation: accommodationCost,
        intercityTransport: intercityTransportCost,
        localTransport: localTransportCost,
        food: totalFoodCost,
        entryFees: totalAttractionCost,
        miscellaneous: totalMiscCost,
      },
      totalCost: totalTripCost,
    });

    setTripBuilderStep('result');
  };

  const generatePdfHtml = (booking: AppBooking) => {
    const plan = booking.tripPlan;
    if (!plan) return '';

    const bn = isBangla;
    const destinationsList = plan.destinations
      .map((d: any) => (bn ? translateDestination(d, true).name : d.name))
      .join(', ');
    
    // Day by day timeline HTML
    let itineraryHtml = '';
    plan.dailySchedule.forEach((day: any) => {
      const dayDest = translateDestinationName(day.destination, bn);
      const dayHotel = translateHotel({ name: day.accommodation, amenities: [], division: '' }, bn).name;
      const dayTransit = bn
        ? day.transportInfo
            .replace('Bus', 'বাস')
            .replace('Train', 'ট্রেন')
            .replace('Local CNG', 'সিএনজি')
            .replace('Auto', 'অটো')
            .replace('Walking', 'পায়ে হাঁটা')
            .replace('Reserved Car', 'রিজার্ভ গাড়ি')
            .replace('Private', 'প্রাইভেট কার')
        : day.transportInfo;

      itineraryHtml += `
        <div class="day-section">
          <h3>${bn ? 'দিন' : 'Day'} ${day.day}: ${dayDest}</h3>
          <p><strong>${bn ? 'রাত্রিকালীন অবস্থান:' : 'Overnight Stay:'}</strong> ${dayHotel}</p>
          <p><strong>${bn ? 'যাতায়াত মাধ্যম:' : 'Transit Mode:'}</strong> ${dayTransit}</p>
          <table class="itinerary-table">
            <thead>
              <tr>
                <th style="width: 20%;">${bn ? 'সময়' : 'Time'}</th>
                <th style="width: 80%;">${bn ? 'কার্যক্রম / পরিকল্পনা' : 'Activity / Plan'}</th>
              </tr>
            </thead>
            <tbody>
      `;
      day.timeline.forEach((timeItem: any) => {
        itineraryHtml += `
          <tr>
            <td>${translateTime(timeItem.time, bn)}</td>
            <td>${translateActivity(timeItem.activity, bn, dayHotel)}</td>
          </tr>
        `;
      });
      itineraryHtml += `
            </tbody>
          </table>
        </div>
      `;
    });

    // Attractions HTML
    let attractionsHtml = '';
    plan.destinations.forEach((dest: any) => {
      const translatedDest = bn ? translateDestination(dest, true) : dest;
      const whyVisit = getWhyVisitText(dest) || '';
      attractionsHtml += `
        <div class="attraction-card">
          <h4>${translatedDest.name} (${translateDivision(dest.division, bn)} ${bn ? 'বিভাগ' : 'Division'})</h4>
          <p>${translatedDest.description}</p>
          <p><strong>${bn ? 'কেন ভ্রমণ করবেন:' : 'Why Visit:'}</strong> ${whyVisit}</p>
          <p><strong>${bn ? 'সুপারিশকৃত সময়:' : 'Recommended Time:'}</strong> ${dest.bestTimeToVisit?.timeOfDay || (bn ? 'সকাল/বিকাল' : 'Morning/Afternoon')}</p>
          <p><strong>${bn ? 'আনুমানিক ভ্রমণ সময়কাল:' : 'Estimated Visit Duration:'}</strong> ${translatedDest.estimatedVisitDuration || (bn ? '২-৩ ঘণ্টা' : '2-3 Hours')}</p>
        </div>
      `;
    });

    // Food recommendations HTML
    const mustTry = plan.foodRecommendations?.mustTryFoods?.join(', ') || 'N/A';
    const restaurants = plan.foodRecommendations?.restaurants?.map((r: any) => `<li>${r}</li>`).join('') || '<li>N/A</li>';
    const diningNotes = plan.foodRecommendations?.diningNotes || 'N/A';

    // Cost breakdown
    const transportCost = (plan.costs?.intercityTransport || 0) + (plan.costs?.localTransport || 0);
    const hotelCost = plan.costs?.accommodation || 0;
    const foodCost = plan.costs?.food || 0;
    const attractionCost = plan.costs?.entryFees || 0;
    const miscCost = plan.costs?.miscellaneous || 0;
    
    const createdDate = booking.createdAt || new Date().toLocaleDateString();
    const translatedHotel = translateHotel(plan.hotel, bn);
    const translatedBudget = translateBudgetType(plan.budgetType, bn);
    const translatedDivision = translateDivision(plan.mainDivision, bn);
    const intercityMethod = bn
      ? plan.intercityTransport.method.replace('AC', 'এসি').replace('Non-AC', 'নন-এসি').replace('Bus', 'বাস').replace('Train', 'ট্রেন').replace('Flight', 'ফ্লাইট').replace('Private Car', 'প্রাইভেট কার')
      : plan.intercityTransport.method;
    const intercityOverview = bn
      ? plan.intercityTransport.overview.replace('Direct', 'সরাসরি').replace('AC', 'এসি').replace('Non-AC', 'নন-এসি').replace('bus', 'বাস').replace('train', 'ট্রেন').replace('flight', 'ফ্লাইট').replace('station', 'স্টেশন').replace('terminal', 'টার্মিনাল')
      : plan.intercityTransport.overview;
    const intercityTime = bn
      ? plan.intercityTransport.estimatedTime.replace('hours', 'ঘণ্টা').replace('hour', 'ঘণ্টা').replace('mins', 'মিনিট').replace('min', 'মিনিট')
      : plan.intercityTransport.estimatedTime;
    const localMode = bn
      ? plan.localTransport.mode.replace('CNG', 'সিএনজি').replace('Rickshaw', 'রিকশা').replace('Auto', 'অটো').replace('Walking', 'পায়ে হাঁটা').replace('Reserved Jeep', 'রিজার্ভ জিপ/চাঁদের গাড়ি')
      : plan.localTransport.mode;
    const localDesc = bn
      ? plan.localTransport.description.replace('CNG', 'সিএনজি').replace('Rickshaws', 'রিকশা').replace('Walking', 'পায়ে হেঁটে').replace('local boat', 'স্থানীয় নৌকা').replace('Jeep', 'জিপ/চাঁদের গাড়ি').replace('travel', 'ভ্রমণ')
      : plan.localTransport.description;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${plan.name} Travel Plan</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #333333;
            line-height: 1.5;
            margin: 0;
            padding: 20px;
          }
          .cover {
            text-align: center;
            padding: 50px 20px;
            margin-bottom: 30px;
            border-bottom: 2px solid #D98A3D;
          }
          .cover h1 {
            font-size: 32px;
            color: #0E1116;
            margin: 0;
            letter-spacing: 1px;
          }
          .cover h2 {
            font-size: 24px;
            color: #D98A3D;
            margin: 10px 0 20px 0;
          }
          .cover p {
            font-size: 14px;
            color: #777777;
          }
          .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 20px;
            color: #0E1116;
            border-left: 4px solid #D98A3D;
            padding-left: 10px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .grid {
            display: table;
            width: 100%;
            table-layout: fixed;
            margin-bottom: 20px;
          }
          .grid-row {
            display: table-row;
          }
          .grid-cell {
            display: table-cell;
            padding: 10px;
            border: 1px solid #E5E7EB;
            background-color: #F9FAFB;
          }
          .grid-cell strong {
            color: #4B5563;
            display: block;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .grid-cell span {
            font-size: 16px;
            color: #111827;
            font-weight: bold;
          }
          .day-section {
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          .day-section h3 {
            font-size: 18px;
            color: #D98A3D;
            margin-top: 0;
            margin-bottom: 8px;
            border-bottom: 1px solid #F3F4F6;
            padding-bottom: 5px;
          }
          .itinerary-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          .itinerary-table th, .itinerary-table td {
            border: 1px solid #E5E7EB;
            padding: 8px 12px;
            text-align: left;
            font-size: 14px;
          }
          .itinerary-table th {
            background-color: #F3F4F6;
            color: #4B5563;
            font-weight: bold;
          }
          .attraction-card {
            border: 1px solid #E5E7EB;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 15px;
            background-color: #FAFAFA;
            page-break-inside: avoid;
          }
          .attraction-card h4 {
            font-size: 16px;
            color: #0E1116;
            margin: 0 0 8px 0;
          }
          .attraction-card p {
            margin: 5px 0;
            font-size: 14px;
          }
          .transport-card, .hotel-card, .food-card {
            border: 1px solid #E5E7EB;
            border-radius: 6px;
            padding: 15px;
            background-color: #FAFAFA;
            margin-bottom: 15px;
            page-break-inside: avoid;
          }
          .cost-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          .cost-table th, .cost-table td {
            border: 1px solid #E5E7EB;
            padding: 10px 12px;
            font-size: 14px;
          }
          .cost-table th {
            background-color: #F3F4F6;
            color: #4B5563;
            text-align: left;
          }
          .cost-table td.amount {
            text-align: right;
            font-weight: bold;
          }
          .total-block {
            background-color: #FFFBEB;
            border: 1px solid #FEF3C7;
            border-radius: 6px;
            padding: 15px;
            margin-top: 20px;
            page-break-inside: avoid;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            margin-bottom: 5px;
          }
          .total-row.grand {
            font-size: 20px;
            font-weight: bold;
            color: #D98A3D;
            border-top: 1px dashed #FEF3C7;
            padding-top: 10px;
            margin-top: 10px;
          }
          .notes-box {
            background-color: #EFF6FF;
            border: 1px solid #DBEAFE;
            border-radius: 6px;
            padding: 15px;
            font-size: 14px;
            color: #1E40AF;
          }
        </style>
      </head>
      <body>
        <!-- 1. Cover Section -->
        <div class="cover">
          <h1>${bn ? 'ঘুরি' : 'Ghuri'}</h1>
          <h2>${plan.name} ${bn ? 'ভ্রমণ প্ল্যান' : 'Travel Plan'}</h2>
          <p><strong>${bn ? 'গন্তব্য:' : 'Destination:'}</strong> ${destinationsList}</p>
          <p><strong>${bn ? 'তৈরির তারিখ:' : 'Generated Date:'}</strong> ${createdDate}</p>
        </div>

        <!-- 2. Trip Overview -->
        <div class="section">
          <div class="section-title">${bn ? 'ট্যুর সারসংক্ষেপ' : 'Trip Overview'}</div>
          <div class="grid">
            <div class="grid-row">
              <div class="grid-cell">
                <strong>${bn ? 'গন্তব্য' : 'Destination'}</strong>
                <span>${translatedDivision} ${bn ? 'বিভাগ' : 'Division'}</span>
              </div>
              <div class="grid-cell">
                <strong>${bn ? 'ভ্রমণকারী' : 'Travelers'}</strong>
                <span>${plan.numberOfPeople} ${plan.numberOfPeople === 1 ? (bn ? 'জন' : 'Person') : (bn ? 'জন' : 'People')}</span>
              </div>
            </div>
            <div class="grid-row">
              <div class="grid-cell">
                <strong>${bn ? 'বাজেটের ধরন' : 'Budget Type'}</strong>
                <span>${translatedBudget}</span>
              </div>
              <div class="grid-cell">
                <strong>${bn ? 'সময়কাল' : 'Duration'}</strong>
                <span>${plan.durationDays} ${bn ? 'দিন' : 'Days'} / ${plan.durationNights} ${bn ? 'রাত' : 'Nights'}</span>
              </div>
            </div>
            <div class="grid-row">
              <div class="grid-cell" style="width: 100%;">
                <strong>${bn ? 'যাত্রা শুরুর স্থান' : 'Starting Location'}</strong>
                <span>${plan.fromLocation}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Day-by-Day Itinerary -->
        <div class="section">
          <div class="section-title">${bn ? 'দিনভিত্তিক ভ্রমণ সময়রেখা' : 'Day-by-Day Itinerary'}</div>
          ${itineraryHtml}
        </div>

        <!-- 4. Tourist Attractions -->
        <div class="section">
          <div class="section-title">${bn ? 'পর্যটন আকর্ষণ' : 'Tourist Attractions'}</div>
          ${attractionsHtml}
        </div>

        <!-- 5. Transportation Guide -->
        <div class="section">
          <div class="section-title">${bn ? 'পরিবহন নির্দেশিকা' : 'Transportation Guide'}</div>
          <div class="transport-card">
            <p><strong>${bn ? 'আন্তঃনগর পরিবহন:' : 'Intercity Transportation:'}</strong> ${intercityMethod}</p>
            <p>${intercityOverview}</p>
            <p><strong>${bn ? 'আনুমানিক ভ্রমণ সময়:' : 'Estimated Travel Time:'}</strong> ${intercityTime}</p>
            <p><strong>${bn ? 'আনুমানিক খরচ:' : 'Estimated Cost:'}</strong> ৳${plan.costs.intercityTransport.toLocaleString()} ${bn ? 'টাকা' : 'BDT'}</p>
            
            <p style="margin-top: 15px; margin-bottom: 5px;"><strong>${bn ? `স্থানীয় পরিবহন (${translatedDivision}):` : `Local Transportation (inside ${plan.mainDivision}):`}</strong> ${localMode}</p>
            <p>${localDesc}</p>
            <p><strong>${bn ? 'আনুমানিক দৈনিক যাতায়াত খরচ:' : 'Estimated Daily Transit Cost:'}</strong> ৳${plan.localTransport.costPerDayPerPerson} ${bn ? 'টাকা প্রতি জন' : 'BDT per person'}</p>
          </div>
        </div>

        <!-- 6. Accommodation -->
        <div class="section">
          <div class="section-title">${bn ? 'থাকার ব্যবস্থা' : 'Accommodation'}</div>
          <div class="hotel-card">
            <p><strong>${bn ? 'হোটেলের নাম:' : 'Hotel Name:'}</strong> ${translatedHotel.name}</p>
            <p><strong>${bn ? 'বাজেটের ধরন:' : 'Budget Category:'}</strong> ${translatedBudget}</p>
            <p><strong>${bn ? 'রেটিং:' : 'Rating:'}</strong>  ${plan.hotel.rating || '4.2'} / 5.0</p>
            <p><strong>${bn ? 'আনুমানিক খরচ:' : 'Estimated Cost:'}</strong> ৳${plan.costs.accommodation.toLocaleString()} ${bn ? `টাকা মোট (${plan.durationNights} রাত)` : `BDT total (for ${plan.durationNights} nights)`}</p>
          </div>
        </div>

        <!-- 7. Food Recommendations -->
        <div class="section">
          <div class="section-title">${bn ? 'খাবার সুপারিশ' : 'Food Recommendations'}</div>
          <div class="food-card">
            <p><strong>${bn ? 'অবশ্যই ট্রাই করার মতো স্থানীয় খাবার:' : 'Local Foods / Dishes to Try:'}</strong> ${mustTry}</p>
            <p style="margin-bottom: 5px;"><strong>${bn ? 'জনপ্রিয় স্থানীয় রেস্তোরাঁ:' : 'Recommended Restaurants:'}</strong></p>
            <ul style="margin-top: 5px; padding-left: 20px;">
              ${restaurants}
            </ul>
            <p><strong>${bn ? 'ডাইনিং নোট:' : 'Dining Notes:'}</strong> ${diningNotes}</p>
          </div>
        </div>

        <!-- 8. Cost Breakdown -->
        <div class="section">
          <div class="section-title">${bn ? 'খরচের বিস্তারিত' : 'Cost Breakdown'}</div>
          <table class="cost-table">
            <thead>
              <tr>
                <th>${bn ? 'খরচের ধরন' : 'Expense Category'}</th>
                <th style="text-align: right; width: 25%;">${bn ? 'পরিমাণ (টাকা)' : 'Amount (BDT)'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${bn ? 'যাতায়াত (আন্তঃনগর ও স্থানীয়)' : 'Transportation (Intercity & Local)'}</td>
                <td class="amount">৳${transportCost.toLocaleString()}</td>
              </tr>
              <tr>
                <td>${bn ? 'আবাসন (হোটেল)' : 'Accommodation (Hotel)'}</td>
                <td class="amount">৳${hotelCost.toLocaleString()}</td>
              </tr>
              <tr>
                <td>${bn ? 'খাবার ও ডাইনিং' : 'Food & Dining'}</td>
                <td class="amount">৳${foodCost.toLocaleString()}</td>
              </tr>
              <tr>
                <td>${bn ? 'আকর্ষণ প্রবেশ ফি' : 'Attractions Entry Fees'}</td>
                <td class="amount">৳${attractionCost.toLocaleString()}</td>
              </tr>
              <tr>
                <td>${bn ? 'বিবিধ ও জরুরি খরচ' : 'Miscellaneous & Contingency'}</td>
                <td class="amount">৳${miscCost.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 9. Final Budget Summary -->
        <div class="section">
          <div class="section-title">${bn ? 'বাজেট সারসংক্ষেপ' : 'Budget Summary'}</div>
          <div class="total-block">
            <div class="total-row">
              <span>${bn ? 'মোট আনুমানিক খরচ:' : 'Total Estimated Cost:'}</span>
              <strong style="color: #111827;">৳${plan.totalCost.toLocaleString()} ${bn ? 'টাকা' : 'BDT'}</strong>
            </div>
            <div class="total-row grand">
              <span>${bn ? 'জনপ্রতি খরচ:' : 'Cost Per Person:'}</span>
              <span>৳${Math.ceil(plan.totalCost / plan.numberOfPeople).toLocaleString()} ${bn ? 'টাকা' : 'BDT'}</span>
            </div>
          </div>
        </div>

        <!-- 10. Notes -->
        <div class="section">
          <div class="section-title">${bn ? 'ভ্রমণ নোট ও সুপারিশ' : 'Travel Notes & Recommendations'}</div>
          <div class="notes-box">
            <p> ${bn ? 'যথেষ্ট নগদ টাকা (টাকা) সাথে রাখুন, কারণ দূরবর্তী এলাকার অনেক দোকান ও পরিবহন ডিজিটাল পেমেন্ট গ্রহণ করে না।' : 'Make sure to carry enough physical cash (BDT), as many local shops and transport providers in remote areas do not accept digital payments or cards.'}</p>
            <p> ${bn ? 'প্রাথমিক চিকিৎসা ও প্রয়োজনীয় ওষুধ সাথে রাখুন, বিশেষ করে সাজেক ভ্যালি বা সুন্দরবনের মতো দূরবর্তী এলাকায় ভ্রমণ করলে।' : 'Carry basic first aid and essential medicines, especially if you are traveling to hill areas like Sajek Valley or deep forest zones like the Sundarbans.'}</p>
            <p> ${bn ? 'স্থানীয় রীতিনীতি ও ঐতিহ্যের প্রতি শ্রদ্ধাশীল থাকুন, বিশেষ করে ধর্মীয় স্থান বা আদিবাসী গ্রামে ভ্রমণের সময়।' : 'Respect local customs and traditions, particularly when visiting religious shrines or tribal villages.'}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleDownloadPlan = async (booking: AppBooking) => {
    try {
      const plan = booking.tripPlan;
      if (!plan) {
        Alert.alert('Error', 'No plan data found for this booking.');
        return;
      }
      
      const htmlContent = generatePdfHtml(booking);
      
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
      });
      
      await Sharing.shareAsync(uri, {
        UTI: '.pdf',
        mimeType: 'application/pdf',
        dialogTitle: isBangla ? `${plan.name} ভ্রমণ প্ল্যান ডাউনলোড` : `Download ${plan.name} Travel Plan`,
      });
      
      showToast(isBangla ? ' পিডিএফ সফলভাবে তৈরি হয়েছে!' : ' PDF generated successfully!');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      Alert.alert(
        isBangla ? 'ত্রুটি' : 'Error',
        isBangla ? 'পিডিএফ তৈরি সফল হয়নি। আবার চেষ্টা করুন।' : 'Failed to generate PDF. Please try again.'
      );
    }
  };

  const handleFollowTripPlan = () => {
    if (!generatedTripPlan) return;
    const newBooking: AppBooking = {
      id: generatedTripPlan.id,
      type: 'trip',
      name: isBangla
        ? `${generatedTripPlan.durationDays}দিন ${generatedTripPlan.durationNights}রাত প্ল্যান - ${translateDestination(generatedTripPlan.destinations[0], true).name}যাত্রা`
        : `${generatedTripPlan.durationDays}D ${generatedTripPlan.durationNights}N Plan to ${generatedTripPlan.name}`,
      detail: isBangla
        ? `হোটেল: ${translateHotel(generatedTripPlan.hotel, true).name} | বাজেট: ${translateBudgetType(generatedTripPlan.budgetType, true)}`
        : `Stay: ${generatedTripPlan.hotel.name} | Budget: ${generatedTripPlan.budgetType}`,
      image: generatedTripPlan.destinations[0]?.images?.[0] ? getImageSource(generatedTripPlan.destinations[0].images[0]) : divisionImages[generatedTripPlan.mainDivision || 'Dhaka'],
      price: `৳${generatedTripPlan.totalCost.toLocaleString()}`,
      date: isBangla ? `${generatedTripPlan.numberOfPeople} জনের জন্য সর্কৃত` : `Saved for ${generatedTripPlan.numberOfPeople} people`,
      tripPlan: generatedTripPlan,
      createdAt: new Date().toLocaleDateString(),
      status: 'Planned',
    };
    setBookings((prev) => [newBooking, ...prev]);
    showToast(isBangla ? ' ট্রিপ প্ল্যান বুকিংয়ে সংরক্ষিত হয়েছে!' : ' Trip plan saved to bookings!');
    setGeneratedTripPlan(null);
    setTripBuilderStep('form');
    setActiveTab('bookings');
  };

  const handleModifyTripPlan = () => {
    setGeneratedTripPlan(null);
    setTripBuilderStep('form');
  };

  const addCustomPlaceByDest = (dest: Destination) => {
    if (!tripBuilderData.customPlaces.some(p => p.id === dest.id)) {
      setTripBuilderData((prev) => ({
        ...prev,
        customPlaces: [...prev.customPlaces, dest],
        customPlaceInput: '',
      }));
    }
  };

  const removeCustomPlaceByDest = (destId: string) => {
    setTripBuilderData((prev) => ({
      ...prev,
      customPlaces: prev.customPlaces.filter((p) => p.id !== destId),
    }));
  };

  const toggleTripCategory = (category: Category) => {
    setTripBuilderData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  // Chat actions
  const handleSendMessage = () => {
    if (!selectedChatGuide || !chatMessage.trim()) return;
    const guideId = selectedChatGuide.id;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg = { sender: 'user' as const, text: chatMessage, time: timeString };
    const currentHist = chatHistory[guideId] || [];
    const updatedHist = [...currentHist, newMsg];

    setChatHistory(prev => ({ ...prev, [guideId]: updatedHist }));
    setChatMessage('');

    // Mock guide response after 1 second
    setTimeout(() => {
      const responses = isBangla ? [
        `আস্সালামু আলাইকুম! ${selectedChatGuide.location}-এ গাইড করতে পেরে আনন্দিত হবো। আপনার ভ্রমণের তারিখ জানান!`,
        `আস্সালামু আলাইকুম! আমি ${selectedChatGuide.specialization[0]}-এ বিশেষজ্ঞ। চলুন একটি নিরাপদ ও চমৎকার ট্যুর পরিকল্পনা করি।`,
        `হ্যালো! হ্যাঁ, আমি উপলব্ধ আছি। আপনি গাইড ট্যাব থেকে আমার সার্ভিস বুক করতে পারবেন। আপনার সাথে দেখা করতে অপেক্ষায় আছি!`,
      ] : [
        `Hi! I'd be happy to guide you in ${selectedChatGuide.location}. Let me know your travel dates!`,
        `Assalamu Alaikum! I specialize in ${selectedChatGuide.specialization[0]}. Let's plan a safe and wonderful tour.`,
        `Hello! Yes, I am available. You can book my service via the Guides tab. Looking forward to meeting you!`,
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const responseMsg = { sender: 'guide' as const, text: randomResponse, time: responseTime };

      setChatHistory(prev => ({
        ...prev,
        [guideId]: [...(prev[guideId] || []), responseMsg],
      }));
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#0E1116" />

      {/* Main Container */}
      <View style={styles.content}>

        {/* Header Title */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image 
              source={require('./ghuri-logo.png')} 
              style={{ width: 28, height: 28, marginRight: 8, resizeMode: 'contain' }} 
            />
            <Text style={styles.headerTitle}>{isBangla ? 'ঘুরি' : 'Ghuri'}</Text>
          </View>
          <Text style={styles.headerSubtitle}>{isBangla ? 'বাংলাদেশের প্রতিটি কোণ আবিষ্কার করুন' : 'Discover Every Corner of Bangladesh'}</Text>
        </View>

        {/* Dynamic Tab Switcher */}
        {activeTab === 'explore' && (
          <View style={{ flex: 1 }}>
            {exploreStep === 'divisions' && (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.heroTextContainer}>
                  <Text style={styles.sectionHeadingTitle}>{t('exploreBangladesh', isBangla)}</Text>
                  <Text style={styles.sectionDesc}>{isBangla ? 'একটি বিভাগ বেছে নিন এবং অসাধারণ গন্তব্য আবিষ্কার করুন' : 'Choose a division to discover amazing destinations'}</Text>
                </View>

                {divisions.map((division) => (
                  <TouchableOpacity
                    key={division}
                    activeOpacity={0.8}
                    style={styles.divisionCard}
                    onPress={() => {
                      setSelectedDivision(division);
                      setSelectedCategories([]);
                      setExploreStep('spots');
                    }}
                  >
                    <Image source={divisionImages[division]} style={styles.divisionImage} />
                    <View style={styles.divisionOverlay} />
                    <View style={styles.divisionContent}>
                      <View style={styles.divisionHeaderRow}>
                        <Text style={styles.divisionName}>{translateDivision(division, isBangla)}</Text>
                        <Feather name="chevron-right" size={24} color="#D98A3D" />
                      </View>
                      <Text style={styles.divisionTagline}>{translateDivisionTagline(division, isBangla, divisionTaglines[division])}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {exploreStep === 'spots' && (
              <View style={{ flex: 1 }}>
                {/* Custom Subheader */}
                <View style={styles.subHeader}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                      setExploreStep('divisions');
                      setSelectedDivision(null);
                    }}
                  >
                    <Feather name="arrow-left" size={20} color="#D98A3D" />
                    <Text style={styles.backButtonText}>{isBangla ? 'বিভাগ' : 'Divisions'}</Text>
                  </TouchableOpacity>
                  <Text style={styles.subHeaderTitle}>{isBangla ? `${translateDivision(selectedDivision!, true)} স্পট` : `${selectedDivision} Spots`}</Text>
                </View>

                {/* Category Filters Panel */}
                <View style={styles.filterContainer}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
                    {categories.map((cat) => {
                      const isSelected = selectedCategories.includes(cat);
                      return (
                        <TouchableOpacity
                          key={cat}
                          onPress={() => toggleCategory(cat)}
                          style={[
                            styles.categoryPill,
                            isSelected && styles.categoryPillActive,
                          ]}
                        >
                          <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                            {translateCategory(cat, isBangla)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>

                {/* Spots Listing */}
                <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
                  {filteredDestinations.length === 0 ? (
                    <View style={styles.emptyContainer}>
                      <Feather name="info" size={48} color="#4B5563" />
                      <Text style={styles.emptyText}>{isBangla ? 'ফিল্টারের সাথে কোনো গন্তব্য মেলেনি' : 'No destinations match the filters'}</Text>
                      <TouchableOpacity style={styles.clearFilterBtn} onPress={() => setSelectedCategories([])}>
                        <Text style={styles.clearFilterText}>{isBangla ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    filteredDestinations.map((dest) => (
                      <TouchableOpacity
                        key={dest.id}
                        activeOpacity={0.9}
                        style={styles.spotCard}
                        onPress={() => {
                          setSelectedDestination(dest);
                          setDetailImageIndex(0);
                          setExpandedDesc(false);
                          setExploreStep('detail');
                        }}
                      >
                        <Image source={getImageSource(dest.images[0])} style={styles.spotImage} />
                        <View style={styles.spotContent}>
                          <View style={styles.spotTitleRow}>
                            <Text style={styles.spotName}>{dest.name}</Text>
                            <View style={styles.ratingRow}>
                              <Feather name="star" size={14} color="#D98A3D" style={{ marginRight: 3 }} />
                              <Text style={styles.ratingText}>{dest.rating}</Text>
                            </View>
                          </View>

                          <View style={styles.tagPillContainer}>
                            {dest.categories.map((c) => (
                              <View key={c} style={styles.miniTag}>
                                <Text style={styles.miniTagText}>{translateCategory(c, isBangla)}</Text>
                              </View>
                            ))}
                          </View>

                          <View style={styles.spotFooter}>
                            <Text style={styles.spotDuration}> {isBangla ? dest.estimatedVisitDuration.replace('hours', 'ঘণ্টা').replace('hour', 'ঘণ্টা').replace('mins', 'মিনিট').replace('Full day', 'সারাদিন').replace('Half day', 'অর্ধদিন') : dest.estimatedVisitDuration}</Text>
                            <Text style={styles.spotFee}>
                              {isBangla ? 'স্থানীয় ফি:' : 'Local Fee:'} <Text style={{ color: '#D98A3D', fontWeight: 'bold' }}>৳{dest.localEntryFee}</Text>
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>
              </View>
            )}

            {exploreStep === 'detail' && selectedDestination && (
              <View style={{ flex: 1 }}>
                {/* Header Navigation */}
                <View style={styles.subHeader}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                      setExploreStep('spots');
                      setSelectedDestination(null);
                    }}
                  >
                    <Feather name="arrow-left" size={20} color="#D98A3D" />
                    <Text style={styles.backButtonText}>Spots</Text>
                  </TouchableOpacity>
                  <Text style={styles.subHeaderTitle} numberOfLines={1}>
                    {selectedDestination.name}
                  </Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailScroll}>

                  {/* Photo Slider */}
                  <View style={styles.detailImageContainer}>
                    <Image
                      source={getImageSource(selectedDestination.images[detailImageIndex])}
                      style={styles.detailImage}
                    />
                    <View style={styles.detailImageOverlay} />
                    {selectedDestination.images.length > 1 && (
                      <View style={styles.sliderPagingContainer}>
                        {selectedDestination.images.map((_, i) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => setDetailImageIndex(i)}
                            style={[
                              styles.sliderDot,
                              i === detailImageIndex && styles.sliderDotActive,
                            ]}
                          />
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Main Details Card */}
                  <View style={styles.detailInfoCard}>
                    <View style={styles.detailTitleRow}>
                      <Text style={styles.detailName}>{translateDestination(selectedDestination, isBangla).name}</Text>
                      <View style={styles.detailRatingContainer}>
                        <Feather name="star" size={16} color="#D98A3D" />
                        <Text style={styles.detailRatingValue}>{selectedDestination.rating}</Text>
                        <Text style={styles.detailReviewsCount}>({selectedDestination.reviews})</Text>
                      </View>
                    </View>

                    {/* Category Tags */}
                    <View style={styles.detailTagContainer}>
                      {selectedDestination.categories.map((cat) => (
                        <View key={cat} style={styles.detailPillTag}>
                          <Text style={styles.detailPillText}>{translateCategory(cat, isBangla)}</Text>
                        </View>
                      ))}
                    </View>

                    {/* About Section */}
                    <View style={styles.detailSection}>
                      <Text style={styles.detailSectionTitle}>{isBangla ? 'সম্পর্কে' : 'About'}</Text>
                      <Text style={styles.detailBodyText}>
                        {expandedDesc ? translateDestination(selectedDestination, isBangla).fullHistory : translateDestination(selectedDestination, isBangla).description}
                      </Text>
                      {selectedDestination.fullHistory.length > selectedDestination.description.length && (
                        <TouchableOpacity onPress={() => setExpandedDesc(!expandedDesc)} style={styles.readMoreBtn}>
                          <Text style={styles.readMoreText}>
                            {expandedDesc ? (isBangla ? 'কম দেখান ↑' : 'Show Less ↑') : (isBangla ? 'সম্পূর্ণ ইতিহাস পড়ুন ↓' : 'Read Full History ↓')}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* Visit Info Details */}
                    <View style={styles.infoCardGrid}>
                      <View style={styles.infoMiniCard}>
                        <Feather name="sun" size={18} color="#D98A3D" />
                        <Text style={styles.infoMiniTitle}>{isBangla ? 'সেরা মৌসুম' : 'Best Season'}</Text>
                        <Text style={styles.infoMiniValue}>{isBangla ? translateDestination(selectedDestination, true).bestTimeToVisit?.season || selectedDestination.bestTimeToVisit.season : selectedDestination.bestTimeToVisit.season}</Text>
                      </View>
                      <View style={styles.infoMiniCard}>
                        <Feather name="clock" size={18} color="#D98A3D" />
                        <Text style={styles.infoMiniTitle}>{isBangla ? 'খোলার সময়' : 'Opening Hours'}</Text>
                        <Text style={styles.infoMiniValue} numberOfLines={2}>{isBangla ? selectedDestination.openingHours.replace('Open', 'খোলা').replace('Daily', 'প্রতিদিন').replace('Closed', 'বন্ধ').replace('Friday', 'শুক্রবার').replace('Saturday', 'শনিবার').replace('Sunday', 'রবিবার').replace('Monday', 'সোমবার').replace('Tuesday', 'মঙ্গলবার').replace('Wednesday', 'বুধবার').replace('Thursday', 'বৃহস্পতিবার').replace('Sunrise', 'সূর্যোদয়').replace('Sunset', 'সূর্যাস্ত').replace('AM', 'পূর্বাহ্ণ').replace('PM', 'অপরাহ্ণ').replace('Always', 'সবসময়').replace('to', 'থেকে') : selectedDestination.openingHours}</Text>
                      </View>
                    </View>

                    {/* Entry Fees Details */}
                    <View style={styles.pricesCard}>
                      <Text style={styles.detailSectionTitle}>{isBangla ? 'প্রবেশ মূল্য' : 'Entrance Pricing'}</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>{isBangla ? 'স্থানীয় দর্শনার্থী' : 'Local Visitors'}</Text>
                        <Text style={styles.priceValue}>৳{selectedDestination.localEntryFee}</Text>
                      </View>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>{isBangla ? 'বিদেশি দর্শনার্থী' : 'Foreign Visitors'}</Text>
                        <Text style={styles.priceValue}>৳{selectedDestination.foreignEntryFee}</Text>
                      </View>
                    </View>

                    {/* Transport options */}
                    <View style={styles.detailSection}>
                      <Text style={styles.detailSectionTitle}>{isBangla ? 'যানবাহন রুট' : 'Transport Routes'}</Text>
                      {selectedDestination.transportOptions.map((opt, index) => (
                        <View key={index} style={styles.transportRouteItem}>
                          <View style={styles.transportHeader}>
                            <Text style={styles.transportType}>
                              {opt.type === 'Air' ? '' : opt.type === 'Bus' ? '' : opt.type === 'Train' ? '' : ''} {isBangla ? (opt.type === 'Air' ? 'বিমান' : opt.type === 'Bus' ? 'বাস' : opt.type === 'Train' ? 'ট্রেন' : 'সিএনজি/রিকশা') : opt.type}
                            </Text>
                            <Text style={styles.transportFare}>
                              ৳{opt.fareRange.min} - ৳{opt.fareRange.max}
                            </Text>
                          </View>
                          <Text style={styles.transportDesc}>{isBangla ? opt.estimatedTime.replace('hours', 'ঘণ্টা').replace('hour', 'ঘণ্টা').replace('mins', 'মিনিট').replace('min', 'মিনিট').replace('approx', 'আনুমানিক') : opt.estimatedTime}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Fair Price Guide */}
                    {selectedDestination.fairPriceGuide && selectedDestination.fairPriceGuide.length > 0 && (
                      <View style={styles.detailSection}>
                        <Text style={styles.detailSectionTitle}>{isBangla ? 'স্থানীয় ন্যায্য মূল্য তালিকা' : 'Local Fair-Price Guide'}</Text>
                        {selectedDestination.fairPriceGuide.map((item, index) => (
                          <View key={index} style={styles.fairPriceItem}>
                            <View style={styles.fairPriceHeader}>
                              <Text style={styles.fairPriceName}>{isBangla ? item.item.replace('Boat ride', 'নৌকা ভ্রমণ').replace('Entry ticket', 'প্রবেশ টিকিট').replace('Local food', 'স্থানীয় খাবার').replace('CNG', 'সিএনজি').replace('Guide', 'গাইড') : item.item}</Text>
                              <Text style={styles.fairPriceCost}>৳{item.priceRange.min}-৳{item.priceRange.max}</Text>
                            </View>
                            <Text style={styles.fairPriceDesc}>{item.description}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Nearby Hotels */}
                    {hotels.filter(h => h.division === selectedDivision).length > 0 && (
                      <View style={styles.detailSection}>
                        <Text style={styles.detailSectionTitle}>{isBangla ? 'কাছের হোটেল' : 'Nearby Hotels'}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                          {hotels
                            .filter(h => h.division === selectedDivision)
                            .map((hotel) => (
                              <View key={hotel.id} style={styles.hotelCardMini}>
                                <Image source={{ uri: hotel.images[0] }} style={styles.hotelImageMini} />
                                <View style={styles.hotelInfoMini}>
                                  <Text style={styles.hotelNameMini} numberOfLines={1}>{translateHotel(hotel, isBangla).name}</Text>
                                  <Text style={styles.hotelRatingMini}> {hotel.rating}</Text>
                                  <Text style={styles.hotelPriceMini}>৳{hotel.ratePerNight.toLocaleString()}/{isBangla ? 'রাত' : 'night'}</Text>
                                  <TouchableOpacity style={styles.hotelBookBtn} onPress={() => handleBookHotel(hotel)}>
                                    <Text style={styles.hotelBookBtnText}>{isBangla ? 'রুম বুক করুন' : 'Book Room'}</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            ))}
                        </ScrollView>
                      </View>
                    )}

                    {/* Safety Tips */}
                    <View style={styles.detailSection}>
                      <Text style={styles.detailSectionTitle}>{isBangla ? 'নিরাপত্তা ও পরামর্শ' : 'Safety & Advice'}</Text>
                      {selectedDestination.safetyTips.map((tip, index) => (
                        <View key={index} style={styles.safetyItem}>
                          <Text style={styles.safetyBullet}></Text>
                          <Text style={styles.safetyText}>{isBangla ? translateDestination(selectedDestination, true).safetyTips?.[index] || tip : tip}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Main CTA */}
                    <TouchableOpacity style={styles.mainCTAButton} onPress={() => handleBookSpot(selectedDestination)}>
                      <Text style={styles.mainCTAButtonText}>{isBangla ? 'আমার ভ্রমণ তালিকায় যোগ করুন' : 'Add to My Itinerary'}</Text>
                    </TouchableOpacity>

                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        )}

        {activeTab === 'planner' && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.sectionHeadingTitle}>{isBangla ? ' ট্যুর প্ল্যানার' : ' Trip Builder'}</Text>
              <Text style={styles.sectionDesc}>{isBangla ? 'আপনার নিজস্ব কাস্টম ভ্রমণ রুট তৈরি করুন' : 'Create your perfect custom itinerary'}</Text>
            </View>

            {tripBuilderStep === 'result' && generatedTripPlan ? (
              // RESULT VIEW
              <View style={styles.resultContainer}>
                {/* Header Back Button */}
                <TouchableOpacity style={styles.backTripBtn} onPress={handleModifyTripPlan}>
                  <Feather name="arrow-left" size={20} color="#D98A3D" />
                  <Text style={styles.backTripText}>{isBangla ? 'পরিবর্তন করুন' : 'Modify Plan'}</Text>
                </TouchableOpacity>

                {/* 1. Trip Overview */}
                <View style={styles.tripSummaryCard}>
                  <Text style={styles.tripSummaryTitle}>{isBangla ? ' ট্রিপ সারসংক্ষেপ' : ' Trip Overview'}</Text>

                  <View style={styles.overviewGrid}>
                    <View style={styles.overviewGridItem}>
                      <Text style={styles.overviewLabel}>{t('startingFrom', isBangla)}</Text>
                      <Text style={styles.overviewValue}>{generatedTripPlan.fromLocation}</Text>
                    </View>
                    <View style={styles.overviewGridItem}>
                      <Text style={styles.overviewLabel}>{t('destinationArea', isBangla)}</Text>
                      <Text style={styles.overviewValue}>
                        {translateDivision(generatedTripPlan.mainDivision, isBangla)} {isBangla ? 'বিভাগ' : 'Division'}
                      </Text>
                    </View>
                    <View style={styles.overviewGridItem}>
                      <Text style={styles.overviewLabel}>{t('duration', isBangla)}</Text>
                      <Text style={styles.overviewValue}>
                        {generatedTripPlan.durationDays} {isBangla ? 'দিন' : 'Days'} / {generatedTripPlan.durationNights} {isBangla ? 'রাত' : 'Nights'}
                      </Text>
                    </View>
                    <View style={styles.overviewGridItem}>
                      <Text style={styles.overviewLabel}>{t('travelers', isBangla)}</Text>
                      <Text style={styles.overviewValue}>{generatedTripPlan.numberOfPeople} {generatedTripPlan.numberOfPeople === 1 ? (isBangla ? 'জন' : 'Person') : (isBangla ? 'জন' : 'People')}</Text>
                    </View>
                    <View style={styles.overviewGridItem}>
                      <Text style={styles.overviewLabel}>{t('budgetTier', isBangla)}</Text>
                      <Text style={styles.overviewValue}>{translateBudgetType(generatedTripPlan.budgetType, isBangla)}</Text>
                    </View>
                    <View style={styles.overviewGridItem}>
                      <Text style={styles.overviewLabel}>{t('travelStyle', isBangla)}</Text>
                      <Text style={styles.overviewValue}>{generatedTripPlan.recommendedStyle}</Text>
                    </View>
                  </View>
                </View>

                {/* 2. Best Travel Order / Route Sequence */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('optimizedRoute', isBangla)}</Text>
                  <View style={styles.routeFlowCard}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.routeFlowContent}>
                      <Text style={styles.routeFlowStepStart}> {generatedTripPlan.fromLocation.split(' ')[0]}</Text>
                      {generatedTripPlan.destinations.map((dest, idx) => (
                        <React.Fragment key={dest.id}>
                          <Feather name="arrow-right" size={16} color="#D98A3D" style={{ marginHorizontal: 8 }} />
                          <Text style={styles.routeFlowStepDest}>{translateDestination(dest, isBangla).name}</Text>
                        </React.Fragment>
                      ))}
                    </ScrollView>
                  </View>

                  {/* Route Explanation */}
                  <View style={styles.explanationBox}>
                    <Feather name="info" size={16} color="#D98A3D" style={{ marginTop: 2, marginRight: 8 }} />
                    <Text style={styles.explanationText}>{generatedTripPlan.routeExplanation}</Text>
                  </View>
                </View>

                {/* 3. Day-by-Day Itinerary */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('completeTimeline', isBangla)}</Text>
                  {generatedTripPlan.dailySchedule.map((dayPlan) => {
                    const translatedDestName = translateDestinationName(dayPlan.destination, isBangla);
                    const translatedHotelName = translateHotel({ name: dayPlan.accommodation, amenities: [], division: '' }, isBangla).name;
                    const translatedTransit = isBangla 
                      ? dayPlan.transportInfo
                          .replace('Bus', 'বাস')
                          .replace('Train', 'ট্রেন')
                          .replace('Local CNG', 'সিএনজি')
                          .replace('Auto', 'অটো')
                          .replace('Walking', 'পায়ে হাঁটা')
                          .replace('Reserved Car', 'রিজার্ভ গাড়ি')
                          .replace('Private', 'প্রাইভেট কার')
                      : dayPlan.transportInfo;

                    return (
                      <View key={dayPlan.day} style={styles.dayItineraryCard}>
                        <View style={styles.dayItineraryHeader}>
                          <View style={styles.dayItineraryBadge}>
                            <Text style={styles.dayItineraryNumber}>{t('dayLabel', isBangla)} {isBangla ? String(dayPlan.day).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : dayPlan.day}</Text>
                          </View>
                          <Text style={styles.dayItineraryDest}>{translatedDestName}</Text>
                        </View>

                        <View style={styles.dayDetailsBox}>
                          <Text style={styles.dayDetailLabel}>{isBangla ? ' প্রধান স্পট: ' : ' Primary Spot: '}<Text style={styles.dayDetailVal}>{translatedDestName}</Text></Text>
                          <Text style={styles.dayDetailLabel}>{t('overnightStay', isBangla)} <Text style={styles.dayDetailVal}>{translatedHotelName}</Text></Text>
                          <Text style={styles.dayDetailLabel}>{t('transitMode', isBangla)} <Text style={styles.dayDetailVal}>{translatedTransit}</Text></Text>
                        </View>

                        {/* Day Activities Timeline items */}
                        <View style={styles.timelineContainer}>
                          {dayPlan.timeline.map((item, idx) => (
                            <View key={idx} style={styles.timelineItemRow}>
                              <View style={styles.timelineDotColumn}>
                                <View style={styles.timelineDot} />
                                {idx < dayPlan.timeline.length - 1 && <View style={styles.timelineLineConnector} />}
                              </View>
                              <View style={styles.timelineContentColumn}>
                                <Text style={styles.timelineTimeText}>{translateTime(item.time, isBangla)}</Text>
                                <Text style={styles.timelineActivityText}>{translateActivity(item.activity, isBangla, translatedHotelName)}</Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </View>

                {/* 4. Tourist Attractions Cards */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('featuredAttractions', isBangla)}</Text>
                  {generatedTripPlan.destinations.map((destRaw) => {
                    const dest = translateDestination(destRaw, isBangla);
                    return (
                      <View key={dest.id} style={styles.attractionCard}>
                        {dest.images && dest.images[0] && (
                          <Image source={getImageSource(destRaw.images[0])} style={styles.attractionImage} />
                        )}
                        <View style={styles.attractionBody}>
                          <Text style={styles.attractionNameText}>{dest.name}</Text>
                          <Text style={styles.attractionDivisionText}>{translateDivision(destRaw.division, isBangla)} {isBangla ? 'বিভাগ' : 'Division'}</Text>
                          <Text style={styles.attractionDescText}>{dest.description}</Text>

                          <View style={styles.whyVisitBox}>
                            <Text style={styles.whyVisitLabel}>{t('whyVisit', isBangla)}</Text>
                            <Text style={styles.whyVisitVal}>{getWhyVisitText(destRaw)}</Text>
                          </View>

                          <View style={styles.attractionFooterDetails}>
                            <View style={styles.attractionDetailCol}>
                              <Feather name="clock" size={12} color="#9CA3AF" />
                              <Text style={styles.attractionDetailValText}> {dest.estimatedVisitDuration || (isBangla ? '২-৩ ঘণ্টা' : '2-3 Hours')}</Text>
                            </View>
                            <View style={styles.attractionDetailCol}>
                              <Feather name="sun" size={12} color="#9CA3AF" />
                              <Text style={styles.attractionDetailValText}> {dest.bestTimeToVisit?.timeOfDay.split('(')[0] || (isBangla ? 'সকালে' : 'Morning')}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>

                {/* 5. Transportation Guide */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('transportationGuide', isBangla)}</Text>

                  {/* Intercity Transit */}
                  <View style={styles.transportGuideCard}>
                    <Text style={styles.transportHeading}>{t('fromStartingLocation', isBangla, { location: generatedTripPlan.fromLocation })}</Text>
                    <View style={styles.transportMethodRow}>
                      <Feather name="truck" size={16} color="#D98A3D" style={{ marginRight: 8 }} />
                      <Text style={styles.transportMethodName}>
                        {isBangla ? generatedTripPlan.intercityTransport.method.replace('AC', 'এসি').replace('Non-AC', 'নন-এসি').replace('Bus', 'বাস').replace('Train', 'ট্রেন').replace('Flight', 'ফ্লাইট').replace('Private Car', 'প্রাইভেট কার') : generatedTripPlan.intercityTransport.method}
                      </Text>
                    </View>
                    <Text style={styles.transportOverview}>
                      {isBangla ? generatedTripPlan.intercityTransport.overview.replace('Direct', 'সরাসরি').replace('AC', 'এসি').replace('Non-AC', 'নন-এসি').replace('bus', 'বাস').replace('train', 'ট্রেন').replace('flight', 'ফ্লাইট').replace('station', 'স্টেশন').replace('terminal', 'টার্মিনাল') : generatedTripPlan.intercityTransport.overview}
                    </Text>

                    <Text style={styles.transportSectionLabel}>{t('alternativeTransit', isBangla)}</Text>
                    {generatedTripPlan.intercityTransport.alternatives.map((alt, idx) => (
                      <Text key={idx} style={styles.transportBullet}>• {isBangla ? alt.replace('AC', 'এসি').replace('Non-AC', 'নন-এসি').replace('Bus', 'বাস').replace('Train', 'ট্রেন').replace('Flight', 'ফ্লাইট').replace('Car', 'কার') : alt}</Text>
                    ))}

                    <View style={styles.transportTimeBox}>
                      <Feather name="clock" size={14} color="#D98A3D" style={{ marginRight: 6 }} />
                      <Text style={styles.transportTimeText}>
                        {t('estTravelTime', isBangla)}: {isBangla ? generatedTripPlan.intercityTransport.estimatedTime.replace('hours', 'ঘণ্টা').replace('hour', 'ঘণ্টা').replace('mins', 'মিনিট').replace('min', 'মিনিট').replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.intercityTransport.estimatedTime}
                      </Text>
                    </View>
                  </View>

                  {/* Local Transit */}
                  <View style={[styles.transportGuideCard, { marginTop: 12 }]}>
                    <Text style={styles.transportHeading}>{t('localTransportInside', isBangla, { division: translateDivision(generatedTripPlan.mainDivision, isBangla) })}</Text>
                    <View style={styles.transportMethodRow}>
                      <Feather name="user" size={16} color="#D98A3D" style={{ marginRight: 8 }} />
                      <Text style={styles.transportMethodName}>
                        {isBangla ? generatedTripPlan.localTransport.mode.replace('CNG', 'সিএনজি').replace('Rickshaw', 'রিকশা').replace('Auto', 'অটো').replace('Walking', 'পায়ে হাঁটা').replace('Reserved Jeep', 'রিজার্ভ জিপ/চাঁদের গাড়ি') : generatedTripPlan.localTransport.mode}
                      </Text>
                    </View>
                    <Text style={styles.transportOverview}>
                      {isBangla ? generatedTripPlan.localTransport.description.replace('CNG', 'সিএনজি').replace('Rickshaws', 'রিকশা').replace('Walking', 'পায়ে হেঁটে').replace('local boat', 'স্থানীয় নৌকা').replace('Jeep', 'জিপ/চাঁদের গাড়ি').replace('travel', 'ভ্রমণ') : generatedTripPlan.localTransport.description}
                    </Text>
                    <Text style={styles.transportOverview}>
                      {t('estLocalCost', isBangla)} <Text style={{ color: '#D98A3D', fontWeight: 'bold' }}>৳{isBangla ? String(generatedTripPlan.localTransport.costPerDayPerPerson).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.localTransport.costPerDayPerPerson} {isBangla ? 'টাকা' : 'BDT'}</Text> {t('perPerson', isBangla)}.
                    </Text>
                  </View>
                </View>

                {/* 6. Food Recommendations */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('localFoodRecs', isBangla)}</Text>
                  <View style={styles.foodRecCard}>
                    <Text style={styles.foodSectionLabel}>{t('famousDishesTry', isBangla)}</Text>
                    <View style={styles.famousFoodsContainer}>
                      {generatedTripPlan.foodRecommendations.mustTryFoods.map((food, idx) => (
                        <View key={idx} style={styles.foodItemTag}>
                          <Text style={styles.foodItemText}>{isBangla ? (food.includes('Biryani') ? 'কাচ্চি বিরিয়ানি' : food.includes('Seafood') ? 'সামুদ্রিক মাছ ভাজা' : food.includes('Tea') ? 'রং চা / সাত রঙের চা' : food.includes('Bamboo') ? 'ব্যাম্বু চিকেন' : food.includes('Fresh') ? 'তাজা ডাবের পানি' : food) : food}</Text>
                        </View>
                      ))}
                    </View>

                    {generatedTripPlan.foodRecommendations.restaurants.length > 0 && (
                      <>
                        <Text style={[styles.foodSectionLabel, { marginTop: 12 }]}>{t('popularRestaurants', isBangla)}</Text>
                        {generatedTripPlan.foodRecommendations.restaurants.map((rest, idx) => (
                          <Text key={idx} style={styles.foodItemBullet}> {rest}</Text>
                        ))}
                      </>
                    )}

                    <View style={styles.diningNotesBox}>
                      <Text style={styles.diningNotesText}> {generatedTripPlan.foodRecommendations.diningNotes}</Text>
                    </View>
                  </View>
                </View>

                {/* 7. Accommodation Suggestions */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('accommodationSuggestions', isBangla)}</Text>
                  <View style={styles.accommodationCard}>
                    <View style={styles.accommodationHeader}>
                      <Feather name="home" size={18} color="#D98A3D" style={{ marginRight: 8 }} />
                      <Text style={styles.accommodationHotelName}>{translateHotel(generatedTripPlan.hotel, isBangla).name}</Text>
                    </View>

                    <View style={styles.hotelDetailsGrid}>
                      <View style={styles.hotelDetailItem}>
                        <Text style={styles.hotelDetailLabel}>{t('ratePerNight', isBangla)}</Text>
                        <Text style={styles.hotelDetailVal}>৳{isBangla ? generatedTripPlan.hotel.ratePerNight.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.hotel.ratePerNight.toLocaleString()} {isBangla ? 'টাকা' : 'BDT'}</Text>
                      </View>
                      <View style={styles.hotelDetailItem}>
                        <Text style={styles.hotelDetailLabel}>{t('rating', isBangla)}</Text>
                        <Text style={styles.hotelDetailVal}> {isBangla ? String(generatedTripPlan.hotel.rating || '4.2').replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : (generatedTripPlan.hotel.rating || '4.2')} / {isBangla ? '৫.০' : '5.0'}</Text>
                      </View>
                      <View style={styles.hotelDetailItem}>
                        <Text style={styles.hotelDetailLabel}>{t('suitableTraveler', isBangla)}</Text>
                        <Text style={styles.hotelDetailVal}>
                          {isBangla 
                            ? (generatedTripPlan.hotel.suitableFor === 'Solo / Couples' ? 'একক / দম্পতি' : 'পরিবার / গ্রুপ')
                            : (generatedTripPlan.hotel.suitableFor || 'Solo / Couples')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* 8. Estimated Cost Breakdown */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('detailedCosts', isBangla)}</Text>
                  <View style={styles.costBreakdownCard}>

                    {/* Intercity + Local Transport */}
                    <View style={styles.costItemRowDetailed}>
                      <View style={styles.costItemInfo}>
                        <Text style={styles.costItemHeading}> {t('transportationCost', isBangla)}</Text>
                        <Text style={styles.costItemMath}>
                          {isBangla ? 'আন্তঃনগর: ' : 'Intercity: '}৳{isBangla ? generatedTripPlan.intercityTransport.costPerPerson.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.intercityTransport.costPerPerson.toLocaleString()} x {isBangla ? String(generatedTripPlan.numberOfPeople).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.numberOfPeople} {isBangla ? 'জন = ' : 'people = '}৳{isBangla ? generatedTripPlan.costs.intercityTransport.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.costs.intercityTransport.toLocaleString()}{'\n'}
                          {isBangla ? 'স্থানীয়: ' : 'Local: '}৳{isBangla ? generatedTripPlan.localTransport.costPerDayPerPerson.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.localTransport.costPerDayPerPerson.toLocaleString()} x {isBangla ? String(generatedTripPlan.durationDays).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.durationDays} {isBangla ? 'দিন' : 'days'} x {isBangla ? String(generatedTripPlan.numberOfPeople).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.numberOfPeople} {isBangla ? 'জন = ' : 'people = '}৳{isBangla ? generatedTripPlan.costs.localTransport.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.costs.localTransport.toLocaleString()}
                        </Text>
                      </View>
                      <Text style={styles.costItemTotalValue}>৳{isBangla ? (generatedTripPlan.costs.intercityTransport + generatedTripPlan.costs.localTransport).toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : (generatedTripPlan.costs.intercityTransport + generatedTripPlan.costs.localTransport).toLocaleString()}</Text>
                    </View>

                    {/* Accommodation */}
                    <View style={styles.costItemRowDetailed}>
                      <View style={styles.costItemInfo}>
                        <Text style={styles.costItemHeading}> {t('accommodationCost', isBangla)}</Text>
                        <Text style={styles.costItemMath}>
                          ৳{isBangla ? generatedTripPlan.hotel.ratePerNight.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.hotel.ratePerNight.toLocaleString()} {isBangla ? 'টাকা প্রতি রুম' : 'BDT per room'} x {isBangla ? String(generatedTripPlan.durationNights).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.durationNights} {isBangla ? 'রাত' : 'nights'} x {isBangla ? String(Math.ceil(generatedTripPlan.numberOfPeople / 2)).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : Math.ceil(generatedTripPlan.numberOfPeople / 2)} {isBangla ? 'টি রুম' : 'room(s)'}
                        </Text>
                      </View>
                      <Text style={styles.costItemTotalValue}>৳{isBangla ? generatedTripPlan.costs.accommodation.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.costs.accommodation.toLocaleString()}</Text>
                    </View>

                    {/* Food */}
                    <View style={styles.costItemRowDetailed}>
                      <View style={styles.costItemInfo}>
                        <Text style={styles.costItemHeading}> {t('foodDiningCost', isBangla)}</Text>
                        <Text style={styles.costItemMath}>
                          {isBangla ? 'দৈনিক গড়' : 'Daily Average'} x {isBangla ? String(generatedTripPlan.durationDays).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.durationDays} {isBangla ? 'দিন' : 'days'} x {isBangla ? String(generatedTripPlan.numberOfPeople).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.numberOfPeople} {isBangla ? 'জন' : 'people'}
                        </Text>
                      </View>
                      <Text style={styles.costItemTotalValue}>৳{isBangla ? generatedTripPlan.costs.food.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.costs.food.toLocaleString()}</Text>
                    </View>

                    {/* Attraction Entry Fees */}
                    <View style={styles.costItemRowDetailed}>
                      <View style={styles.costItemInfo}>
                        <Text style={styles.costItemHeading}> {t('entranceCost', isBangla)}</Text>
                        <Text style={styles.costItemMath}>
                          {isBangla ? 'প্রবেশ ফি সমষ্টি' : 'Entry Fees sum'} x {isBangla ? String(generatedTripPlan.numberOfPeople).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.numberOfPeople} {isBangla ? 'জন' : 'people'}
                        </Text>
                      </View>
                      <Text style={styles.costItemTotalValue}>৳{isBangla ? generatedTripPlan.costs.entryFees.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.costs.entryFees.toLocaleString()}</Text>
                    </View>

                    {/* Miscellaneous */}
                    <View style={styles.costItemRowDetailed}>
                      <View style={styles.costItemInfo}>
                        <Text style={styles.costItemHeading}> {t('miscContingency', isBangla)}</Text>
                        <Text style={styles.costItemMath}>
                          {isBangla ? 'জরুরি/টিপস এর জন্য সাবটোটালের প্রায় ১০%' : '~10% of subtotal for emergency/tips'}
                        </Text>
                      </View>
                      <Text style={styles.costItemTotalValue}>৳{isBangla ? generatedTripPlan.costs.miscellaneous.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.costs.miscellaneous.toLocaleString()}</Text>
                    </View>

                    <View style={styles.costDivider} />

                    {/* 9. Final Cost Summary */}
                    <View style={styles.finalCostSummaryBlock}>
                      <View style={styles.costSummaryRow}>
                        <Text style={styles.costSummaryLabel}>{t('totalTripCost', isBangla)}</Text>
                        <Text style={styles.costSummaryValueTotal}>৳{isBangla ? generatedTripPlan.totalCost.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : generatedTripPlan.totalCost.toLocaleString()} {isBangla ? 'টাকা' : 'BDT'}</Text>
                      </View>
                      <View style={styles.costSummaryRow}>
                        <Text style={styles.costSummaryLabel}>{t('costPerPerson', isBangla)}</Text>
                        <Text style={styles.costSummaryValuePerPerson}>৳{isBangla ? Math.ceil(generatedTripPlan.totalCost / generatedTripPlan.numberOfPeople).toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : Math.ceil(generatedTripPlan.totalCost / generatedTripPlan.numberOfPeople).toLocaleString()} {isBangla ? 'টাকা' : 'BDT'}</Text>
                      </View>
                      <View style={styles.costSummaryRow}>
                        <Text style={styles.costSummaryLabel}>{t('classification', isBangla)}</Text>
                        <Text style={styles.costSummaryBudgetTag}>{translateBudgetType(generatedTripPlan.budgetType, isBangla)}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Final Booking Actions */}
                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity style={[styles.primaryButton, { marginRight: 8, flex: 1 }]} onPress={handleFollowTripPlan}>
                    <Feather name="check-circle" size={18} color="#FFF" style={{ marginRight: 6 }} />
                    <Text style={styles.primaryButtonText}>{isBangla ? 'প্ল্যান অনুসরণ করুন' : 'Follow Plan'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.secondaryButton, { flex: 1 }]} onPress={handleModifyTripPlan}>
                    <Feather name="edit" size={18} color="#D98A3D" style={{ marginRight: 6 }} />
                    <Text style={styles.secondaryButtonText}>{isBangla ? 'রুট পরিবর্তন করুন' : 'Modify Plan'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // FORM VIEW
              <View style={styles.plannerForm}>
                {/* 1. Number of Travelers */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>{isBangla ? ' ভ্রমণকারী সংখ্যা' : ' Number of Travelers'}</Text>
                  <View style={styles.numberInputGroup}>
                    <TouchableOpacity
                      style={[styles.numberBtn, tripBuilderData.travelers <= 1 && styles.numberBtnDisabled]}
                      onPress={() => setTripBuilderData(p => ({ ...p, travelers: Math.max(1, p.travelers - 1) }))}
                      disabled={tripBuilderData.travelers <= 1}
                    >
                      <Text style={styles.numberBtnText}>−</Text>
                    </TouchableOpacity>
                    <View style={styles.travelerValueBox}>
                      <TextInput
                        style={styles.travelerInputInline}
                        value={tripBuilderData.travelers === 0 ? '' : String(tripBuilderData.travelers)}
                        onChangeText={(text) => {
                          const clean = text.replace(/[^0-9]/g, '');
                          if (clean === '') { setTripBuilderData(p => ({ ...p, travelers: 0 })); return; }
                          const n = parseInt(clean, 10);
                          setTripBuilderData(p => ({ ...p, travelers: isNaN(n) ? 0 : Math.min(20, n) }));
                        }}
                        onBlur={() => { if (tripBuilderData.travelers < 1) setTripBuilderData(p => ({ ...p, travelers: 1 })); }}
                        keyboardType="number-pad"
                        maxLength={2}
                        placeholderTextColor="#4B5563"
                      />
                      <Text style={styles.durationValueText}>
                        {isBangla ? 'জন' : (tripBuilderData.travelers === 1 ? 'Person' : 'People')}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.numberBtn, tripBuilderData.travelers >= 20 && styles.numberBtnDisabled]}
                      onPress={() => setTripBuilderData(p => ({ ...p, travelers: Math.min(20, p.travelers + 1) }))}
                      disabled={tripBuilderData.travelers >= 20}
                    >
                      <Text style={styles.numberBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 2. Trip Duration */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>{isBangla ? ' ভ্রমণের সময়কাল' : ' Trip Duration'}</Text>
                  <View style={styles.durationRowContainer}>
                    <View style={styles.durationCounterCol}>
                      <Text style={styles.durationCounterLabel}>{isBangla ? 'দিন' : 'Days'}</Text>
                      <View style={styles.numberInputGroup}>
                        <TouchableOpacity
                          style={styles.numberBtn}
                          onPress={() => setTripBuilderData(p => {
                            const newDays = Math.max(1, p.durationDays - 1);
                            const newNights = Math.max(0, Math.min(p.durationNights, newDays - 1));
                            return { ...p, durationDays: newDays, durationNights: newNights };
                          })}
                        >
                          <Text style={styles.numberBtnText}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.durationValueText}>{tripBuilderData.durationDays} {isBangla ? 'দিন' : 'Days'}</Text>
                        <TouchableOpacity
                          style={styles.numberBtn}
                          onPress={() => setTripBuilderData(p => {
                            const newDays = p.durationDays + 1;
                            const newNights = Math.max(p.durationNights, newDays - 1);
                            return { ...p, durationDays: newDays, durationNights: newNights };
                          })}
                        >
                          <Text style={styles.numberBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.durationCounterCol}>
                      <Text style={styles.durationCounterLabel}>{isBangla ? 'রাত' : 'Nights'}</Text>
                      <View style={styles.numberInputGroup}>
                        <TouchableOpacity
                          style={styles.numberBtn}
                          onPress={() => setTripBuilderData(p => ({ ...p, durationNights: Math.max(0, p.durationNights - 1) }))}
                        >
                          <Text style={styles.numberBtnText}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.durationValueText}>{tripBuilderData.durationNights} {isBangla ? 'রাত' : 'Nights'}</Text>
                        <TouchableOpacity
                          style={styles.numberBtn}
                          onPress={() => setTripBuilderData(p => ({ ...p, durationNights: p.durationNights + 1 }))}
                        >
                          <Text style={styles.numberBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

                {/* 3. Budget Type */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>{isBangla ? ' বাজেটের ধরন' : ' Budget Type'}</Text>
                  <View style={styles.budgetSelectRow}>
                    {['Low Budget', 'Medium Budget', 'Premium Budget'].map((bType) => {
                      const isActive = tripBuilderData.budgetType === bType;
                      let budgetDesc = '';
                      if (bType === 'Low Budget') budgetDesc = isBangla ? 'সবচেয়ে কম খরচ, স্থানীয় খাবার ও সাধারণ হোটেল' : 'Cheapest travel, local food, budget hotels';
                      else if (bType === 'Medium Budget') budgetDesc = isBangla ? 'এসি কোচ, মাঝারি মানের হোটেল, জনপ্রিয় ডাইনিং' : 'AC coaches, mid-range hotels, popular dining';
                      else budgetDesc = isBangla ? 'ফ্লাইট/প্রাইভেট কার, প্রিমিয়াম রিসোর্ট, ফাইন ডাইনিং' : 'Flights/Private cars, premium resorts, fine dining';

                      return (
                        <TouchableOpacity
                          key={bType}
                          style={[styles.budgetOptionCard, isActive && styles.budgetOptionCardActive]}
                          onPress={() => setTripBuilderData(p => ({ ...p, budgetType: bType as any }))}
                        >
                          <Text style={[styles.budgetOptionTitle, isActive && styles.budgetOptionTitleActive]}>
                            {bType === 'Low Budget' ? (isBangla ? ' কম' : ' Low') : bType === 'Medium Budget' ? (isBangla ? ' মাঝারি' : ' Medium') : (isBangla ? ' প্রিমিয়াম' : ' Premium')}
                          </Text>
                          <Text style={[styles.budgetOptionDesc, isActive && styles.budgetOptionDescActive]}>
                            {budgetDesc}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* 4. Starting Location */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>{isBangla ? ' যাত্রা শুরুর স্থান' : ' Starting Location'}</Text>
                  <View style={styles.startLocationRow}>
                    <TextInput
                      style={[styles.textInput, { flex: 1, height: 44, marginVertical: 0 }]}
                      placeholder={isBangla ? 'যেমন: ঢাকা, বিমানবন্দর, সিলেট, হোটেলের নাম' : "e.g. Dhaka, Airport, Sylhet, Hotel Name"}
                      placeholderTextColor="#4B5563"
                      value={tripBuilderData.fromLocation}
                      onChangeText={(val) => setTripBuilderData(p => ({ ...p, fromLocation: val }))}
                    />
                    <TouchableOpacity style={styles.detectBtn} onPress={handleAutoDetectLocation}>
                      <Feather name="navigation" size={14} color="#0E1116" style={{ marginRight: 4 }} />
                      <Text style={styles.detectBtnText}>{t('autoDetectBtn', isBangla)}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Explore Division Toggle */}
                <View style={styles.formGroup}>
                  <View style={styles.toggleHeader}>
                    <Text style={styles.inputLabel}>{isBangla ? ' বিভাগ অন্বেষণ' : ' Explore Division'}</Text>
                    <TouchableOpacity
                      style={[styles.toggleSwitch, tripBuilderData.exploreDivision && styles.toggleSwitchActive]}
                      onPress={() => setTripBuilderData(p => ({ ...p, exploreDivision: !p.exploreDivision }))}
                    >
                      <View style={[styles.toggleThumb, tripBuilderData.exploreDivision && styles.toggleThumbActive]} />
                    </TouchableOpacity>
                  </View>

                  {tripBuilderData.exploreDivision ? (
                    <>
                      {/* Division Selection */}
                      <Text style={styles.subLabel}>{isBangla ? 'বিভাগ নির্বাচন করুন' : 'Select Division'}</Text>
                      <View style={styles.selectGrid}>
                        {divisions.map((div) => (
                          <TouchableOpacity
                            key={div}
                            style={[styles.gridBtn, tripBuilderData.selectedDivision === div && styles.gridBtnActive]}
                            onPress={() => setTripBuilderData(p => ({ ...p, selectedDivision: div }))}
                          >
                            <Text style={[styles.gridBtnText, tripBuilderData.selectedDivision === div && styles.gridBtnTextActive]}>
                              {translateDivision(div, isBangla)}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                      {/* Categories Selection */}
                      <View style={styles.formGroup}>
                        <Text style={styles.subLabel}>{isBangla ? 'ক্যাটাগরি নির্বাচন করুন (ঐচ্ছিক)' : 'Select Categories'}</Text>
                        <View style={styles.selectGrid}>
                          {categories.map((cat) => (
                            <TouchableOpacity
                              key={cat}
                              style={[styles.gridBtn, tripBuilderData.selectedCategories.includes(cat) && styles.gridBtnActive]}
                              onPress={() => toggleTripCategory(cat)}
                            >
                              <Text style={[styles.gridBtnText, tripBuilderData.selectedCategories.includes(cat) && styles.gridBtnTextActive]}>
                                {translateCategory(cat, isBangla)}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    </>
                  ) : (
                    <>
                      {/* Custom Places Autocomplete Search */}
                      <View style={styles.formGroup}>
                        <Text style={styles.subLabel}>{isBangla ? 'গন্তব্য অনুসন্ধান করুন এবং যুক্ত করুন' : 'Search and Add Destinations'}</Text>
                        <View style={styles.placeInputRow}>
                          <TextInput
                            style={[styles.textInput, { flex: 1 }]}
                            placeholder={isBangla ? 'একটি গন্তব্যের নাম লিখুন (যেমন: সাজেক, কক্সবাজার, কুয়াকাটা)...' : "Type a destination (e.g. Sajek, Cox's Bazar, Kuakata)..."}
                            placeholderTextColor="#4B5563"
                            value={placeSearchQuery}
                            onChangeText={setPlaceSearchQuery}
                          />
                        </View>

                        {/* Search Suggestions list */}
                        {placeSearchQuery.trim().length > 0 && (
                          <View style={styles.suggestionsDropdown}>
                            {destinations
                              .filter(d => {
                                const queryLower = placeSearchQuery.toLowerCase();
                                const engMatch = d.name.toLowerCase().includes(queryLower);
                                const bnName = translateDestination(d, true).name;
                                const bnMatch = bnName.includes(placeSearchQuery);
                                return (engMatch || bnMatch) &&
                                !tripBuilderData.customPlaces.some(cp => cp.id === d.id)
                              })
                              .slice(0, 5)
                              .map((destRaw) => {
                                const dest = translateDestination(destRaw, isBangla);
                                return (
                                  <TouchableOpacity
                                    key={dest.id}
                                    style={styles.suggestionItem}
                                    onPress={() => {
                                      addCustomPlaceByDest(destRaw);
                                      setPlaceSearchQuery('');
                                    }}
                                  >
                                    <Feather name="plus-circle" size={16} color="#D98A3D" style={{ marginRight: 8 }} />
                                    <View>
                                      <Text style={styles.suggestionName}>{dest.name}</Text>
                                      <Text style={styles.suggestionDivision}>{translateDivision(dest.division, isBangla)} {isBangla ? 'বিভাগ' : 'Division'}</Text>
                                    </View>
                                  </TouchableOpacity>
                                );
                              })
                            }
                            {destinations.filter(d => {
                              const queryLower = placeSearchQuery.toLowerCase();
                              const engMatch = d.name.toLowerCase().includes(queryLower);
                              const bnName = translateDestination(d, true).name;
                              const bnMatch = bnName.includes(placeSearchQuery);
                              return (engMatch || bnMatch) && !tripBuilderData.customPlaces.some(cp => cp.id === d.id);
                            }).length === 0 && (
                                <Text style={styles.noSuggestionsText}>{isBangla ? 'কোনো অমিল গন্তব্য পাওয়া যায়নি' : 'No matching unadded destinations found'}</Text>
                              )}
                          </View>
                        )}

                        {/* Display added places */}
                        {tripBuilderData.customPlaces.length > 0 && (
                          <View style={{ marginTop: 12 }}>
                            <Text style={styles.routeOrderLabel}>{isBangla ? 'ভ্রমণ রুট (রুট ম্যাপ তৈরির পর অপ্টিমাইজড হবে):' : 'Trip Route (optimized on generation):'}</Text>
                            <View style={styles.placesContainer}>
                              {tripBuilderData.customPlaces.map((destRaw, idx) => {
                                const dest = translateDestination(destRaw, isBangla);
                                return (
                                  <View key={dest.id} style={styles.placeTag}>
                                    <Text style={styles.placeTagText}>{idx + 1}. {dest.name}</Text>
                                    <TouchableOpacity onPress={() => removeCustomPlaceByDest(dest.id)}>
                                      <Feather name="x" size={14} color="#9CA3AF" />
                                    </TouchableOpacity>
                                  </View>
                                );
                              })}
                            </View>
                          </View>
                        )}
                      </View>
                    </>
                  )}
                </View>

                {/* Generate Button */}
                <TouchableOpacity style={styles.generateButton} onPress={generateTripPlan}>
                  <Feather name="zap" size={20} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.generateButtonText}>{isBangla ? 'রুট ম্যাপ তৈরি করুন' : 'Generate Tour'}</Text>
                </TouchableOpacity>

                {/* Features */}
                <View style={styles.featuresPreviewList}>
                  <Text style={styles.previewHeading}>{isBangla ? ' যা অন্তর্ভুক্ত রয়েছে:' : " What's Included:"}</Text>
                  {[
                    isBangla ? 'বহু-গন্তব্য রুট ম্যাপ' : 'Multi-destination routing',
                    isBangla ? 'আবাসন ও হোটেল সুপারিশ' : 'Accommodation suggestions',
                    isBangla ? 'দিন-ভিত্তিক ভ্রমণ পরিকল্পনা' : 'Day-by-day activities',
                    isBangla ? 'সম্পূর্ণ খরচের হিসাব' : 'Complete cost breakdown',
                    isBangla ? 'যাতায়াত ও পরিবহন গাইড' : 'Transport options',
                    isBangla ? 'স্থানীয় খাবার ও রেস্তোরাঁ' : 'Local dining recommendations'
                  ].map((feature, idx) => (
                    <View key={idx} style={styles.featureItemRow}>
                      <Feather name="check" size={16} color="#D98A3D" />
                      <Text style={styles.featureItemText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        )}

        {activeTab === 'guides' && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.sectionHeadingTitle}>{isBangla ? 'গাইড মার্কেটপ্লেস' : 'Guide Marketplace'}</Text>
              <Text style={styles.sectionDesc}>{isBangla ? 'এজেন্সি খুঁজুন, গাইড তুলনা করুন এবং প্রিমিয়াম স্থানীয় সহায়তা বুক করুন।' : 'Search agencies, compare guides, and book premium local support.'}</Text>
            </View>

            {guideBookingSuccess ? (
              <View style={{ marginHorizontal: 16, marginBottom: 12, backgroundColor: 'rgba(22, 163, 74, 0.12)', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(22, 163, 74, 0.35)' }}>
                <Text style={{ color: '#4ADE80', fontWeight: '700' }}>{guideBookingSuccess}</Text>
              </View>
            ) : null}

            {guideBookingError ? (
              <View style={{ marginHorizontal: 16, marginBottom: 12, backgroundColor: 'rgba(239, 68, 68, 0.12)', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.35)' }}>
                <Text style={{ color: '#FCA5A5', fontWeight: '700' }}>{guideBookingError}</Text>
              </View>
            ) : null}

            {guideViewMode === 'list' && (
              <>
                <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
                  <TextInput
                    value={guideSearchQuery}
                    onChangeText={setGuideSearchQuery}
                    placeholder={isBangla ? 'গন্তব্য বা পর্যটন স্থান খুঁজুন...' : 'Search destination or tourist place...'}
                    placeholderTextColor="#6B7280"
                    style={styles.modalInput}
                  />
                </View>

                <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
                  <Text style={styles.specLabel}>{isBangla ? 'বিভাগ অনুসারে দেখুন' : 'Browse by division'}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                    {['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh'].map((division) => {
                      const active = guideDivisionFilter === division;
                      return (
                        <TouchableOpacity key={division} onPress={() => setGuideDivisionFilter(active ? null : division)} style={{ borderRadius: 999, borderWidth: 1, borderColor: active ? '#D98A3D' : 'rgba(255,255,255,0.12)', backgroundColor: active ? 'rgba(217,138,61,0.12)' : '#0E1116', paddingHorizontal: 10, paddingVertical: 7 }}>
                          <Text style={{ fontSize: 11, color: active ? '#D98A3D' : '#F2F2F0', fontWeight: '700' }}>{translateDivision(division, isBangla)}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {filteredGuideAgencies.map((agencyRaw) => {
                  const agency = translateGuideAgency(agencyRaw, isBangla);
                  return (
                  <View key={agencyRaw.id} style={styles.guideCard}>
                    <View style={styles.guideHeaderRow}>
                      <Image source={{ uri: agencyRaw.logo }} style={styles.guidePhoto} />
                      <View style={styles.guideHeaderInfo}>
                        <Text style={styles.guideName}>{agency.name}</Text>
                        <Text style={styles.guideReviewsText}>{agency.shortDescription}</Text>
                        <View style={styles.guideStatsRow}>
                          <Text style={styles.guideRatingText}> {agencyRaw.rating}</Text>
                          <Text style={styles.guideReviewsText}>({isBangla ? String(agencyRaw.reviewCount).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : agencyRaw.reviewCount} {isBangla ? 'রিভিউ' : 'reviews'})</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.guideBioBox}>
                      <Text style={styles.guideBioText}>{agency.fullDescription}</Text>
                      <View style={styles.guideLangsContainer}>
                        {agencyRaw.coveredDestinations.slice(0, 4).map((destination) => (
                          <View key={destination} style={styles.guideLangTag}>
                            <Text style={styles.guideLangText}>{destination}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    <View style={styles.guidePriceRow}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="map-pin" size={14} color="#9CA3AF" />
                        <Text style={styles.guideLocationText}> {translateDivision(agencyRaw.division, isBangla)}</Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 10, color: '#9CA3AF' }}>{isBangla ? 'শুরু থেকে' : 'Starting from'}</Text>
                        <Text style={styles.guidePriceVal}>৳{isBangla ? agencyRaw.startingPrice.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : agencyRaw.startingPrice.toLocaleString()}</Text>
                      </View>
                    </View>

                    <View style={styles.guideCardActions}>
                      <TouchableOpacity style={styles.guideBookBtn} onPress={() => openGuideAgency(agencyRaw)}>
                        <Text style={styles.guideBookBtnText}>{isBangla ? 'বিস্তারিত দেখুন' : 'View Details'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.guideMsgBtn} onPress={() => setSelectedChatGuide({ id: agencyRaw.id, name: agencyRaw.name, photo: agencyRaw.logo, rating: agencyRaw.rating, reviews: agencyRaw.reviewCount, yearsOfExperience: agencyRaw.startingPrice, languages: ['Bengali', 'English'], specialization: ['Local Support'], bio: agencyRaw.fullDescription, location: agencyRaw.division, pricePerDay: agencyRaw.startingPrice } as TourGuide)}>
                        <Feather name="message-square" size={16} color="#D98A3D" style={{ marginRight: 6 }} />
                        <Text style={styles.guideMsgBtnText}>{isBangla ? 'বার্তা পাঠান' : 'Message'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  );
                })}
              </>
            )}

            {guideViewMode === 'agency' && selectedGuideAgency && (
              <>
                <TouchableOpacity onPress={resetGuideFlow} style={{ marginHorizontal: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="arrow-left" size={16} color="#D98A3D" />
                  <Text style={{ color: '#D98A3D', fontWeight: '700', marginLeft: 6 }}>{t('backToAgencies', isBangla)}</Text>
                </TouchableOpacity>

                <View style={styles.guideCard}>
                  {(() => {
                    const agTrans = translateGuideAgency(selectedGuideAgency, isBangla);
                    return (
                      <>
                        <View style={styles.guideHeaderRow}>
                          <Image source={{ uri: selectedGuideAgency.logo }} style={styles.guidePhoto} />
                          <View style={styles.guideHeaderInfo}>
                            <Text style={styles.guideName}>{agTrans.name}</Text>
                            <Text style={styles.guideReviewsText}>{agTrans.fullDescription}</Text>
                            <View style={styles.guideStatsRow}>
                              <Text style={styles.guideRatingText}> {selectedGuideAgency.rating}</Text>
                              <Text style={styles.guideReviewsText}>({isBangla ? String(selectedGuideAgency.reviewCount).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedGuideAgency.reviewCount} {isBangla ? 'রিভিউ' : 'reviews'})</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.guideBioBox}>
                          <Text style={styles.guideBioText}>{t('divisionLabel', isBangla)} {translateDivision(selectedGuideAgency.division, isBangla)}</Text>
                          <Text style={styles.guideBioText}>{t('coveredDestinations', isBangla)} {selectedGuideAgency.coveredDestinations.join(', ')}</Text>
                          <Text style={styles.guideBioText}>{t('startingPrice', isBangla)} ৳{isBangla ? selectedGuideAgency.startingPrice.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedGuideAgency.startingPrice.toLocaleString()}</Text>
                        </View>
                      </>
                    );
                  })()}
                </View>

                {selectedGuideAgency.guides.map((guideRaw) => {
                  const guide = translateTourGuide(guideRaw, isBangla);
                  return (
                  <View key={guideRaw.id} style={styles.guideCard}>
                    <View style={styles.guideHeaderRow}>
                      <Image source={{ uri: guideRaw.photo }} style={styles.guidePhoto} />
                      <View style={styles.guideHeaderInfo}>
                        <Text style={styles.guideName}>{guide.name}</Text>
                        <View style={styles.guideStatsRow}>
                          <Text style={styles.guideRatingText}> {guideRaw.rating}</Text>
                          <Text style={styles.guideReviewsText}>({isBangla ? String(guideRaw.reviewCount).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : guideRaw.reviewCount} {isBangla ? 'রিভিউ' : 'reviews'})</Text>
                        </View>
                        <Text style={styles.guideExperienceText}>{isBangla ? (guideRaw.status === 'Available' ? 'উপলব্ধ' : 'অনুপলব্ধ') : guideRaw.status}</Text>
                      </View>
                    </View>

                    <View style={styles.guideBioBox}>
                      <Text style={styles.guideBioText}>{guide.bio}</Text>
                      <View style={styles.guideLangsContainer}>
                        {guideRaw.specialization.map((item) => (
                          <View key={item} style={styles.specTag}>
                            <Text style={styles.specTagText}>{translateSpecialty(item, isBangla)}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    <View style={styles.guidePriceRow}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="map-pin" size={14} color="#9CA3AF" />
                        <Text style={styles.guideLocationText}> {translateDivision(guideRaw.division, isBangla)}</Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 10, color: '#9CA3AF' }}>{t('guideFee', isBangla)}</Text>
                        <Text style={styles.guidePriceVal}>৳{isBangla ? guideRaw.fee.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : guideRaw.fee.toLocaleString()}/{isBangla ? 'দিন' : 'day'}</Text>
                      </View>
                    </View>

                    <View style={styles.guideCardActions}>
                      <TouchableOpacity style={styles.guideBookBtn} onPress={() => openGuideProfile(guideRaw)}>
                        <Text style={styles.guideBookBtnText}>{t('viewProfile', isBangla)}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.guideMsgBtn} onPress={() => openGuideBooking(guideRaw)} disabled={guideRaw.status !== 'Available'}>
                        <Text style={styles.guideMsgBtnText}>{guideRaw.status === 'Available' ? t('bookAppointment', isBangla) : t('unavailable', isBangla)}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  );
                })}
              </>
            )}

            {guideViewMode === 'guide' && selectedGuideProfile && (
              <>
                <TouchableOpacity onPress={() => setGuideViewMode('agency')} style={{ marginHorizontal: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="arrow-left" size={16} color="#D98A3D" />
                  <Text style={{ color: '#D98A3D', fontWeight: '700', marginLeft: 6 }}>{t('backToGuides', isBangla)}</Text>
                </TouchableOpacity>

                <View style={styles.guideCard}>
                  {(() => {
                    const gp = translateTourGuide(selectedGuideProfile, isBangla);
                    return (
                      <>
                        <View style={styles.guideHeaderRow}>
                          <Image source={{ uri: selectedGuideProfile.photo }} style={styles.guidePhoto} />
                          <View style={styles.guideHeaderInfo}>
                            <Text style={styles.guideName}>{gp.name}</Text>
                            <View style={styles.guideStatsRow}>
                              <Text style={styles.guideRatingText}> {selectedGuideProfile.rating}</Text>
                              <Text style={styles.guideReviewsText}>({isBangla ? String(selectedGuideProfile.reviewCount).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedGuideProfile.reviewCount} {isBangla ? 'রিভিউ' : 'reviews'})</Text>
                            </View>
                            <Text style={styles.guideExperienceText}>{isBangla ? String(selectedGuideProfile.yearsOfExperience).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedGuideProfile.yearsOfExperience} {isBangla ? 'বছরের অভিজ্ঞতা' : 'years experience'}</Text>
                          </View>
                        </View>

                        <View style={styles.guideBioBox}>
                          <Text style={styles.guideBioText}>{t('ageLabel', isBangla)} {isBangla ? String(selectedGuideProfile.age).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedGuideProfile.age}</Text>
                          <Text style={styles.guideBioText}>{t('languagesLabel', isBangla)} {selectedGuideProfile.languages.map(l => isBangla ? (l === 'Bengali' || l === 'Bangla' ? 'বাংলা' : l === 'English' ? 'ইংরেজি' : l === 'Hindi' ? 'হিন্দি' : l) : l).join(', ')}</Text>
                          <Text style={styles.guideBioText}>{t('specializationsLabel', isBangla)} {selectedGuideProfile.specialization.map(s => translateSpecialty(s, isBangla)).join(', ')}</Text>
                          <Text style={styles.guideBioText}>{t('popularDestinations', isBangla)} {selectedGuideProfile.popularDestinations.join(', ')}</Text>
                          <Text style={styles.guideBioText}>{t('safetyTraining', isBangla)} {selectedGuideProfile.safetyTraining.map(s => translateSpecialty(s, isBangla)).join(', ')}</Text>
                        </View>

                        <View style={styles.guidePriceRow}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="map-pin" size={14} color="#9CA3AF" />
                            <Text style={styles.guideLocationText}> {translateDivision(selectedGuideProfile.division, isBangla)}</Text>
                          </View>
                          <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 10, color: '#9CA3AF' }}>{t('guideFee', isBangla)}</Text>
                            <Text style={styles.guidePriceVal}>৳{isBangla ? selectedGuideProfile.fee.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedGuideProfile.fee.toLocaleString()}/{isBangla ? 'দিন' : 'day'}</Text>
                          </View>
                        </View>

                        <TouchableOpacity style={styles.guideBookBtn} onPress={() => openGuideBooking(selectedGuideProfile)} disabled={selectedGuideProfile.status !== 'Available'}>
                          <Text style={styles.guideBookBtnText}>{selectedGuideProfile.status === 'Available' ? t('bookAppointment', isBangla) : t('unavailable', isBangla)}</Text>
                        </TouchableOpacity>
                      </>
                    );
                  })()}
                </View>
              </>
            )}

            {guideViewMode === 'booking' && selectedGuideProfile && (
              <>
                <TouchableOpacity onPress={() => setGuideViewMode('guide')} style={{ marginHorizontal: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="arrow-left" size={16} color="#D98A3D" />
                  <Text style={{ color: '#D98A3D', fontWeight: '700', marginLeft: 6 }}>{t('backToProfile', isBangla)}</Text>
                </TouchableOpacity>

                <View style={styles.guideCard}>
                  <Text style={styles.sectionHeadingTitle}>{isBangla ? `${translateTourGuide(selectedGuideProfile, isBangla).name} বুক করুন` : `Book ${selectedGuideProfile.name}`}</Text>
                  <Text style={styles.sectionDesc}>{t('bookGuideDesc', isBangla)}</Text>
                  <View style={{ marginTop: 14, gap: 10 }}>
                    <TextInput placeholder={t('travelers', isBangla)} value={guideBookingForm.travelers} onChangeText={(value) => setGuideBookingForm((prev) => ({ ...prev, travelers: value }))} style={styles.guideFormInput} keyboardType="number-pad" placeholderTextColor="#6B7280" />
                    <TextInput placeholder={t('contactNumber', isBangla)} value={guideBookingForm.contactNumber} onChangeText={handleContactNumberChange} style={styles.guideFormInput} keyboardType="number-pad" maxLength={11} placeholderTextColor="#6B7280" />
                    <TextInput placeholder={t('tourDestination', isBangla)} value={guideBookingForm.destination} onChangeText={(value) => setGuideBookingForm((prev) => ({ ...prev, destination: value }))} style={styles.guideFormInput} placeholderTextColor="#6B7280" />
                    <TouchableOpacity style={styles.guideDatePicker} onPress={() => openDatePicker('start')}>
                      <Text style={styles.guideDatePickerLabel}>{t('startDate', isBangla)}</Text>
                      <Text style={styles.guideDatePickerValue}>{guideBookingForm.startDate}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.guideDatePicker} onPress={() => openDatePicker('end')}>
                      <Text style={styles.guideDatePickerLabel}>{t('endDate', isBangla)}</Text>
                      <Text style={styles.guideDatePickerValue}>{guideBookingForm.endDate}</Text>
                    </TouchableOpacity>
                    <TextInput placeholder={t('hotelName', isBangla)} value={guideBookingForm.hotelName} onChangeText={(value) => setGuideBookingForm((prev) => ({ ...prev, hotelName: value }))} style={styles.guideFormInput} placeholderTextColor="#6B7280" />
                    <TextInput placeholder={t('hotelAddress', isBangla)} value={guideBookingForm.hotelAddress} onChangeText={(value) => setGuideBookingForm((prev) => ({ ...prev, hotelAddress: value }))} style={styles.guideFormInput} placeholderTextColor="#6B7280" />
                    <TextInput placeholder={t('specialRequests', isBangla)} value={guideBookingForm.specialRequests} onChangeText={(value) => setGuideBookingForm((prev) => ({ ...prev, specialRequests: value }))} style={[styles.guideFormInput, styles.guideTextArea]} multiline placeholderTextColor="#6B7280" textAlignVertical="top" />
                    <TouchableOpacity style={styles.guideBookBtn} onPress={() => handleConfirmGuideBooking(selectedGuideProfile)}>
                      <Text style={styles.guideBookBtnText}>{t('confirmBooking', isBangla)}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

            <Modal visible={datePickerVisible} transparent animationType="fade" onRequestClose={() => setDatePickerVisible(false)}>
              <View style={styles.datePickerOverlay}>
                <View style={styles.datePickerCard}>
                  <View style={styles.datePickerHeader}>
                    <Text style={styles.datePickerTitle}>{activeDateField === 'start' ? t('selectStartDate', isBangla) : t('selectEndDate', isBangla)}</Text>
                    <TouchableOpacity onPress={() => setDatePickerVisible(false)}>
                      <Text style={styles.datePickerClose}>{t('close', isBangla)}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.datePickerNav}>
                    <TouchableOpacity onPress={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}>
                      <Text style={styles.datePickerNavText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.datePickerMonth}>
                      {isBangla
                        ? (() => {
                            const months = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
                            const yr = String(calendarMonth.getFullYear()).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]);
                            return `${months[calendarMonth.getMonth()]} ${yr}`;
                          })()
                        : calendarMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                    </Text>
                    <TouchableOpacity onPress={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}>
                      <Text style={styles.datePickerNavText}>→</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.datePickerWeekRow}>
                    {(isBangla ? ['র','সো','ম','বু','বৃ','শু','শ'] : ['S', 'M', 'T', 'W', 'T', 'F', 'S']).map((day, index) => (
                      <Text key={`${day}-${index}`} style={styles.datePickerWeekText}>{day}</Text>
                    ))}
                  </View>

                  <View style={styles.datePickerGrid}>
                    {getCalendarDays(calendarMonth).map((date, index) => {
                      if (!date) return <View key={`empty-${index}`} style={styles.datePickerDayCell} />;
                      const isCurrentMonth = date.getMonth() === calendarMonth.getMonth();
                      const isSelected = formatDateValue(date) === (activeDateField === 'start' ? guideBookingForm.startDate : guideBookingForm.endDate);
                      return (
                        <TouchableOpacity
                          key={formatDateValue(date)}
                          style={[styles.datePickerDayCell, isCurrentMonth ? styles.datePickerDayCellActive : styles.datePickerDayCellMuted, isSelected && styles.datePickerDayCellSelected]}
                          onPress={() => handleDateSelect(date)}
                        >
                          <Text style={[styles.datePickerDayText, isCurrentMonth ? styles.datePickerDayTextActive : styles.datePickerDayTextMuted, isSelected && styles.datePickerDayTextSelected]}>{date.getDate()}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
        )}

        {activeTab === 'bookings' && (
          selectedSavedTrip && selectedSavedTrip.tripPlan ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <View style={styles.resultContainer}>
                {/* Header Back Button */}
                <TouchableOpacity 
                  style={[styles.backTripBtn, { marginBottom: 16 }]} 
                  onPress={() => setSelectedSavedTrip(null)}
                >
                  <Feather name="arrow-left" size={20} color="#D98A3D" />
                  <Text style={styles.backTripText}>Back to Bookings</Text>
                </TouchableOpacity>

                {/* 1. Trip Overview */}
                <View style={styles.tripSummaryCard}>
                  <Text style={styles.tripSummaryTitle}> Trip Overview</Text>

                  <View style={styles.overviewGrid}>
                    <View style={styles.overviewGridItem}>
                      <Text style={styles.overviewLabel}>Starting From</Text>
                      <Text style={styles.overviewValue}>{selectedSavedTrip.tripPlan.fromLocation}</Text>
                    </View>
                    <View style={styles.overviewGridItem}>
                      <Text style={styles.overviewLabel}>Destination Area</Text>
                      <Text style={styles.overviewValue}>
                        {selectedSavedTrip.tripPlan.mainDivision} Division
                      </Text>
                    </View>
                    <View style={styles.overviewGridItem}>
                      <Text style={styles.overviewLabel}>Duration</Text>
                      <Text style={styles.overviewValue}>
                        {selectedSavedTrip.tripPlan.durationDays} Days / {selectedSavedTrip.tripPlan.durationNights} Nights
                      </Text>
                    </View>
                    <View style={styles.overviewGridItem}>
                      <Text style={styles.overviewLabel}>Travelers</Text>
                      <Text style={styles.overviewValue}>{selectedSavedTrip.tripPlan.numberOfPeople} {selectedSavedTrip.tripPlan.numberOfPeople === 1 ? 'Person' : 'People'}</Text>
                    </View>
                    <View style={styles.overviewGridItem}>
                      <Text style={styles.overviewLabel}>Budget Tier</Text>
                      <Text style={styles.overviewValue}>{selectedSavedTrip.tripPlan.budgetType}</Text>
                    </View>
                    <View style={styles.overviewGridItem}>
                      <Text style={styles.overviewLabel}>Travel Style</Text>
                      <Text style={styles.overviewValue}>{selectedSavedTrip.tripPlan.recommendedStyle}</Text>
                    </View>
                  </View>
                </View>

                {/* 2. Best Travel Order / Route Sequence */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('optimizedRoute', isBangla)}</Text>
                  <View style={styles.routeFlowCard}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.routeFlowContent}>
                      <Text style={styles.routeFlowStepStart}> {selectedSavedTrip.tripPlan.fromLocation.split(' ')[0]}</Text>
                      {selectedSavedTrip.tripPlan.destinations.map((dest: any, idx: number) => (
                        <React.Fragment key={dest.id}>
                          <Feather name="arrow-right" size={16} color="#D98A3D" style={{ marginHorizontal: 8 }} />
                          <Text style={styles.routeFlowStepDest}>{translateDestination(dest, isBangla).name}</Text>
                        </React.Fragment>
                      ))}
                    </ScrollView>
                  </View>

                  {/* Route Explanation */}
                  <View style={styles.explanationBox}>
                    <Feather name="info" size={16} color="#D98A3D" style={{ marginTop: 2, marginRight: 8 }} />
                    <Text style={styles.explanationText}>{selectedSavedTrip.tripPlan.routeExplanation}</Text>
                  </View>
                </View>

                {/* 3. Day-by-Day Itinerary */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('completeTimeline', isBangla)}</Text>
                  {selectedSavedTrip.tripPlan.dailySchedule.map((dayPlan: any) => {
                    const translatedDestName = translateDestinationName(dayPlan.destination, isBangla);
                    const translatedHotelName = translateHotel({ name: dayPlan.accommodation, amenities: [], division: '' }, isBangla).name;
                    const translatedTransit = isBangla 
                      ? dayPlan.transportInfo
                          .replace('Bus', 'বাস')
                          .replace('Train', 'ট্রেন')
                          .replace('Local CNG', 'সিএনজি')
                          .replace('Auto', 'অটো')
                          .replace('Walking', 'পায়ে হাঁটা')
                          .replace('Reserved Car', 'রিজার্ভ গাড়ি')
                          .replace('Private', 'প্রাইভেট কার')
                      : dayPlan.transportInfo;

                    return (
                      <View key={dayPlan.day} style={styles.dayItineraryCard}>
                        <View style={styles.dayItineraryHeader}>
                          <View style={styles.dayItineraryBadge}>
                            <Text style={styles.dayItineraryNumber}>{t('dayLabel', isBangla)} {isBangla ? String(dayPlan.day).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : dayPlan.day}</Text>
                          </View>
                          <Text style={styles.dayItineraryDest}>{translatedDestName}</Text>
                        </View>

                        <View style={styles.dayDetailsBox}>
                          <Text style={styles.dayDetailLabel}>{isBangla ? ' প্রধান স্পট: ' : ' Primary Spot: '}<Text style={styles.dayDetailVal}>{translatedDestName}</Text></Text>
                          <Text style={styles.dayDetailLabel}>{t('overnightStay', isBangla)} <Text style={styles.dayDetailVal}>{translatedHotelName}</Text></Text>
                          <Text style={styles.dayDetailLabel}>{t('transitMode', isBangla)} <Text style={styles.dayDetailVal}>{translatedTransit}</Text></Text>
                        </View>

                        {/* Day Activities Timeline items */}
                        <View style={styles.timelineContainer}>
                          {dayPlan.timeline.map((item: any, idx: number) => (
                            <View key={idx} style={styles.timelineItemRow}>
                              <View style={styles.timelineDotColumn}>
                                <View style={styles.timelineDot} />
                                {idx < dayPlan.timeline.length - 1 && <View style={styles.timelineLineConnector} />}
                              </View>
                              <View style={styles.timelineContentColumn}>
                                <Text style={styles.timelineTimeText}>{translateTime(item.time, isBangla)}</Text>
                                <Text style={styles.timelineActivityText}>{translateActivity(item.activity, isBangla, translatedHotelName)}</Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </View>

                {/* 4. Tourist Attractions Cards */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('featuredAttractions', isBangla)}</Text>
                  {selectedSavedTrip.tripPlan.destinations.map((destRaw: any) => {
                    const dest = translateDestination(destRaw, isBangla);
                    return (
                    <View key={destRaw.id} style={styles.attractionCard}>
                      {destRaw.images && destRaw.images[0] && (
                        <Image source={getImageSource(destRaw.images[0])} style={styles.attractionImage} />
                      )}
                      <View style={styles.attractionBody}>
                        <Text style={styles.attractionNameText}>{dest.name}</Text>
                        <Text style={styles.attractionDivisionText}>{translateDivision(destRaw.division, isBangla)} {isBangla ? 'বিভাগ' : 'Division'}</Text>
                        <Text style={styles.attractionDescText}>{dest.description}</Text>

                        <View style={styles.whyVisitBox}>
                          <Text style={styles.whyVisitLabel}>{t('whyVisit', isBangla)}</Text>
                          <Text style={styles.whyVisitVal}>{getWhyVisitText(destRaw)}</Text>
                        </View>

                        <View style={styles.attractionFooterDetails}>
                          <View style={styles.attractionDetailCol}>
                            <Feather name="clock" size={12} color="#9CA3AF" />
                            <Text style={styles.attractionDetailValText}> {dest.estimatedVisitDuration || (isBangla ? '২-৩ ঘণ্টা' : '2-3 Hours')}</Text>
                          </View>
                          <View style={styles.attractionDetailCol}>
                            <Feather name="sun" size={12} color="#9CA3AF" />
                            <Text style={styles.attractionDetailValText}> {dest.bestTimeToVisit?.timeOfDay.split('(')[0] || (isBangla ? 'সকালে' : 'Morning')}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    );
                  })}
                </View>

                {/* 5. Transportation Guide */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('transportationGuide', isBangla)}</Text>

                  {/* Intercity Transit */}
                  <View style={styles.transportGuideCard}>
                    <Text style={styles.transportHeading}>{t('fromStartingLocation', isBangla, { location: selectedSavedTrip.tripPlan.fromLocation })}</Text>
                    <View style={styles.transportMethodRow}>
                      <Feather name="truck" size={16} color="#D98A3D" style={{ marginRight: 8 }} />
                      <Text style={styles.transportMethodName}>
                        {isBangla ? selectedSavedTrip.tripPlan.intercityTransport.method.replace('AC', 'এসি').replace('Non-AC', 'নন-এসি').replace('Bus', 'বাস').replace('Train', 'ট্রেন').replace('Flight', 'ফ্লাইট').replace('Private Car', 'প্রাইভেট কার') : selectedSavedTrip.tripPlan.intercityTransport.method}
                      </Text>
                    </View>
                    <Text style={styles.transportOverview}>
                      {isBangla ? selectedSavedTrip.tripPlan.intercityTransport.overview.replace('Direct', 'সরাসরি').replace('AC', 'এসি').replace('Non-AC', 'নন-এসি').replace('bus', 'বাস').replace('train', 'ট্রেন').replace('flight', 'ফ্লাইট').replace('station', 'স্টেশন').replace('terminal', 'টার্মিনাল') : selectedSavedTrip.tripPlan.intercityTransport.overview}
                    </Text>

                    <Text style={styles.transportSectionLabel}>{t('alternativeTransit', isBangla)}</Text>
                    {selectedSavedTrip.tripPlan.intercityTransport.alternatives.map((alt: any, idx: number) => (
                      <Text key={idx} style={styles.transportBullet}>• {isBangla ? alt.replace('AC', 'এসি').replace('Non-AC', 'নন-এসি').replace('Bus', 'বাস').replace('Train', 'ট্রেন').replace('Flight', 'ফ্লাইট').replace('Car', 'কার') : alt}</Text>
                    ))}

                    <View style={styles.transportTimeBox}>
                      <Feather name="clock" size={14} color="#D98A3D" style={{ marginRight: 6 }} />
                      <Text style={styles.transportTimeText}>
                        {t('estTravelTime', isBangla)}: {isBangla ? selectedSavedTrip.tripPlan.intercityTransport.estimatedTime.replace('hours', 'ঘণ্টা').replace('hour', 'ঘণ্টা').replace('mins', 'মিনিট').replace('min', 'মিনিট').replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.intercityTransport.estimatedTime}
                      </Text>
                    </View>
                  </View>

                  {/* Local Transit */}
                  <View style={[styles.transportGuideCard, { marginTop: 12 }]}>
                    <Text style={styles.transportHeading}>{t('localTransportInside', isBangla, { division: translateDivision(selectedSavedTrip.tripPlan.mainDivision, isBangla) })}</Text>
                    <View style={styles.transportMethodRow}>
                      <Feather name="user" size={16} color="#D98A3D" style={{ marginRight: 8 }} />
                      <Text style={styles.transportMethodName}>
                        {isBangla ? selectedSavedTrip.tripPlan.localTransport.mode.replace('CNG', 'সিএনজি').replace('Rickshaw', 'রিকশা').replace('Auto', 'অটো').replace('Walking', 'পায়ে হাঁটা').replace('Reserved Jeep', 'রিজার্ভ জিপ/চাঁদের গাড়ি') : selectedSavedTrip.tripPlan.localTransport.mode}
                      </Text>
                    </View>
                    <Text style={styles.transportOverview}>
                      {isBangla ? selectedSavedTrip.tripPlan.localTransport.description.replace('CNG', 'সিএনজি').replace('Rickshaws', 'রিকশা').replace('Walking', 'পায়ে হেঁটে').replace('local boat', 'স্থানীয় নৌকা').replace('Jeep', 'জিপ/চাঁদের গাড়ি').replace('travel', 'ভ্রমণ') : selectedSavedTrip.tripPlan.localTransport.description}
                    </Text>
                    <Text style={styles.transportOverview}>
                      {t('estLocalCost', isBangla)} <Text style={{ color: '#D98A3D', fontWeight: 'bold' }}>৳{isBangla ? String(selectedSavedTrip.tripPlan.localTransport.costPerDayPerPerson).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.localTransport.costPerDayPerPerson} {isBangla ? 'টাকা' : 'BDT'}</Text> {t('perPerson', isBangla)}.
                    </Text>
                  </View>
                </View>

                {/* 6. Food Recommendations */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('localFoodRecs', isBangla)}</Text>
                  <View style={styles.foodRecCard}>
                    <Text style={styles.foodSectionLabel}>{t('famousDishesTry', isBangla)}</Text>
                    <View style={styles.famousFoodsContainer}>
                      {selectedSavedTrip.tripPlan.foodRecommendations.mustTryFoods.map((food: any, idx: number) => (
                        <View key={idx} style={styles.foodItemTag}>
                          <Text style={styles.foodItemText}>{isBangla ? (food.includes('Biryani') ? 'কাচ্চি বিরিয়ানি' : food.includes('Seafood') ? 'সামুদ্রিক মাছ ভাজা' : food.includes('Tea') ? 'রং চা / সাত রঙের চা' : food.includes('Bamboo') ? 'ব্যাম্বু চিকেন' : food.includes('Fresh') ? 'তাজা ডাবের পানি' : food) : food}</Text>
                        </View>
                      ))}
                    </View>

                    {selectedSavedTrip.tripPlan.foodRecommendations.restaurants.length > 0 && (
                      <>
                        <Text style={[styles.foodSectionLabel, { marginTop: 12 }]}>{t('popularRestaurants', isBangla)}</Text>
                        {selectedSavedTrip.tripPlan.foodRecommendations.restaurants.map((rest: any, idx: number) => (
                          <Text key={idx} style={styles.foodItemBullet}> {rest}</Text>
                        ))}
                      </>
                    )}

                    <View style={styles.diningNotesBox}>
                      <Text style={styles.diningNotesText}> {selectedSavedTrip.tripPlan.foodRecommendations.diningNotes}</Text>
                    </View>
                  </View>
                </View>

                {/* 7. Accommodation Suggestions */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('accommodationSuggestions', isBangla)}</Text>
                  <View style={styles.accommodationCard}>
                    <View style={styles.accommodationHeader}>
                      <Feather name="home" size={18} color="#D98A3D" style={{ marginRight: 8 }} />
                      <Text style={styles.accommodationHotelName}>{translateHotel(selectedSavedTrip.tripPlan.hotel, isBangla).name}</Text>
                    </View>

                    <View style={styles.hotelDetailsGrid}>
                      <View style={styles.hotelDetailItem}>
                        <Text style={styles.hotelDetailLabel}>{t('ratePerNight', isBangla)}</Text>
                        <Text style={styles.hotelDetailVal}>৳{isBangla ? selectedSavedTrip.tripPlan.hotel.ratePerNight.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.hotel.ratePerNight.toLocaleString()} {isBangla ? 'টাকা' : 'BDT'}</Text>
                      </View>
                      <View style={styles.hotelDetailItem}>
                        <Text style={styles.hotelDetailLabel}>{t('rating', isBangla)}</Text>
                        <Text style={styles.hotelDetailVal}> {isBangla ? String(selectedSavedTrip.tripPlan.hotel.rating || '4.2').replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : (selectedSavedTrip.tripPlan.hotel.rating || '4.2')} / {isBangla ? '৫.০' : '5.0'}</Text>
                      </View>
                      <View style={styles.hotelDetailItem}>
                        <Text style={styles.hotelDetailLabel}>{t('suitableTraveler', isBangla)}</Text>
                        <Text style={styles.hotelDetailVal}>
                          {isBangla
                            ? (selectedSavedTrip.tripPlan.hotel.suitableFor === 'Solo / Couples' ? 'একক / দম্পতি' : 'পরিবার / গ্রুপ')
                            : (selectedSavedTrip.tripPlan.hotel.suitableFor || 'Solo / Couples')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* 8. Estimated Cost Breakdown */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t('detailedCosts', isBangla)}</Text>
                  <View style={styles.costBreakdownCard}>

                    {/* Intercity + Local Transport */}
                    <View style={styles.costItemRowDetailed}>
                      <View style={styles.costItemInfo}>
                        <Text style={styles.costItemHeading}> {t('transportationCost', isBangla)}</Text>
                        <Text style={styles.costItemMath}>
                          {isBangla ? 'আন্তঃনগর: ' : 'Intercity: '}৳{isBangla ? selectedSavedTrip.tripPlan.intercityTransport.costPerPerson.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.intercityTransport.costPerPerson.toLocaleString()} x {isBangla ? String(selectedSavedTrip.tripPlan.numberOfPeople).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.numberOfPeople} {isBangla ? 'জন = ' : 'people = '}৳{isBangla ? selectedSavedTrip.tripPlan.costs.intercityTransport.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.costs.intercityTransport.toLocaleString()}{'\n'}
                          {isBangla ? 'স্থানীয়: ' : 'Local: '}৳{isBangla ? selectedSavedTrip.tripPlan.localTransport.costPerDayPerPerson.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.localTransport.costPerDayPerPerson.toLocaleString()} x {isBangla ? String(selectedSavedTrip.tripPlan.durationDays).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.durationDays} {isBangla ? 'দিন' : 'days'} x {isBangla ? String(selectedSavedTrip.tripPlan.numberOfPeople).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.numberOfPeople} {isBangla ? 'জন = ' : 'people = '}৳{isBangla ? selectedSavedTrip.tripPlan.costs.localTransport.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.costs.localTransport.toLocaleString()}
                        </Text>
                      </View>
                      <Text style={styles.costItemTotalValue}>৳{isBangla ? (selectedSavedTrip.tripPlan.costs.intercityTransport + selectedSavedTrip.tripPlan.costs.localTransport).toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : (selectedSavedTrip.tripPlan.costs.intercityTransport + selectedSavedTrip.tripPlan.costs.localTransport).toLocaleString()}</Text>
                    </View>

                    {/* Accommodation */}
                    <View style={styles.costItemRowDetailed}>
                      <View style={styles.costItemInfo}>
                        <Text style={styles.costItemHeading}> {t('accommodationCost', isBangla)}</Text>
                        <Text style={styles.costItemMath}>
                          ৳{isBangla ? selectedSavedTrip.tripPlan.hotel.ratePerNight.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.hotel.ratePerNight.toLocaleString()} {isBangla ? 'টাকা প্রতি রুম' : 'BDT per room'} x {isBangla ? String(selectedSavedTrip.tripPlan.durationNights).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.durationNights} {isBangla ? 'রাত' : 'nights'} x {isBangla ? String(Math.ceil(selectedSavedTrip.tripPlan.numberOfPeople / 2)).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : Math.ceil(selectedSavedTrip.tripPlan.numberOfPeople / 2)} {isBangla ? 'টি রুম' : 'room(s)'}
                        </Text>
                      </View>
                      <Text style={styles.costItemTotalValue}>৳{isBangla ? selectedSavedTrip.tripPlan.costs.accommodation.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.costs.accommodation.toLocaleString()}</Text>
                    </View>

                    {/* Food */}
                    <View style={styles.costItemRowDetailed}>
                      <View style={styles.costItemInfo}>
                        <Text style={styles.costItemHeading}> {t('foodDiningCost', isBangla)}</Text>
                        <Text style={styles.costItemMath}>
                          {isBangla ? 'দৈনিক গড়' : 'Daily Average'} x {isBangla ? String(selectedSavedTrip.tripPlan.durationDays).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.durationDays} {isBangla ? 'দিন' : 'days'} x {isBangla ? String(selectedSavedTrip.tripPlan.numberOfPeople).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.numberOfPeople} {isBangla ? 'জন' : 'people'}
                        </Text>
                      </View>
                      <Text style={styles.costItemTotalValue}>৳{isBangla ? selectedSavedTrip.tripPlan.costs.food.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.costs.food.toLocaleString()}</Text>
                    </View>

                    {/* Attraction Entry Fees */}
                    <View style={styles.costItemRowDetailed}>
                      <View style={styles.costItemInfo}>
                        <Text style={styles.costItemHeading}> {t('entranceCost', isBangla)}</Text>
                        <Text style={styles.costItemMath}>
                          {isBangla ? 'প্রবেশ ফি সমষ্টি' : 'Entry Fees sum'} x {isBangla ? String(selectedSavedTrip.tripPlan.numberOfPeople).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.numberOfPeople} {isBangla ? 'জন' : 'people'}
                        </Text>
                      </View>
                      <Text style={styles.costItemTotalValue}>৳{isBangla ? selectedSavedTrip.tripPlan.costs.entryFees.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.costs.entryFees.toLocaleString()}</Text>
                    </View>

                    {/* Miscellaneous */}
                    <View style={styles.costItemRowDetailed}>
                      <View style={styles.costItemInfo}>
                        <Text style={styles.costItemHeading}> {t('miscContingency', isBangla)}</Text>
                        <Text style={styles.costItemMath}>
                          {isBangla ? 'জরুরি/টিপস এর জন্য সাবটোটালের প্রায় ১০%' : '~10% of subtotal for emergency/tips'}
                        </Text>
                      </View>
                      <Text style={styles.costItemTotalValue}>৳{isBangla ? selectedSavedTrip.tripPlan.costs.miscellaneous.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.costs.miscellaneous.toLocaleString()}</Text>
                    </View>

                    <View style={styles.costDivider} />

                    {/* 9. Final Cost Summary */}
                    <View style={styles.finalCostSummaryBlock}>
                      <View style={styles.costSummaryRow}>
                        <Text style={styles.costSummaryLabel}>{t('totalTripCost', isBangla)}</Text>
                        <Text style={styles.costSummaryValueTotal}>৳{isBangla ? selectedSavedTrip.tripPlan.totalCost.toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : selectedSavedTrip.tripPlan.totalCost.toLocaleString()} {isBangla ? 'টাকা' : 'BDT'}</Text>
                      </View>
                      <View style={styles.costSummaryRow}>
                        <Text style={styles.costSummaryLabel}>{t('costPerPerson', isBangla)}</Text>
                        <Text style={styles.costSummaryValuePerPerson}>৳{isBangla ? Math.ceil(selectedSavedTrip.tripPlan.totalCost / selectedSavedTrip.tripPlan.numberOfPeople).toLocaleString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[parseInt(d)]) : Math.ceil(selectedSavedTrip.tripPlan.totalCost / selectedSavedTrip.tripPlan.numberOfPeople).toLocaleString()} {isBangla ? 'টাকা' : 'BDT'}</Text>
                      </View>
                      <View style={styles.costSummaryRow}>
                        <Text style={styles.costSummaryLabel}>{t('classification', isBangla)}</Text>
                        <Text style={styles.costSummaryBudgetTag}>{translateBudgetType(selectedSavedTrip.tripPlan.budgetType, isBangla)}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Download Plan Button */}
                <View style={[styles.actionButtonsContainer, { marginTop: 16 }]}>
                  <TouchableOpacity 
                    style={[styles.primaryButton, { flex: 1 }]} 
                    onPress={() => handleDownloadPlan(selectedSavedTrip)}
                  >
                    <Feather name="download" size={18} color="#FFF" style={{ marginRight: 6 }} />
                    <Text style={styles.primaryButtonText}>{t('downloadPlan', isBangla)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <View style={styles.heroTextContainer}>
                <Text style={styles.sectionHeadingTitle}>{t('myBookingsSaves', isBangla)}</Text>
                <Text style={styles.sectionDesc}>{t('manageBookingsDesc', isBangla)}</Text>
              </View>

              {/* ── Filter Chips Bar ── */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 10, gap: 8 }}
                style={{ marginBottom: 4 }}
              >
                {(['All', 'Saved', 'Confirmed', 'Cancelled', 'Complaints'] as const).map((chip) => {
                  const active = bookingFilter === chip;
                  return (
                    <TouchableOpacity
                      key={chip}
                      onPress={() => setBookingFilter(chip)}
                      style={[
                        styles.categoryPill,
                        active && styles.categoryPillActive,
                        { paddingHorizontal: 16, paddingVertical: 8 }
                      ]}
                    >
                      <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                        {chip === 'All' ? t('all', isBangla) :
                         chip === 'Saved' ? (isBangla ? 'সংরক্ষিত' : 'Saved') :
                         chip === 'Confirmed' ? t('confirmed', isBangla) :
                         chip === 'Cancelled' ? t('cancelled', isBangla) :
                         chip === 'Complaints' ? t('complaints', isBangla) : chip}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {(() => {
                // Filter bookings by chip
                const filtered = bookings.filter((b) => {
                  if (bookingFilter === 'All') return b.type !== 'spot';
                  if (bookingFilter === 'Saved') return b.type === 'spot';
                  if (bookingFilter === 'Complaints') return b.type === 'complaint';
                  if (bookingFilter === 'Confirmed') {
                    if (b.type === 'trip') return b.status === 'Completed' || b.status === 'Planned';
                    if (b.type === 'guide') return b.guideMeta?.status === 'Completed' || b.guideMeta?.status === 'Ongoing';
                    return false;
                  }
                  if (bookingFilter === 'Cancelled') {
                    if (b.type === 'guide') return b.guideMeta?.status === 'Cancelled';
                    return false;
                  }
                  return true;
                });

                if (filtered.length === 0) {
                  return (
                    <View style={styles.emptyBookingsCard}>
                      <Feather name="calendar" size={56} color="#4B5563" style={{ marginBottom: 12 }} />
                      <Text style={styles.emptyBookingsTitle}>{t('noResults', isBangla)}</Text>
                      <Text style={styles.emptyBookingsDesc}>
                        {bookingFilter === 'All'
                          ? t('noBookingsDesc', isBangla)
                          : t('noFilterBookingsDesc', isBangla, { filter: translateGeneral(bookingFilter, isBangla) })}
                      </Text>
                      {bookingFilter !== 'All' && (
                        <TouchableOpacity style={styles.clearFilterBtn} onPress={() => setBookingFilter('All')}>
                          <Text style={styles.clearFilterText}>{t('showAll', isBangla)}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }

                return filtered.map((booking) => {
                  // ── Complaint Card ──
                  if (booking.type === 'complaint' && booking.complaintMeta) {
                    const cm = booking.complaintMeta;
                    const statusColor =
                      cm.status === 'Resolved' ? '#4ADE80' :
                      cm.status === 'Under Review' ? '#FBBF24' : '#9CA3AF';
                    return (
                      <View key={booking.id} style={[styles.bookingCard, { borderLeftWidth: 3, borderLeftColor: '#D98A3D' }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <Text style={styles.bookingTypeText}>{t('complaintLabel', isBangla)}</Text>
                          <View style={{ backgroundColor: 'rgba(217,138,61,0.12)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(217,138,61,0.3)' }}>
                            <Text style={{ fontSize: 10, color: statusColor, fontWeight: 'bold' }}>{translateGeneral(cm.status, isBangla)}</Text>
                          </View>
                        </View>
                        <Text style={[styles.bookingName, { marginBottom: 4 }]}>{cm.touristPlace}</Text>
                        <Text style={[styles.bookingDetail, { marginBottom: 8 }]} numberOfLines={2}>{cm.message}</Text>

                        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', paddingTop: 8, borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
                          <Feather name="calendar" size={12} color="#9CA3AF" />
                          <Text style={{ fontSize: 11, color: '#9CA3AF' }}>{cm.submissionDate}</Text>
                          {cm.images.length > 0 && (
                            <>
                              <Feather name="image" size={12} color="#9CA3AF" />
                              <Text style={{ fontSize: 11, color: '#9CA3AF' }}>{cm.images.length} {isBangla ? 'টি ছবি' : (cm.images.length > 1 ? 'photos' : 'photo')}</Text>
                            </>
                          )}
                          <View style={{ flex: 1 }} />
                          <Text style={{ fontSize: 11, color: '#6B7280' }}>{isBangla ? 'দ্বারা' : 'By'} {cm.userName}</Text>
                        </View>
                      </View>
                    );
                  }

                  // ── Trip Card ──
                  if (booking.type === 'trip' && booking.tripPlan) {
                    return (
                      <TouchableOpacity
                        key={booking.id}
                        style={styles.bookingCard}
                        onPress={() => setSelectedSavedTrip(booking)}
                      >
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                          <Image source={booking.image} style={styles.bookingImage} />
                          <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <View>
                              <View style={styles.bookingTypeRow}>
                                <Text style={styles.bookingTypeText}>{t('customTour', isBangla)}</Text>
                                <Text style={styles.bookingDate}>{t('created', isBangla)} {booking.createdAt}</Text>
                              </View>
                              <Text style={styles.bookingName} numberOfLines={1}>{booking.name}</Text>
                              <View style={{ marginTop: 6, gap: 4 }}>
                                <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                                  {t('durationLabel', isBangla)} <Text style={{ color: '#E5E7EB', fontWeight: '500' }}>{booking.tripPlan.durationDays}{isBangla ? 'দিন' : 'D'} / {booking.tripPlan.durationNights}{isBangla ? 'রাত' : 'N'}</Text>
                                </Text>
                                <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                                  {t('travelersLabel', isBangla)} <Text style={{ color: '#E5E7EB', fontWeight: '500' }}>{booking.tripPlan.numberOfPeople} {isBangla ? 'জন' : 'People'}</Text>
                                </Text>
                                <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                                  {t('budgetLabel', isBangla)} <Text style={{ color: '#E5E7EB', fontWeight: '500' }}>{translateBudgetType(booking.tripPlan.budgetType, isBangla)}</Text>
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                  <Text style={{ fontSize: 12, color: '#9CA3AF' }}>{t('statusLabel', isBangla)} </Text>
                                  <View style={{ backgroundColor: '#1E3A8A', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                                    <Text style={{ fontSize: 10, color: '#93C5FD', fontWeight: 'bold' }}>{translateGeneral(booking.status || 'Planned', isBangla)}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                            <View style={[styles.bookingFooterRow, { marginTop: 8 }]}>
                              <Text style={styles.bookingPrice}>{booking.price}</Text>
                              <TouchableOpacity
                                style={styles.cancelBookingBtn}
                                onPress={() => handleCancelBooking(booking.id, booking.name)}
                              >
                                <Text style={styles.cancelBookingText}>{t('cancelRemove', isBangla)}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }

                  // ── Default Card (hotel / guide / spot) ──
                  const isSpot = booking.type === 'spot';
                  const CardWrapper = isSpot && booking.spotDestination ? TouchableOpacity : View;
                  return (
                    <CardWrapper
                      key={booking.id}
                      style={[styles.bookingCard, isSpot && { borderLeftWidth: 3, borderLeftColor: '#D98A3D' }]}
                      {...(isSpot && booking.spotDestination ? {
                        activeOpacity: 0.85,
                        onPress: () => {
                          setSelectedDestination(booking.spotDestination!);
                          setDetailImageIndex(0);
                          setExpandedDesc(false);
                          setActiveTab('explore');
                          setExploreStep('detail');
                        }
                      } : {})}
                    >
                      <View style={{ flexDirection: 'row', gap: 12 }}>
                        <Image source={booking.image} style={[styles.bookingImage, { borderRadius: 10 }]} />
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                          <View>
                            <View style={styles.bookingTypeRow}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                {isSpot && <Feather name="heart" size={11} color="#D98A3D" />}
                                <Text style={[styles.bookingTypeText, isSpot && { color: '#D98A3D' }]}>
                                  {booking.type === 'hotel' ? (isBangla ? 'হোটেল রুম' : 'Hotel Room') : booking.type === 'guide' ? (isBangla ? 'গাইড এজেন্ট' : 'Guide Agent') : (isBangla ? 'সংরক্ষিত গন্তব্য' : 'Saved Destination')}
                                </Text>
                              </View>
                              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Text style={styles.bookingDate}>{booking.date}</Text>
                                {isSpot && booking.spotDestination && (
                                  <Feather name="chevron-right" size={14} color="#D98A3D" />
                                )}
                              </View>
                            </View>
                            <Text style={styles.bookingName} numberOfLines={1}>{booking.name}</Text>
                            <Text style={styles.bookingDetail} numberOfLines={1}>{booking.detail}</Text>
                          </View>
                          <View style={styles.bookingFooterRow}>
                            <Text style={[styles.bookingPrice, isSpot && { color: '#4ADE80' }]}>{booking.price}</Text>
                            <TouchableOpacity
                              style={styles.cancelBookingBtn}
                              onPress={() => handleCancelBooking(booking.id, booking.name)}
                            >
                              <Text style={styles.cancelBookingText}>{t('cancelRemove', isBangla)}</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </CardWrapper>
                  );
                });
              })()}
            </ScrollView>
          )
        )}

        {activeTab === 'profile' && (
          profileViewMode === 'feedback' ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              {/* Back Button */}
              <TouchableOpacity 
                style={[styles.backTripBtn, { marginBottom: 10 }]} 
                onPress={() => setProfileViewMode('menu')}
              >
                <Feather name="arrow-left" size={20} color="#D98A3D" />
                <Text style={styles.backTripText}>{t('backToProfile', isBangla)}</Text>
              </TouchableOpacity>

              <View style={styles.heroTextContainer}>
                <Text style={styles.sectionHeadingTitle}>{t('feedbackComplaints', isBangla)}</Text>
                <Text style={styles.sectionDesc}>{t('feedbackDesc', isBangla)}</Text>
              </View>

              <View style={styles.plannerForm}>
                {/* User Name */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>{t('yourNameRequired', isBangla)}</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your name"
                    placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                    value={feedbackName}
                    onChangeText={setFeedbackName}
                  />
                </View>

                {/* Contact Number */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>{t('contactNumberRequired', isBangla)}</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter phone number"
                    placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                    keyboardType="phone-pad"
                    value={feedbackPhone}
                    onChangeText={setFeedbackPhone}
                    maxLength={11}
                  />
                </View>

                {/* Tourist Place */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>{t('touristPlaceRequired', isBangla)}</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="e.g. Cox's Bazar, Lalbagh Fort"
                    placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                    value={feedbackPlace}
                    onChangeText={setFeedbackPlace}
                  />
                </View>

                {/* Feedback Message */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>{t('feedbackMessageRequired', isBangla)}</Text>
                  <TextInput
                    style={[styles.textInput, { minHeight: 120, textAlignVertical: 'top' }]}
                    placeholder="Describe your feedback or complaint..."
                    placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                    multiline
                    numberOfLines={6}
                    value={feedbackMessage}
                    onChangeText={setFeedbackMessage}
                  />
                </View>

                {/* Upload Image Section */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>{t('uploadImages', isBangla)}</Text>
                  <TouchableOpacity 
                    style={[styles.secondaryButton, { borderStyle: 'dashed', borderWidth: 1 }]} 
                    onPress={handlePickImage}
                  >
                    <Feather name="image" size={18} color="#D98A3D" style={{ marginRight: 6 }} />
                    <Text style={styles.secondaryButtonText}>{t('addPhotoGallery', isBangla)}</Text>
                  </TouchableOpacity>

                  {/* Previews */}
                  {feedbackImages.length > 0 && (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
                      {feedbackImages.map((uri, idx) => (
                        <View key={idx} style={{ width: 68, height: 68, borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
                          <Image source={{ uri }} style={{ width: '100%', height: '100%' }} />
                          <TouchableOpacity 
                            style={{ 
                              position: 'absolute', 
                              top: 2, 
                              right: 2, 
                              backgroundColor: 'rgba(0,0,0,0.6)', 
                              borderRadius: 10, 
                              width: 18, 
                              height: 18, 
                              justifyContent: 'center', 
                              alignItems: 'center' 
                            }}
                            onPress={() => handleRemoveImage(idx)}
                          >
                            <Feather name="x" size={12} color="#FFF" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                {/* Submit button */}
                <TouchableOpacity style={styles.primaryButton} onPress={handleSubmitFeedback}>
                  <Text style={styles.primaryButtonText}>{t('submitFeedback', isBangla)}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <View style={styles.heroTextContainer}>
                <Text style={styles.sectionHeadingTitle}>{isBangla ? '\u0985\u09cd\u09af\u09be\u0995\u09be\u0989\u09a8\u09cd\u099f \u0993 \u09aa\u099b\u09a8\u09cd\u09a6\u09b8\u09ae\u09c2\u09b9' : 'Account & Preferences'}</Text>
                <Text style={styles.sectionDesc}>{isBangla ? '\u09b8\u09c7\u099f\u09bf\u0982\u09b8 \u0995\u09be\u09b8\u09cd\u099f\u09ae\u09be\u0987\u099c \u0995\u09b0\u09c1\u09a8 \u098f\u09ac\u0982 \u099f\u09cd\u09b0\u09bf\u09aa \u09b8\u09cd\u099f\u09cd\u09af\u09be\u099f\u09bf\u09b8\u09cd\u099f\u09bf\u0995\u09b8 \u09a6\u09c7\u0996\u09c1\u09a8' : 'Customize settings and view trip stats'}</Text>
              </View>

            {isLoggedIn && userProfile ? (
              <>
                {/* ── Enhanced User Information Card ── */}
                <View style={styles.authProfileCard}>
                  {/* Avatar + Name Row */}
                  <View style={styles.authProfileAvatarRow}>
                    <View style={styles.authProfileAvatar}>
                      <Feather name="user" size={36} color="#D98A3D" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 14 }}>
                      <Text style={styles.authProfileName}>{userProfile.name}</Text>
                      <View style={styles.authProfileBadgeRow}>
                        <View style={styles.authProfileBadge}>
                          <Feather name="shield" size={10} color="#D98A3D" />
                          <Text style={styles.authProfileBadgeText}>
                            {isBangla ? 'যাচাইকৃত সদস্য' : 'Verified Member'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Info Grid */}
                  <View style={styles.authInfoGrid}>
                    <View style={styles.authInfoItem}>
                      <Feather name="mail" size={13} color="#D98A3D" />
                      <View style={{ marginLeft: 8, flex: 1 }}>
                        <Text style={styles.authInfoLabel}>{isBangla ? 'ইমেল' : 'Email'}</Text>
                        <Text style={styles.authInfoValue} numberOfLines={1}>{userProfile.email}</Text>
                      </View>
                    </View>
                    <View style={styles.authInfoItem}>
                      <Feather name="phone" size={13} color="#D98A3D" />
                      <View style={{ marginLeft: 8, flex: 1 }}>
                        <Text style={styles.authInfoLabel}>{isBangla ? 'যোগাযোগ' : 'Contact'}</Text>
                        <Text style={styles.authInfoValue}>{userProfile.contactNumber || '—'}</Text>
                      </View>
                    </View>
                    <View style={styles.authInfoItem}>
                      <Feather name="user-check" size={13} color="#D98A3D" />
                      <View style={{ marginLeft: 8, flex: 1 }}>
                        <Text style={styles.authInfoLabel}>{isBangla ? 'লিঙ্গ' : 'Gender'}</Text>
                        <Text style={styles.authInfoValue}>
                          {userProfile.gender === 'Male'
                            ? (isBangla ? 'পুরুষ' : 'Male')
                            : (isBangla ? 'মহিলা' : 'Female')}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.authInfoItem}>
                      <Feather name="calendar" size={13} color="#D98A3D" />
                      <View style={{ marginLeft: 8, flex: 1 }}>
                        <Text style={styles.authInfoLabel}>{isBangla ? 'সদস্য থেকে' : 'Member Since'}</Text>
                        <Text style={styles.authInfoValue}>{userProfile.memberSince}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* ── Travel Statistics ── */}
                <View style={styles.authStatsCard}>
                  <Text style={styles.authSectionTitle}>
                    {isBangla ? 'ভ্রমণ পরিসংখ্যান' : 'Travel Statistics'}
                  </Text>
                  <View style={styles.authStatsGrid}>
                    {[
                      {
                        icon: 'map',
                        label: isBangla ? 'মোট ট্রিপ পরিকল্পনা' : 'Trips Planned',
                        value: bookings.filter(b => b.type === 'trip').length,
                      },
                      {
                        icon: 'check-circle',
                        label: isBangla ? 'সম্পন্ন ট্রিপ' : 'Completed Trips',
                        value: bookings.filter(b => b.type === 'trip' && (b.status === 'Completed' || (b.guideMeta?.status === 'Completed'))).length,
                      },
                      {
                        icon: 'users',
                        label: isBangla ? 'গাইড বুকিং' : 'Guide Bookings',
                        value: bookings.filter(b => b.type === 'guide').length,
                      },
                      {
                        icon: 'heart',
                        label: isBangla ? 'সংরক্ষিত স্থান' : 'Saved Places',
                        value: bookings.filter(b => b.type === 'spot').length,
                      },
                    ].map((stat, idx) => (
                      <View key={idx} style={styles.authStatBox}>
                        <Feather name={stat.icon as any} size={18} color="#D98A3D" />
                        <Text style={styles.authStatVal}>{stat.value}</Text>
                        <Text style={styles.authStatLabel}>{stat.label}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            ) : (
              <View style={styles.profileBox}>
                <View style={styles.profileAvatarBox}>
                  <Feather name="lock" size={48} color="#9CA3AF" />
                </View>
                <Text style={styles.profileName}>{t('signInRequired', isBangla)}</Text>
                <Text style={styles.profileEmail}>{t('signInRequiredDesc', isBangla)}</Text>
                <TouchableOpacity style={styles.primaryButton} onPress={() => { setAuthView('login'); setAuthError(null); }}>
                  <Text style={styles.primaryButtonText}>{t('signInOrCreate', isBangla)}</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Menu options list */}
            <View style={styles.profileMenuContainer}>
              <Text style={styles.menuHeading}>{t('appSettings', isBangla)}</Text>

              <TouchableOpacity style={styles.menuRow} onPress={() => { setActiveTab('bookings'); setBookingFilter('Saved'); }}>
                <View style={styles.menuLabelRow}>
                  <Feather name="heart" size={18} color="#D98A3D" />
                  <Text style={styles.menuLabel}>{t('savedDestinations', isBangla)}</Text>
                  {bookings.filter(b => b.type === 'spot').length > 0 && (
                    <View style={{ backgroundColor: '#D98A3D', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, marginLeft: 8 }}>
                      <Text style={{ fontSize: 10, color: '#fff', fontWeight: 'bold' }}>{bookings.filter(b => b.type === 'spot').length}</Text>
                    </View>
                  )}
                </View>
                <Feather name="chevron-right" size={18} color="#4B5563" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuRow}>
                <View style={styles.menuLabelRow}>
                  <Feather name="credit-card" size={18} color="#D98A3D" />
                  <Text style={styles.menuLabel}>{t('paymentMethods', isBangla)}</Text>
                </View>
                <Feather name="chevron-right" size={18} color="#4B5563" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuRow}>
                <View style={styles.menuLabelRow}>
                  <Feather name="settings" size={18} color="#D98A3D" />
                  <Text style={styles.menuLabel}>{t('systemPreferences', isBangla)}</Text>
                </View>
                <Feather name="chevron-right" size={18} color="#4B5563" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuRow}>
                <View style={styles.menuLabelRow}>
                  <Feather name="help-circle" size={18} color="#D98A3D" />
                  <Text style={styles.menuLabel}>{t('helpSupport', isBangla)}</Text>
                </View>
                <Feather name="chevron-right" size={18} color="#4B5563" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuRow} onPress={() => setProfileViewMode('feedback')}>
                <View style={styles.menuLabelRow}>
                  <Feather name="message-square" size={18} color="#D98A3D" />
                  <Text style={styles.menuLabel}>{t('feedback', isBangla)}</Text>
                </View>
                <Feather name="chevron-right" size={18} color="#4B5563" />
              </TouchableOpacity>

              <View style={styles.menuRow}>
                <View style={styles.menuLabelRow}>
                  <Feather name={isDarkMode ? "moon" : "sun"} size={18} color="#D98A3D" />
                  <Text style={styles.menuLabel}>{t('darkMode', isBangla)}</Text>
                </View>
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ false: '#4B5563', true: '#D98A3D' }}
                  thumbColor={isDarkMode ? '#FFFFFF' : '#F4F4F5'}
                />
              </View>

              {/* Language Toggle */}
              <View style={styles.menuRow}>
                <View style={styles.menuLabelRow}>
                  <Feather name="globe" size={18} color="#D98A3D" />
                  <View style={{ marginLeft: 0 }}>
                    <Text style={styles.menuLabel}>{t('language', isBangla)}</Text>
                    <Text style={{ fontSize: 11, color: isBangla ? '#D98A3D' : '#6B7280', marginTop: 1 }}>
                      {isBangla ? 'বাংলা সক্রিয়' : 'English Active'}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={isBangla}
                  onValueChange={toggleLanguage}
                  trackColor={{ false: '#4B5563', true: '#D98A3D' }}
                  thumbColor={isBangla ? '#FFFFFF' : '#F4F4F5'}
                />
              </View>
            </View>

            {/* Logout button at bottom for logged-in users */}
            {isLoggedIn && userProfile && (
              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Feather name="log-out" size={16} color="#EF4444" style={{ marginRight: 6 }} />
                <Text style={styles.logoutBtnText}>{t('signOut', isBangla)}</Text>
              </TouchableOpacity>
            )}

            {/* Footer versions */}
            <View style={styles.profileFooter}>
              <Text style={styles.footerVersion}>{t('versionInfo', isBangla)}</Text>
              <Text style={styles.footerCopyright}>{t('copyrightInfo', isBangla)}</Text>
            </View>

          </ScrollView>
          )
        )}

      </View>

      {/* Tab Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => {
            setActiveTab('explore');
            setExploreStep('divisions');
            setSelectedDestination(null);
          }}
          style={styles.navItem}
        >
          <Feather name="map" size={22} color={activeTab === 'explore' ? '#D98A3D' : '#9CA3AF'} />
          <Text style={[styles.navItemText, activeTab === 'explore' && styles.navItemTextActive]}>
            {t('explore', isBangla)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('planner')} style={styles.navItem}>
          <Feather name="calendar" size={22} color={activeTab === 'planner' ? '#D98A3D' : '#9CA3AF'} />
          <Text style={[styles.navItemText, activeTab === 'planner' && styles.navItemTextActive]}>
            {t('tripBuilder', isBangla)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('guides')} style={styles.navItem}>
          <Feather name="users" size={22} color={activeTab === 'guides' ? '#D98A3D' : '#9CA3AF'} />
          <Text style={[styles.navItemText, activeTab === 'guides' && styles.navItemTextActive]}>
            {t('guides', isBangla)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('bookings')} style={styles.navItem}>
          <Feather name="bookmark" size={22} color={activeTab === 'bookings' ? '#D98A3D' : '#9CA3AF'} />
          <Text style={[styles.navItemText, activeTab === 'bookings' && styles.navItemTextActive]}>
            {t('bookings', isBangla)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('profile')} style={styles.navItem}>
          <Feather name="user" size={22} color={activeTab === 'profile' ? '#D98A3D' : '#9CA3AF'} />
          <Text style={[styles.navItemText, activeTab === 'profile' && styles.navItemTextActive]}>
            {t('profile', isBangla)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Custom Toast Indicator */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Legacy auth modal kept hidden — replaced by full-screen views below */}
      <Modal visible={false} animationType="slide" transparent={true}><View /></Modal>

      {/* ══════════════════════════════════════
          LOGIN FULL-SCREEN VIEW
      ══════════════════════════════════════ */}
      <Modal visible={authView === 'login'} animationType="slide" transparent={false}>
        <SafeAreaView style={{ flex: 1, backgroundColor: styles.container.backgroundColor }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
              <TouchableOpacity onPress={() => { setAuthView(null); setAuthError(null); }} style={{ padding: 6 }}>
                <Feather name="x" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 24, paddingBottom: 40 }}>
              <View style={{ alignItems: 'center', marginBottom: 28, marginTop: 12 }}>
                <View style={styles.authLogoCircle}>
                  <Feather name="map-pin" size={32} color="#D98A3D" />
                </View>
                <Text style={styles.authPageTitle}>{isBangla ? 'স্বাগতম' : 'Welcome Back'}</Text>
                <Text style={styles.authPageSubtitle}>{isBangla ? 'আপনার অ্যাকাউন্টে সাইন ইন করুন' : 'Sign in to your account'}</Text>
              </View>

              {authError ? (
                <View style={styles.authErrorBox}>
                  <Feather name="alert-circle" size={14} color="#EF4444" />
                  <Text style={styles.authErrorText}>{authError}</Text>
                </View>
              ) : null}

              <Text style={styles.authFieldLabel}>{isBangla ? 'ইমেল ঠিকানা' : 'Email Address'}</Text>
              <TextInput
                style={styles.authInput}
                value={loginFormEmail}
                onChangeText={setLoginFormEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={isBangla ? 'আপনার ইমেল লিখুন' : 'Enter your email'}
                placeholderTextColor="#4B5563"
              />

              <Text style={styles.authFieldLabel}>{isBangla ? 'পাসওয়ার্ড' : 'Password'}</Text>
              <View style={styles.authPasswordRow}>
                <TextInput
                  style={[styles.authInput, { flex: 1, marginBottom: 0 }]}
                  value={loginFormPassword}
                  onChangeText={setLoginFormPassword}
                  secureTextEntry={!loginShowPassword}
                  placeholder={isBangla ? 'আপনার পাসওয়ার্ড লিখুন' : 'Enter your password'}
                  placeholderTextColor="#4B5563"
                />
                <TouchableOpacity onPress={() => setLoginShowPassword(!loginShowPassword)} style={styles.authEyeBtn}>
                  <Feather name={loginShowPassword ? 'eye-off' : 'eye'} size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, { marginTop: 24 }, authLoading && { opacity: 0.6 }]}
                onPress={handleFirebaseLogin}
                disabled={authLoading}
              >
                {authLoading
                  ? <ActivityIndicator size="small" color="#0E1116" />
                  : <Text style={styles.primaryButtonText}>{isBangla ? 'লগইন' : 'Login'}</Text>}
              </TouchableOpacity>

              <View style={styles.authDivider}>
                <View style={styles.authDividerLine} />
                <Text style={styles.authDividerText}>{isBangla ? 'অথবা' : 'OR'}</Text>
                <View style={styles.authDividerLine} />
              </View>

              <TouchableOpacity
                style={styles.authSecondaryBtn}
                onPress={() => { setAuthView('register'); setAuthError(null); }}
              >
                <Text style={styles.authSecondaryBtnText}>{isBangla ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'Create Account'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* ══════════════════════════════════════
          REGISTRATION FULL-SCREEN VIEW
      ══════════════════════════════════════ */}
      <Modal visible={authView === 'register'} animationType="slide" transparent={false}>
        <SafeAreaView style={{ flex: 1, backgroundColor: styles.container.backgroundColor }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
              <TouchableOpacity onPress={() => { setAuthView('login'); setAuthError(null); }} style={{ padding: 6 }}>
                <Feather name="arrow-left" size={22} color="#D98A3D" />
              </TouchableOpacity>
              <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#F2F2F0' }}>
                {isBangla ? 'নতুন অ্যাকাউন্ট' : 'Create Account'}
              </Text>
              <View style={{ width: 34 }} />
            </View>

            <View style={{ paddingHorizontal: 24, paddingBottom: 40 }}>
              {authError ? (
                <View style={styles.authErrorBox}>
                  <Feather name="alert-circle" size={14} color="#EF4444" />
                  <Text style={styles.authErrorText}>{authError}</Text>
                </View>
              ) : null}

              <Text style={styles.authFieldLabel}>{isBangla ? 'পূর্ণ নাম *' : 'Full Name *'}</Text>
              <TextInput
                style={styles.authInput}
                value={regName}
                onChangeText={setRegName}
                placeholder={isBangla ? 'আপনার পূর্ণ নাম লিখুন' : 'Enter your full name'}
                placeholderTextColor="#4B5563"
              />

              <Text style={styles.authFieldLabel}>{isBangla ? 'যোগাযোগ নম্বর * (১১ সংখ্যা)' : 'Contact Number * (11 digits)'}</Text>
              <TextInput
                style={styles.authInput}
                value={regContact}
                onChangeText={v => setRegContact(v.replace(/[^0-9]/g, '').slice(0, 11))}
                keyboardType="number-pad"
                maxLength={11}
                placeholder="01712345678"
                placeholderTextColor="#4B5563"
              />

              <Text style={styles.authFieldLabel}>{isBangla ? 'লিঙ্গ *' : 'Gender *'}</Text>
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
                {(['Male', 'Female'] as const).map(g => (
                  <TouchableOpacity
                    key={g}
                    onPress={() => setRegGender(g)}
                    style={[styles.authGenderBtn, regGender === g && styles.authGenderBtnActive]}
                  >
                    <Text style={[styles.authGenderBtnText, regGender === g && styles.authGenderBtnTextActive]}>
                      {g === 'Male' ? (isBangla ? '♂ পুরুষ' : '♂ Male') : (isBangla ? '♀ মহিলা' : '♀ Female')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.authFieldLabel}>{isBangla ? 'ইমেল ঠিকানা *' : 'Email Address *'}</Text>
              <TextInput
                style={styles.authInput}
                value={regEmail}
                onChangeText={setRegEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={isBangla ? 'আপনার ইমেল লিখুন' : 'Enter your email'}
                placeholderTextColor="#4B5563"
              />

              <Text style={styles.authFieldLabel}>{isBangla ? 'পাসওয়ার্ড *' : 'Password *'}</Text>
              <View style={styles.authPasswordRow}>
                <TextInput
                  style={[styles.authInput, { flex: 1, marginBottom: 0 }]}
                  value={regPassword}
                  onChangeText={setRegPassword}
                  secureTextEntry={!regShowPassword}
                  placeholder={isBangla ? 'কমপক্ষে ৬ অক্ষর' : 'At least 6 characters'}
                  placeholderTextColor="#4B5563"
                />
                <TouchableOpacity onPress={() => setRegShowPassword(!regShowPassword)} style={styles.authEyeBtn}>
                  <Feather name={regShowPassword ? 'eye-off' : 'eye'} size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              {/* Government Document Section */}
              <View style={styles.authDocSection}>
                <Text style={styles.authDocSectionTitle}>
                  {isBangla ? '📄 সরকারি নথি (ঐচ্ছিক)' : '📄 Government Document (Optional)'}
                </Text>
                <Text style={styles.authDocSectionSub}>
                  {isBangla ? 'জাতীয় পরিচয়পত্র বা পাসপোর্ট আপলোড করতে পারেন' : 'You may upload your NID or Passport'}
                </Text>
                <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
                  {([null, 'NID', 'Passport'] as const).map(dt => (
                    <TouchableOpacity
                      key={String(dt)}
                      onPress={() => setRegDocType(dt)}
                      style={[styles.authDocTypeBtn, regDocType === dt && styles.authDocTypeBtnActive]}
                    >
                      <Text style={[styles.authDocTypeBtnText, regDocType === dt && styles.authDocTypeBtnTextActive]}>
                        {dt === null ? (isBangla ? 'নেই' : 'None') : dt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {regDocType && (
                  <View style={{ gap: 10 }}>
                    <TouchableOpacity style={styles.authDocPickerBtn} onPress={() => handlePickDocImage('front')}>
                      {regDocFront
                        ? <Image source={{ uri: regDocFront }} style={{ width: '100%', height: 90, borderRadius: 8 }} resizeMode="cover" />
                        : <View style={{ alignItems: 'center', gap: 6, paddingVertical: 18 }}>
                            <Feather name="upload" size={22} color="#D98A3D" />
                            <Text style={{ color: '#D98A3D', fontSize: 12, fontWeight: '600' }}>
                              {isBangla ? 'সামনের দিক আপলোড করুন' : 'Upload Front Side'}
                            </Text>
                          </View>
                      }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.authDocPickerBtn} onPress={() => handlePickDocImage('back')}>
                      {regDocBack
                        ? <Image source={{ uri: regDocBack }} style={{ width: '100%', height: 90, borderRadius: 8 }} resizeMode="cover" />
                        : <View style={{ alignItems: 'center', gap: 6, paddingVertical: 18 }}>
                            <Feather name="upload" size={22} color="#D98A3D" />
                            <Text style={{ color: '#D98A3D', fontSize: 12, fontWeight: '600' }}>
                              {isBangla ? 'পেছনের দিক আপলোড করুন' : 'Upload Back Side'}
                            </Text>
                          </View>
                      }
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, { marginTop: 8 }, authLoading && { opacity: 0.6 }]}
                onPress={handleFirebaseRegister}
                disabled={authLoading}
              >
                {authLoading
                  ? <ActivityIndicator size="small" color="#0E1116" />
                  : <Text style={styles.primaryButtonText}>{isBangla ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account'}</Text>}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setAuthView('login'); setAuthError(null); }} style={{ alignItems: 'center', paddingVertical: 14 }}>
                <Text style={{ color: '#9CA3AF', fontSize: 13 }}>
                  {isBangla ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? ' : 'Already have an account? '}
                  <Text style={{ color: '#D98A3D', fontWeight: '700' }}>{isBangla ? 'লগইন করুন' : 'Login'}</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Guide Messaging Chat Modal */}
      <Modal visible={selectedChatGuide !== null} animationType="slide" transparent={true}>
        {selectedChatGuide && (
          <View style={styles.modalBg}>
            <View style={[styles.modalContent, { flex: 0.9, height: '90%' }]}>
              {/* Chat Header */}
              <View style={styles.modalHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Image source={{ uri: selectedChatGuide.photo }} style={styles.chatAvatar} />
                  <View>
                    <Text style={styles.chatGuideName}>{selectedChatGuide.name}</Text>
                    <Text style={styles.chatGuideStatus}>● Online - Answers quickly</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setSelectedChatGuide(null)}>
                  <Feather name="x" size={24} color="#F2F2F0" />
                </TouchableOpacity>
              </View>

              {/* Message scroll container */}
              <ScrollView
                style={styles.chatScrollView}
                contentContainerStyle={{ gap: 12, paddingVertical: 16 }}
                ref={(ref) => ref?.scrollToEnd({ animated: true })}
              >
                {/* Intro bubble */}
                <View style={styles.systemBubble}>
                  <Text style={styles.systemBubbleText}>
                    This is a secure connection with guide {selectedChatGuide.name}. Ask about tour schedules, locations, and custom plans.
                  </Text>
                </View>

                {/* Dynamic messages bubbles */}
                {(chatHistory[selectedChatGuide.id] || []).map((msg, index) => (
                  <View
                    key={index}
                    style={[
                      styles.messageRow,
                      msg.sender === 'user' ? styles.messageUserRow : styles.messageGuideRow,
                    ]}
                  >
                    <View
                      style={[
                        styles.messageBubble,
                        msg.sender === 'user' ? styles.messageUserBubble : styles.messageGuideBubble,
                      ]}
                    >
                      <Text style={msg.sender === 'user' ? styles.messageUserText : styles.messageGuideText}>{msg.text}</Text>
                      <Text style={msg.sender === 'user' ? styles.messageUserTime : styles.messageGuideTime}>{msg.time}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>

              {/* Chat Input row */}
              <View style={styles.chatInputRow}>
                <TextInput
                  style={styles.chatInput}
                  value={chatMessage}
                  onChangeText={setChatMessage}
                  placeholder={`Message ${selectedChatGuide.name}...`}
                  placeholderTextColor="#4B5563"
                />
                <TouchableOpacity style={styles.chatSendBtn} onPress={handleSendMessage}>
                  <Feather name="send" size={20} color="#0E1116" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>

    </SafeAreaView>
  );
}

// Styling system
function getStyles(isDarkMode: boolean) {
  const bg = isDarkMode ? '#0E1116' : '#F2F4F7';
  const cardBg = isDarkMode ? '#14181F' : '#FFFFFF';
  const cardBgAlt = isDarkMode ? '#0E1116' : '#F8F9FA';
  const border = isDarkMode ? 'rgba(255, 255, 255, 0.06)' : '#E4E7EC';
  const borderAlt = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#D0D5DD';
  const textMain = isDarkMode ? '#F2F2F0' : '#0F172A';
  const textMuted = isDarkMode ? '#9CA3AF' : '#475467';
  const inputBg = isDarkMode ? '#0E1116' : '#F9FAFB';

  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg,
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: border,
    backgroundColor: bg,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: textMain,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#D98A3D',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroTextContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeadingTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: 14,
    color: textMuted,
    lineHeight: 20,
  },
  divisionCard: {
    height: 150,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: border,
    elevation: 3,
  },
  divisionImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  divisionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  divisionContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  divisionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divisionName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  divisionTagline: {
    fontSize: 13,
    color: '#E5E7EB',
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: border,
    backgroundColor: cardBg,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 14,
    color: '#D98A3D',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  subHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: textMain,
    flex: 1,
  },
  filterContainer: {
    paddingVertical: 10,
    backgroundColor: bg,
    borderBottomWidth: 1,
    borderColor: border,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: cardBg,
    marginRight: 8,
    borderWidth: 1,
    borderColor: borderAlt,
  },
  categoryPillActive: {
    backgroundColor: '#D98A3D',
    borderColor: '#D98A3D',
  },
  categoryText: {
    fontSize: 12,
    color: textMuted,
    fontWeight: 'bold',
  },
  categoryTextActive: {
    color: bg,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  spotCard: {
    backgroundColor: cardBg,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: border,
    elevation: 2,
  },
  spotImage: {
    width: '100%',
    height: 180,
  },
  spotContent: {
    padding: 16,
  },
  spotTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  spotName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: textMain,
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 138, 61, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  tagPillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  miniTag: {
    backgroundColor: border,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: border,
  },
  miniTagText: {
    fontSize: 10,
    color: textMuted,
    fontWeight: '600',
  },
  spotFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: border,
    paddingTop: 12,
  },
  spotDuration: {
    fontSize: 12,
    color: textMuted,
  },
  spotFee: {
    fontSize: 12,
    color: textMuted,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    color: textMuted,
    marginTop: 10,
  },
  clearFilterBtn: {
    marginTop: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D98A3D',
  },
  clearFilterText: {
    color: '#D98A3D',
    fontSize: 13,
    fontWeight: 'bold',
  },
  detailScroll: {
    paddingBottom: 60,
  },
  detailImageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
    backgroundColor: bg,
  },
  detailImage: {
    width: '100%',
    height: '100%',
  },
  detailImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  sliderPagingContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  sliderDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  sliderDotActive: {
    width: 18,
    backgroundColor: '#FFFFFF',
  },
  detailInfoCard: {
    backgroundColor: bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  detailTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: textMain,
    flex: 1,
  },
  detailRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailRatingValue: {
    fontSize: 14,
    color: textMain,
    fontWeight: 'bold',
  },
  detailReviewsCount: {
    fontSize: 12,
    color: textMuted,
  },
  detailTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 20,
  },
  detailPillTag: {
    backgroundColor: 'rgba(217, 138, 61, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(217, 138, 61, 0.3)',
  },
  detailPillText: {
    fontSize: 11,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  detailSection: {
    marginBottom: 24,
  },
  detailSectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  detailBodyText: {
    fontSize: 14,
    color: textMuted,
    lineHeight: 22,
  },
  readMoreBtn: {
    marginTop: 8,
  },
  readMoreText: {
    fontSize: 13,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  infoCardGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  infoMiniCard: {
    flex: 1,
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  infoMiniTitle: {
    fontSize: 10,
    color: textMuted,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoMiniValue: {
    fontSize: 12,
    color: textMain,
    fontWeight: '600',
  },
  pricesCard: {
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: border,
  },
  priceLabel: {
    fontSize: 13,
    color: textMuted,
  },
  priceValue: {
    fontSize: 14,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  transportRouteItem: {
    backgroundColor: cardBg,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: border,
  },
  transportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  transportType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: textMain,
  },
  transportFare: {
    fontSize: 13,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  transportDesc: {
    fontSize: 11,
    color: textMuted,
  },
  fairPriceItem: {
    backgroundColor: cardBg,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: border,
  },
  fairPriceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  fairPriceName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: textMain,
  },
  fairPriceCost: {
    fontSize: 13,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  fairPriceDesc: {
    fontSize: 11,
    color: textMuted,
  },
  hotelCardMini: {
    width: 160,
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  hotelImageMini: {
    width: '100%',
    height: 90,
  },
  hotelInfoMini: {
    padding: 10,
    gap: 3,
  },
  hotelNameMini: {
    fontSize: 12,
    fontWeight: 'bold',
    color: textMain,
  },
  hotelRatingMini: {
    fontSize: 10,
    color: textMain,
  },
  hotelPriceMini: {
    fontSize: 11,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  hotelBookBtn: {
    backgroundColor: 'rgba(217, 138, 61, 0.15)',
    borderWidth: 1,
    borderColor: '#D98A3D',
    borderRadius: 12,
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 4,
  },
  hotelBookBtnText: {
    fontSize: 10,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  safetyItem: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  safetyBullet: {
    fontSize: 14,
    marginTop: 2,
  },
  safetyText: {
    fontSize: 13,
    color: textMuted,
    flex: 1,
    lineHeight: 18,
  },
  mainCTAButton: {
    backgroundColor: '#D98A3D',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 15,
  },
  mainCTAButtonText: {
    color: bg,
    fontWeight: 'bold',
    fontSize: 16,
  },
  plannerForm: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 10,
    marginTop: 16,
  },
  divisionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  divisionPickBtn: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  divisionPickBtnActive: {
    backgroundColor: '#D98A3D',
    borderColor: '#D98A3D',
  },
  divisionPickText: {
    fontSize: 13,
    color: textMuted,
    fontWeight: 'bold',
  },
  divisionPickTextActive: {
    color: bg,
  },
  textInput: {
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: borderAlt,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: textMain,
  },
  styleGroup: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  styleBtn: {
    flex: 1,
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  styleBtnActive: {
    borderColor: '#D98A3D',
    backgroundColor: 'rgba(217, 138, 61, 0.1)',
  },
  styleBtnText: {
    fontSize: 11,
    color: textMuted,
    fontWeight: 'bold',
  },
  styleBtnTextActive: {
    color: '#D98A3D',
  },
  primaryButton: {
    backgroundColor: '#D98A3D',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 15,
  },
  primaryButtonText: {
    color: bg,
    fontWeight: 'bold',
    fontSize: 14,
  },
  featuresPreviewList: {
    marginTop: 20,
    backgroundColor: cardBg,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: border,
  },
  previewHeading: {
    fontSize: 13,
    color: textMain,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  featureItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  featureItemText: {
    fontSize: 12,
    color: textMuted,
  },
  plannerResultCard: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  plannerResultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  plannerResultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: textMain,
    flex: 1,
  },
  resetPlannerBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: borderAlt,
  },
  plannerPickRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  plannerPickBox: {
    flex: 1,
    backgroundColor: cardBg,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: border,
  },
  plannerPickLabel: {
    fontSize: 10,
    color: textMuted,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  plannerPickVal: {
    fontSize: 13,
    color: textMain,
    fontWeight: 'bold',
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 100,
  },
  timelineIndicator: {
    width: 30,
    alignItems: 'center',
  },
  timelineCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D98A3D',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  timelineCircleText: {
    fontSize: 11,
    color: bg,
    fontWeight: 'bold',
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: borderAlt,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 20,
  },
  timelineDayTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 6,
  },
  timelineScheduleText: {
    fontSize: 12,
    color: textMuted,
    marginBottom: 4,
    lineHeight: 16,
  },
  budgetSummaryCard: {
    backgroundColor: cardBg,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: border,
    marginTop: 10,
  },
  budgetCardTitle: {
    fontSize: 13,
    color: textMain,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  budgetSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  budgetSummaryLabel: {
    fontSize: 12,
    color: textMuted,
  },
  budgetSummaryVal: {
    fontSize: 12,
    color: textMain,
    fontWeight: '600',
  },
  guideCard: {
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
  },
  guideHeaderRow: {
    flexDirection: 'row',
    gap: 14,
  },
  guidePhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: bg,
  },
  guideHeaderInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 3,
  },
  guideName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: textMain,
  },
  guideStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  guideRatingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: textMain,
  },
  guideReviewsText: {
    fontSize: 11,
    color: textMuted,
  },
  guideExperienceText: {
    fontSize: 11,
    color: '#D98A3D',
    fontWeight: '600',
  },
  guideBioBox: {
    backgroundColor: bg,
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    gap: 8,
  },
  guideBioText: {
    fontSize: 13,
    color: textMuted,
    lineHeight: 18,
  },
  guideLangsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  guideLangTag: {
    backgroundColor: borderAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  guideLangText: {
    fontSize: 10,
    color: textMain,
  },
  specSection: {
    marginTop: 12,
    gap: 6,
  },
  specLabel: {
    fontSize: 11,
    color: textMuted,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  specTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  specTag: {
    backgroundColor: 'rgba(217, 138, 61, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(217, 138, 61, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  specTagText: {
    fontSize: 11,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  guidePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: border,
  },
  guideLocationText: {
    fontSize: 12,
    color: textMuted,
  },
  guidePriceVal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D98A3D',
  },
  guideCardActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  guideBookBtn: {
    flex: 1,
    backgroundColor: '#D98A3D',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  guideBookBtnText: {
    color: bg,
    fontWeight: 'bold',
    fontSize: 13,
  },
  guideMsgBtn: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D98A3D',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  guideMsgBtnText: {
    color: '#D98A3D',
    fontWeight: 'bold',
    fontSize: 13,
  },
  emptyBookingsCard: {
    backgroundColor: cardBg,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: border,
  },
  emptyBookingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 8,
  },
  emptyBookingsDesc: {
    fontSize: 13,
    color: textMuted,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  bookingCard: {
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
  },
  bookingImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  bookingTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  bookingTypeText: {
    fontSize: 9,
    color: '#D98A3D',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bookingDate: {
    fontSize: 9,
    color: textMuted,
  },
  bookingName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: textMain,
  },
  bookingDetail: {
    fontSize: 11,
    color: textMuted,
    marginTop: 2,
  },
  bookingFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  bookingPrice: {
    fontSize: 13,
    color: textMain,
    fontWeight: 'bold',
  },
  cancelBookingBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  cancelBookingText: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: 'bold',
  },
  profileBox: {
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: border,
    borderWidth: 1,
    borderColor: borderAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: textMuted,
    textAlign: 'center',
    marginBottom: 16,
  },
  profileStatsRow: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: border,
    justifyContent: 'space-around',
  },
  profileStatBox: {
    alignItems: 'center',
  },
  profileStatVal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D98A3D',
  },
  profileStatLabel: {
    fontSize: 11,
    color: textMuted,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  logoutBtnText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '700',
  },
  profileMenuContainer: {
    marginHorizontal: 16,
    backgroundColor: cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: border,
    padding: 16,
    marginBottom: 30,
  },
  menuHeading: {
    fontSize: 12,
    color: textMuted,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: border,
  },
  menuLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    fontSize: 14,
    color: textMain,
    fontWeight: '600',
  },
  profileFooter: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerVersion: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: 'bold',
  },
  footerCopyright: {
    fontSize: 9,
    color: '#4B5563',
    marginTop: 4,
  },
  navBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: cardBg,
    borderTopWidth: 1,
    borderColor: borderAlt,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemText: {
    fontSize: 9,
    color: textMuted,
    marginTop: 3,
    fontWeight: 'bold',
  },
  navItemTextActive: {
    color: '#D98A3D',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: 'rgba(20, 24, 31, 0.95)',
    borderWidth: 1,
    borderColor: '#D98A3D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 9999,
  },
  toastText: {
    color: textMain,
    fontSize: 13,
    fontWeight: 'bold',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: borderAlt,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: textMain,
  },
  modalInputLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: textMuted,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  modalInput: {
    backgroundColor: bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: borderAlt,
    padding: 12,
    fontSize: 14,
    color: textMain,
    marginBottom: 16,
  },
  guideFormInput: {
    backgroundColor: bg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: borderAlt,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: textMain,
    minHeight: 46,
    marginBottom: 0,
  },
  guideTextArea: {
    minHeight: 96,
    paddingTop: 12,
  },
  guideDatePicker: {
    backgroundColor: bg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: borderAlt,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 46,
    justifyContent: 'center',
  },
  guideDatePickerLabel: {
    fontSize: 10,
    color: textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  guideDatePickerValue: {
    fontSize: 14,
    color: textMain,
  },
  datePickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  datePickerCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: cardBg,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: borderAlt,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  datePickerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: textMain,
  },
  datePickerClose: {
    fontSize: 12,
    color: '#D98A3D',
    fontWeight: '700',
  },
  datePickerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePickerNavText: {
    fontSize: 18,
    color: '#D98A3D',
    fontWeight: '700',
    paddingHorizontal: 8,
  },
  datePickerMonth: {
    fontSize: 14,
    fontWeight: '700',
    color: textMain,
  },
  datePickerWeekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  datePickerWeekText: {
    width: 34,
    textAlign: 'center',
    fontSize: 11,
    color: textMuted,
    fontWeight: '700',
  },
  datePickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  datePickerDayCell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  datePickerDayCellActive: {
    backgroundColor: 'transparent',
  },
  datePickerDayCellMuted: {
    opacity: 0.35,
  },
  datePickerDayCellSelected: {
    backgroundColor: '#D98A3D',
  },
  datePickerDayText: {
    fontSize: 13,
    fontWeight: '700',
  },
  datePickerDayTextActive: {
    color: textMain,
  },
  datePickerDayTextMuted: {
    color: '#6B7280',
  },
  datePickerDayTextSelected: {
    color: bg,
  },
  modalCancelBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 12,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  chatAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  chatGuideName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: textMain,
  },
  chatGuideStatus: {
    fontSize: 10,
    color: '#D98A3D',
    fontWeight: '600',
  },
  chatScrollView: {
    flex: 1,
    backgroundColor: bg,
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: border,
  },
  systemBubble: {
    backgroundColor: 'rgba(217, 138, 61, 0.1)',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(217, 138, 61, 0.2)',
    alignItems: 'center',
  },
  systemBubbleText: {
    fontSize: 11,
    color: '#D98A3D',
    textAlign: 'center',
    lineHeight: 16,
  },
  messageRow: {
    flexDirection: 'row',
    width: '100%',
  },
  messageUserRow: {
    justifyContent: 'flex-end',
  },
  messageGuideRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  messageUserBubble: {
    backgroundColor: '#D98A3D',
    borderBottomRightRadius: 2,
  },
  messageGuideBubble: {
    backgroundColor: cardBg,
    borderBottomLeftRadius: 2,
    borderWidth: 1,
    borderColor: border,
  },
  messageUserText: {
    fontSize: 13,
    color: bg,
    lineHeight: 18,
  },
  messageGuideText: {
    fontSize: 13,
    color: textMain,
    lineHeight: 18,
  },
  messageUserTime: {
    fontSize: 9,
    color: 'rgba(0,0,0,0.4)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  messageGuideTime: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.3)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  chatInputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    backgroundColor: bg,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: textMain,
    borderWidth: 1,
    borderColor: borderAlt,
  },
  chatSendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D98A3D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // ===== New Trip Builder Styles =====
  backTripBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  backTripText: {
    fontSize: 13,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  tripSummaryCard: {
    marginHorizontal: 16,
    backgroundColor: cardBg,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(217, 138, 61, 0.2)',
    marginBottom: 20,
  },
  tripSummaryTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  overviewGridItem: {
    width: '47%',
    backgroundColor: bg,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  overviewLabel: {
    fontSize: 10,
    color: textMuted,
    marginBottom: 4,
  },
  overviewValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#D98A3D',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  routeFlowCard: {
    backgroundColor: cardBg,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: border,
  },
  routeFlowContent: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  routeFlowStepStart: {
    fontSize: 12,
    fontWeight: 'bold',
    color: textMuted,
  },
  routeFlowStepDest: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#D98A3D',
  },
  explanationBox: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'rgba(217, 138, 61, 0.08)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(217, 138, 61, 0.15)',
  },
  explanationText: {
    fontSize: 11,
    color: textMuted,
    lineHeight: 16,
    flex: 1,
  },
  dayItineraryCard: {
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: border,
  },
  dayItineraryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  dayItineraryBadge: {
    backgroundColor: '#D98A3D',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dayItineraryNumber: {
    fontSize: 11,
    fontWeight: 'bold',
    color: bg,
  },
  dayItineraryDest: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: textMain,
  },
  dayDetailsBox: {
    backgroundColor: bg,
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
    gap: 4,
  },
  dayDetailLabel: {
    fontSize: 11,
    color: textMuted,
  },
  dayDetailVal: {
    fontWeight: '600',
    color: textMain,
  },
  timelineContainer: {
    gap: 12,
  },
  timelineItemRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineDotColumn: {
    alignItems: 'center',
    width: 12,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D98A3D',
    marginTop: 4,
  },
  timelineLineConnector: {
    width: 2,
    flex: 1,
    backgroundColor: borderAlt,
    marginTop: 4,
  },
  timelineContentColumn: {
    flex: 1,
    paddingBottom: 4,
  },
  timelineTimeText: {
    fontSize: 10,
    color: '#D98A3D',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  timelineActivityText: {
    fontSize: 12,
    color: textMuted,
    lineHeight: 16,
  },
  attractionCard: {
    backgroundColor: cardBg,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: border,
  },
  attractionImage: {
    width: '100%',
    height: 150,
  },
  attractionBody: {
    padding: 14,
  },
  attractionNameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: textMain,
  },
  attractionDivisionText: {
    fontSize: 10,
    color: '#D98A3D',
    marginBottom: 8,
  },
  attractionDescText: {
    fontSize: 12,
    color: textMuted,
    lineHeight: 16,
    marginBottom: 12,
  },
  whyVisitBox: {
    backgroundColor: bg,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  whyVisitLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D98A3D',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  whyVisitVal: {
    fontSize: 11,
    color: textMuted,
    lineHeight: 15,
  },
  attractionFooterDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: border,
    paddingTop: 10,
  },
  attractionDetailCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attractionDetailValText: {
    fontSize: 11,
    color: textMuted,
  },
  transportGuideCard: {
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: border,
  },
  transportHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  transportMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  transportMethodName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#D98A3D',
  },
  transportOverview: {
    fontSize: 12,
    color: textMuted,
    lineHeight: 16,
    marginBottom: 10,
  },
  transportSectionLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 4,
  },
  transportBullet: {
    fontSize: 11,
    color: textMuted,
    marginBottom: 3,
  },
  transportTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: border,
  },
  transportTimeText: {
    fontSize: 11,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  foodRecCard: {
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: border,
  },
  foodSectionLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  famousFoodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  foodItemTag: {
    backgroundColor: 'rgba(217, 138, 61, 0.1)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(217, 138, 61, 0.2)',
  },
  foodItemText: {
    fontSize: 11,
    color: '#D98A3D',
  },
  foodItemBullet: {
    fontSize: 12,
    color: textMuted,
    marginBottom: 4,
  },
  diningNotesBox: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: border,
  },
  diningNotesText: {
    fontSize: 11,
    color: textMuted,
    fontStyle: 'italic',
  },
  accommodationCard: {
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: border,
  },
  accommodationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  accommodationHotelName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: textMain,
  },
  hotelDetailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: bg,
    borderRadius: 8,
    padding: 10,
  },
  hotelDetailItem: {
    alignItems: 'center',
    width: '32%',
  },
  hotelDetailLabel: {
    fontSize: 9,
    color: textMuted,
    marginBottom: 2,
  },
  hotelDetailVal: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D98A3D',
    textAlign: 'center',
  },
  costBreakdownCard: {
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: border,
  },
  costItemRowDetailed: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  costItemInfo: {
    flex: 1,
  },
  costItemHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 2,
  },
  costItemMath: {
    fontSize: 10,
    color: textMuted,
    lineHeight: 14,
  },
  costItemTotalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: textMain,
  },
  costDivider: {
    height: 1,
    backgroundColor: borderAlt,
    marginVertical: 12,
  },
  finalCostSummaryBlock: {
    backgroundColor: 'rgba(217, 138, 61, 0.1)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(217, 138, 61, 0.2)',
    gap: 6,
  },
  costSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costSummaryLabel: {
    fontSize: 11,
    color: textMuted,
    fontWeight: '600',
  },
  costSummaryValueTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D98A3D',
  },
  costSummaryValuePerPerson: {
    fontSize: 13,
    fontWeight: 'bold',
    color: textMain,
  },
  costSummaryBudgetTag: {
    fontSize: 10,
    fontWeight: 'bold',
    color: bg,
    backgroundColor: '#D98A3D',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginVertical: 15,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#D98A3D',
    borderRadius: 30,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#D98A3D',
    fontWeight: 'bold',
    fontSize: 14,
  },
  formGroup: {
    marginBottom: 16,
  },
  toggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleSwitch: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: cardBg,
    justifyContent: 'center',
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: borderAlt,
  },
  toggleSwitchActive: {
    backgroundColor: 'rgba(217, 138, 61, 0.3)',
    borderColor: '#D98A3D',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: textMuted,
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    backgroundColor: '#D98A3D',
    alignSelf: 'flex-end',
  },
  selectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  gridBtn: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  gridBtnActive: {
    backgroundColor: '#D98A3D',
    borderColor: '#D98A3D',
  },
  gridBtnText: {
    fontSize: 12,
    color: textMuted,
    fontWeight: '600',
  },
  gridBtnTextActive: {
    color: bg,
  },
  subLabel: {
    fontSize: 11,
    color: textMuted,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  placeInputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  placesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  placeTag: {
    backgroundColor: 'rgba(217, 138, 61, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(217, 138, 61, 0.3)',
  },
  placeTagText: {
    fontSize: 11,
    color: '#D98A3D',
    fontWeight: '600',
  },
  numberInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  numberBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: borderAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberBtnText: {
    fontSize: 16,
    color: '#D98A3D',
    fontWeight: 'bold',
  },
  generateButton: {
    backgroundColor: '#D98A3D',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    flexDirection: 'row',
  },
  generateButtonText: {
    color: bg,
    fontWeight: 'bold',
    fontSize: 14,
  },

  // NEW TRIP BUILDER SPECIFIC UI STYLES
  travelerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  travelerBtn: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: border,
    paddingVertical: 10,
    alignItems: 'center',
  },
  travelerBtnActive: {
    backgroundColor: '#D98A3D',
    borderColor: '#D98A3D',
  },
  travelerBtnText: {
    fontSize: 12,
    color: textMuted,
    fontWeight: '600',
  },
  travelerBtnTextActive: {
    color: bg,
  },
  durationRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 6,
  },
  durationCounterCol: {
    flex: 1,
    backgroundColor: cardBg,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: border,
    alignItems: 'center',
  },
  durationCounterLabel: {
    fontSize: 10,
    color: textMuted,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  durationValueText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: textMain,
    minWidth: 60,
    textAlign: 'center',
  },
  budgetSelectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 6,
  },
  budgetOptionCard: {
    flex: 1,
    backgroundColor: cardBg,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: border,
    alignItems: 'center',
  },
  budgetOptionCardActive: {
    borderColor: '#D98A3D',
    backgroundColor: 'rgba(217, 138, 61, 0.1)',
  },
  budgetOptionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 4,
  },
  budgetOptionTitleActive: {
    color: '#D98A3D',
  },
  budgetOptionDesc: {
    fontSize: 8,
    color: textMuted,
    textAlign: 'center',
    lineHeight: 11,
  },
  budgetOptionDescActive: {
    color: textMain,
  },
  startLocationRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  detectBtn: {
    backgroundColor: '#D98A3D',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  detectBtnText: {
    color: bg,
    fontWeight: 'bold',
    fontSize: 12,
  },
  suggestionsDropdown: {
    backgroundColor: cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: borderAlt,
    marginTop: 4,
    overflow: 'hidden',
    zIndex: 10,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: border,
  },
  suggestionName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: textMain,
  },
  suggestionDivision: {
    fontSize: 9,
    color: textMuted,
  },
  noSuggestionsText: {
    fontSize: 11,
    color: textMuted,
    padding: 12,
    textAlign: 'center',
  },
  routeOrderLabel: {
    fontSize: 11,
    color: textMuted,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  resultContainer: {
    flex: 1,
  },
  travelerValueBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: cardBg,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minWidth: 110,
    justifyContent: 'center',
  },
  travelerInputInline: {
    fontSize: 14,
    fontWeight: 'bold',
    color: textMain,
    width: 28,
    padding: 0,
    margin: 0,
  },
  numberBtnDisabled: {
    opacity: 0.3,
  },

  // ─── Auth Screens ─────────────────────────────────────────────────
  authLogoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(217,138,61,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(217,138,61,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  authPageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: textMain,
    marginBottom: 4,
    textAlign: 'center',
  },
  authPageSubtitle: {
    fontSize: 13,
    color: textMuted,
    textAlign: 'center',
  },
  authErrorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239,68,68,0.12)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
  },
  authErrorText: {
    color: '#EF4444',
    fontSize: 12,
    flex: 1,
    fontWeight: '500',
  },
  authFieldLabel: {
    fontSize: 12,
    color: textMuted,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  authInput: {
    backgroundColor: inputBg,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: textMain,
    fontSize: 14,
    marginBottom: 14,
  },
  authPasswordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  authEyeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    backgroundColor: inputBg,
  },
  authDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
    gap: 10,
  },
  authDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: border,
  },
  authDividerText: {
    fontSize: 11,
    color: textMuted,
    fontWeight: '700',
  },
  authSecondaryBtn: {
    borderWidth: 1.5,
    borderColor: '#D98A3D',
    borderRadius: 30,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authSecondaryBtnText: {
    color: '#D98A3D',
    fontWeight: '700',
    fontSize: 14,
  },
  authGenderBtn: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: border,
    backgroundColor: cardBg,
  },
  authGenderBtnActive: {
    backgroundColor: '#D98A3D',
    borderColor: '#D98A3D',
  },
  authGenderBtnText: {
    fontSize: 13,
    color: textMuted,
    fontWeight: '600',
  },
  authGenderBtnTextActive: {
    color: bg,
  },
  authDocSection: {
    backgroundColor: cardBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: border,
  },
  authDocSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: textMain,
    marginBottom: 4,
  },
  authDocSectionSub: {
    fontSize: 11,
    color: textMuted,
    marginBottom: 12,
  },
  authDocTypeBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: border,
    backgroundColor: bg,
  },
  authDocTypeBtnActive: {
    backgroundColor: '#D98A3D',
    borderColor: '#D98A3D',
  },
  authDocTypeBtnText: {
    fontSize: 12,
    color: textMuted,
    fontWeight: '600',
  },
  authDocTypeBtnTextActive: {
    color: bg,
  },
  authDocPickerBtn: {
    backgroundColor: bg,
    borderWidth: 1.5,
    borderColor: 'rgba(217,138,61,0.35)',
    borderRadius: 10,
    borderStyle: 'dashed' as any,
    overflow: 'hidden',
    minHeight: 60,
    justifyContent: 'center',
  },

  // ─── Enhanced Profile Card ─────────────────────────────────────────
  authProfileCard: {
    backgroundColor: cardBg,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: borderAlt,
  },
  authProfileAvatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  authProfileAvatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: 'rgba(217,138,61,0.12)',
    borderWidth: 2,
    borderColor: 'rgba(217,138,61,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authProfileName: {
    fontSize: 18,
    fontWeight: '800',
    color: textMain,
    marginBottom: 4,
  },
  authProfileBadgeRow: {
    flexDirection: 'row',
  },
  authProfileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(217,138,61,0.15)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(217,138,61,0.3)',
  },
  authProfileBadgeText: {
    fontSize: 10,
    color: '#D98A3D',
    fontWeight: '700',
  },
  authInfoGrid: {
    gap: 10,
  },
  authInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: bg,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: border,
  },
  authInfoLabel: {
    fontSize: 10,
    color: textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  authInfoValue: {
    fontSize: 13,
    color: textMain,
    fontWeight: '600',
    marginTop: 1,
  },

  // ─── Travel Statistics Card ────────────────────────────────────────
  authStatsCard: {
    backgroundColor: cardBg,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: borderAlt,
  },
  authSectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: textMain,
    marginBottom: 14,
  },
  authStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  authStatBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: bg,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: border,
  },
  authStatVal: {
    fontSize: 22,
    fontWeight: '800',
    color: '#D98A3D',
  },
  authStatLabel: {
    fontSize: 10,
    color: textMuted,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
  },

  // ─── Achievement Badges Card ───────────────────────────────────────
  authBadgesCard: {
    backgroundColor: cardBg,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: borderAlt,
  },
  authBadgeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  authBadgeItem: {
    width: '46%',
    flexGrow: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
    gap: 3,
  },
  authBadgeLabel: {
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
  authBadgeDesc: {
    fontSize: 9,
    color: textMuted,
    textAlign: 'center',
    lineHeight: 13,
  },
});
}

