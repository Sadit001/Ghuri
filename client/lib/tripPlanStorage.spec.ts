import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { TripPlan } from '../../shared/tripPlanner';

vi.mock('@react-native-async-storage/async-storage', () => {
  throw new Error('AsyncStorage unavailable in tests');
});

describe('ensureTripPlanData', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fills missing trip metadata and traveler details for saved plans', async () => {
    const basePlan: TripPlan = {
      id: 'trip-1',
      name: 'Weekend Escape',
      numberOfPeople: 3,
      duration: 2,
      fromLocation: 'Dhaka',
      budgetType: 'Medium Budget',
      recommendedStyle: 'Relaxed',
      bestTravelOrder: ['Cox\'s Bazar'],
      routeExplanation: 'Direct route',
      transportGuide: {
        method: 'Bus',
        overview: 'Comfortable',
        alternatives: ['Train'],
        estimatedTime: '6 hrs',
      },
      localTransportOptions: [],
      foodRecommendations: [],
      accommodationSuggestions: [],
      estimatedCostPerPerson: 5000,
      startDate: '2026-07-10',
      destinations: [],
      dailySchedule: [],
      costBreakdown: {
        accommodation: 1000,
        transport: 500,
        food: 300,
        entranceFees: 200,
        guideService: 100,
        miscellaneous: 100,
      },
      totalCost: 2200,
      createdAt: '2026-07-07T10:00:00.000Z',
      status: 'confirmed',
    };

    const { ensureTripPlanData } = await import('./tripPlanStorage');
    const normalized = ensureTripPlanData(basePlan);

    expect(normalized.generatedDate).toBe('2026-07-07');
    expect(normalized.travelDates?.startDate).toBe('2026-07-10');
    expect(normalized.travelDates?.endDate).toBe('2026-07-12');
    expect(normalized.travelerInfo?.travelerCount).toBe(3);
    expect(normalized.tripOverview?.destination).toBe("Cox's Bazar");
  });

  it('loads previously saved plans from browser storage on startup', async () => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(JSON.stringify([{ id: 'trip-1', status: 'confirmed' }])),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };

    vi.stubGlobal('window', { localStorage: localStorageMock });
    vi.stubGlobal('localStorage', localStorageMock);

    const { loadSavedTripPlans } = await import('./tripPlanStorage');
    const plans = await loadSavedTripPlans();

    expect(plans).toHaveLength(1);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('saved_trip_plans');
  });
});
