import type { Destination, Category, Division } from './data';

export type BudgetType = 'Low Budget' | 'Medium Budget' | 'Premium Budget';

export interface TripPlan {
  id: string;
  name: string;
  numberOfPeople: number;
  duration: number;
  fromLocation: string;
  budgetType: BudgetType;
  recommendedStyle: string;
  bestTravelOrder: string[];
  routeExplanation: string;
  transportGuide: TransportGuide;
  localTransportOptions: TransportOption[];
  foodRecommendations: FoodRecommendation[];
  accommodationSuggestions: AccommodationSuggestion[];
  estimatedCostPerPerson: number;
  startDate: string;
  destinations: TripDestination[];
  dailySchedule: DailySchedule[];
  costBreakdown: CostBreakdown;
  totalCost: number;
  createdAt: string;
  generatedDate?: string;
  travelDates?: {
    startDate?: string;
    endDate?: string;
  };
  travelerInfo?: {
    travelerCount: number;
    groupLabel: string;
  };
  tripOverview?: {
    destination: string;
    budget: string;
    duration: string;
    travelStyle: string;
  };
  bookingStatus?: 'Upcoming' | 'Ongoing' | 'Completed';
  status: 'draft' | 'confirmed' | 'completed' | 'cancelled' | 'ongoing';
}

export interface TripDestination {
  destination: Destination;
  daysToSpend: number;
  hotels: any[];
  selectedHotel?: any;
  activities: string[];
  highlights: AttractionHighlight[];
}

export interface AttractionHighlight {
  name: string;
  whyVisit: string;
  recommendedVisitingTime: string;
  estimatedTimeNeeded: string;
}

export interface TransportGuide {
  method: string;
  overview: string;
  alternatives: string[];
  estimatedTime: string;
}

export interface TransportOption {
  mode: string;
  description: string;
  estimatedCost: string;
}

export interface FoodRecommendation {
  destination: string;
  mustTryFoods: string[];
  notes: string;
}

export interface AccommodationSuggestion {
  destination: string;
  options: {
    name: string;
    costPerNight: number;
    suitableFor: string;
  }[];
}

export interface DailySchedule {
  day: number;
  destination: string;
  activities: string[];
  meals: string[];
  accommodation: string;
  transportInfo: string;
  timelineItems: TimelineItem[];
}

export interface TimelineItem {
  time: string;
  activity: string;
  cost?: number;
}

export interface CostBreakdown {
  accommodation: number;
  transport: number;
  food: number;
  entranceFees: number;
  guideService: number;
  miscellaneous: number;
}

export interface TripBuilderInput {
  numberOfPeople: number;
  duration: number;
  fromLocation: string;
  budgetType: BudgetType;
  exploreDivision: boolean;
  selectedDivision?: Division;
  selectedCategories?: Category[];
  customPlaces?: string[];
}
