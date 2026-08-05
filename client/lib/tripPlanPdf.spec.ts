import { describe, it, expect, vi } from 'vitest';
import type { TripPlan } from '../../shared/tripPlanner';

vi.mock('expo-print', () => ({
  printToFileAsync: vi.fn(),
}));

vi.mock('expo-sharing', () => ({
  shareAsync: vi.fn(),
}));

const { buildTripPlanPdfHtml } = await import('./tripPlanPdf');

describe('buildTripPlanPdfHtml', () => {
  it('includes the full trip builder sections in the exported PDF markup', () => {
    const plan: TripPlan = {
      id: 'trip-1',
      name: 'Weekend Escape',
      numberOfPeople: 2,
      duration: 3,
      fromLocation: 'Dhaka',
      budgetType: 'Medium Budget',
      recommendedStyle: 'Relaxed',
      bestTravelOrder: ['Cox\'s Bazar', 'Saint Martin'],
      routeExplanation: 'Traveling by bus and ferry for a relaxed pace.',
      transportGuide: {
        method: 'Bus + Ferry',
        overview: 'Comfortable route with scenic stops.',
        alternatives: ['Flight + Ferry'],
        estimatedTime: '6 hours',
      },
      localTransportOptions: [
        { mode: 'CNG', description: 'Local travel', estimatedCost: '৳300' },
      ],
      foodRecommendations: [
        { destination: 'Cox\'s Bazar', mustTryFoods: ['Seafood'], notes: 'Fresh local seafood' },
      ],
      accommodationSuggestions: [
        { destination: 'Cox\'s Bazar', options: [{ name: 'Ocean View', costPerNight: 5000, suitableFor: 'Couples' }] },
      ],
      estimatedCostPerPerson: 12000,
      startDate: '2026-07-10',
      destinations: [
        {
          destination: { id: 'cox', name: 'Cox\'s Bazar', division: 'Chattogram', categories: [], rating: 4.5, reviews: 10, description: 'Beach', fullHistory: '', images: [], localEntryFee: 0, foreignEntryFee: 0, openingHours: '', bestTimeToVisit: { season: 'Winter', timeOfDay: 'Morning' }, transportOptions: [], nearbyHotels: [], nearbyFood: [], safetyTips: [], userReviews: [], estimatedVisitDuration: '2 hours' },
          daysToSpend: 2,
          hotels: [],
          activities: ['Beach walk'],
          highlights: [{ name: 'Laboni Point', whyVisit: 'Best sunset view', recommendedVisitingTime: 'Evening', estimatedTimeNeeded: '2 hours' }],
        },
      ],
      dailySchedule: [
        {
          day: 1,
          destination: 'Cox\'s Bazar',
          activities: ['Arrival'],
          meals: ['Dinner'],
          accommodation: 'Beach hotel',
          transportInfo: 'Private car',
          timelineItems: [{ time: '09:00', activity: 'Arrival' }],
        },
      ],
      costBreakdown: {
        accommodation: 10000,
        transport: 3000,
        food: 2000,
        entranceFees: 1000,
        guideService: 1500,
        miscellaneous: 500,
      },
      totalCost: 18000,
      createdAt: '2026-07-07T10:00:00.000Z',
      status: 'confirmed',
    };

    const html = buildTripPlanPdfHtml(plan);

    expect(html).toContain('Trip Overview');
    expect(html).toContain('Best Travel Order');
    expect(html).toContain('Transportation Guide');
    expect(html).toContain('Day-by-Day Itinerary');
    expect(html).toContain('Tourist Attractions');
    expect(html).toContain('Accommodation Suggestions');
    expect(html).toContain('Food Recommendations');
    expect(html).toContain('Cost Breakdown');
    expect(html).toContain('Laboni Point');
  });
});
