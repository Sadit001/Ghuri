import { v4 as uuidv4 } from 'uuid';
import { MESSAGES } from '../constants/messages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { tripRepository } from '../repositories/tripRepository';
import { CostCalculationRequest, CostCalculationResult, DailyItinerary, TripPlan } from '../types/trip';
import { ApiError } from '../utils/apiError';

export class TripService {
  async createTrip(userId: string, tripData: Partial<TripPlan>): Promise<TripPlan> {
    const totalDays = tripData.totalDays || 3;
    const itinerary: DailyItinerary[] = tripData.itinerary || this.generateDefaultItinerary(tripData.destination || 'Dhaka', totalDays);

    const newTrip: TripPlan = {
      id: 'trip_' + uuidv4().substring(0, 8),
      userId,
      title: tripData.title || `Trip to ${tripData.destination || 'Bangladesh'}`,
      destination: tripData.destination || 'Dhaka',
      division: tripData.division || 'Dhaka',
      startDate: tripData.startDate || new Date().toISOString().split('T')[0],
      endDate: tripData.endDate || new Date(Date.now() + totalDays * 86400000).toISOString().split('T')[0],
      totalDays,
      adultsCount: tripData.adultsCount || 1,
      childrenCount: tripData.childrenCount || 0,
      budgetType: tripData.budgetType || 'Standard',
      transportMode: tripData.transportMode || 'Bus',
      estimatedTotalCost: tripData.estimatedTotalCost || 12000,
      itinerary,
      status: tripData.status || 'Planned',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return tripRepository.create(newTrip);
  }

  async getTripById(id: string): Promise<TripPlan> {
    const trip = await tripRepository.findById(id);
    if (!trip) {
      throw new ApiError(MESSAGES.TRIP.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return trip;
  }

  async getUserTrips(userId: string): Promise<TripPlan[]> {
    return tripRepository.findByUserId(userId);
  }

  async updateTrip(id: string, userId: string, tripData: Partial<TripPlan>): Promise<TripPlan> {
    const existing = await this.getTripById(id);
    if (existing.userId !== userId) {
      throw new ApiError('Unauthorized to update this trip.', HTTP_STATUS.FORBIDDEN);
    }
    const updated = await tripRepository.update(id, tripData);
    if (!updated) {
      throw new ApiError(MESSAGES.TRIP.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return updated;
  }

  async deleteTrip(id: string, userId: string): Promise<boolean> {
    const existing = await this.getTripById(id);
    if (existing.userId !== userId) {
      throw new ApiError('Unauthorized to delete this trip.', HTTP_STATUS.FORBIDDEN);
    }
    return tripRepository.delete(id);
  }

  calculateCost(req: CostCalculationRequest): CostCalculationResult {
    const days = Math.max(1, req.days || 1);
    const adults = Math.max(1, req.adults || 1);
    const children = Math.max(0, req.children || 0);
    const totalTravelers = adults + children * 0.5;

    let multiplier = 1.0;
    if (req.budgetType === 'Budget') multiplier = 0.6;
    if (req.budgetType === 'Luxury') multiplier = 2.2;

    const entryFees = Math.round(150 * days * totalTravelers);
    const accommodationCost = Math.round(2500 * days * Math.ceil(totalTravelers / 2) * multiplier);
    const foodCost = Math.round(800 * days * totalTravelers * multiplier);
    const transportCost = Math.round(1200 * totalTravelers * multiplier);
    const guidanceAndMisc = Math.round(500 * days * multiplier);

    const estimatedTotalCost = entryFees + accommodationCost + foodCost + transportCost + guidanceAndMisc;

    return {
      destination: req.destination,
      division: req.division,
      totalDays: days,
      travelers: { adults, children },
      budgetType: req.budgetType,
      breakdown: {
        entryFees,
        accommodationCost,
        foodCost,
        transportCost,
        guidanceAndMisc,
      },
      estimatedTotalCost,
    };
  }

  private generateDefaultItinerary(destination: string, days: number): DailyItinerary[] {
    const list: DailyItinerary[] = [];
    for (let i = 1; i <= days; i++) {
      list.push({
        day: i,
        title: `Day ${i}: Explore Highlights of ${destination}`,
        description: `Full day guided sightseeing and local food exploration around ${destination}.`,
        spots: [
          {
            spotName: `${destination} Central Heritage Site`,
            recommendedTime: '09:00 AM - 12:30 PM',
            entryFee: 100,
            description: 'Main attraction with cultural significance.',
          },
          {
            spotName: `${destination} Scenic Nature Viewpoint`,
            recommendedTime: '03:00 PM - 06:00 PM',
            entryFee: 50,
            description: 'Beautiful scenic landscape during sunset.',
          },
        ],
        mealRecommendation: 'Local Traditional Cuisine',
        stayOption: 'Standard Recommended Eco Resort',
        estimatedDayCost: 3500,
      });
    }
    return list;
  }
}

export const tripService = new TripService();
