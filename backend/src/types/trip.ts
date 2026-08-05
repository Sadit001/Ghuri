export type BudgetType = 'Budget' | 'Standard' | 'Luxury';

export interface ItinerarySpot {
  spotName: string;
  recommendedTime: string;
  entryFee: number;
  description?: string;
}

export interface DailyItinerary {
  day: number;
  title: string;
  description: string;
  spots: ItinerarySpot[];
  mealRecommendation: string;
  stayOption: string;
  estimatedDayCost: number;
}

export interface TripPlan {
  id?: string;
  userId: string;
  title: string;
  destination: string;
  division: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  adultsCount: number;
  childrenCount: number;
  budgetType: BudgetType;
  transportMode: string;
  estimatedTotalCost: number;
  itinerary: DailyItinerary[];
  status: 'Planned' | 'Ongoing' | 'Completed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CostCalculationRequest {
  destination: string;
  division: string;
  days: number;
  adults: number;
  children: number;
  budgetType: BudgetType;
  transportMode?: string;
}

export interface CostCalculationResult {
  destination: string;
  division: string;
  totalDays: number;
  travelers: {
    adults: number;
    children: number;
  };
  budgetType: BudgetType;
  breakdown: {
    entryFees: number;
    accommodationCost: number;
    foodCost: number;
    transportCost: number;
    guidanceAndMisc: number;
  };
  estimatedTotalCost: number;
}
