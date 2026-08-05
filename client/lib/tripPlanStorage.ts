import type { TripPlan } from '@shared/tripPlanner';

const SAVED_TRIP_PLANS_KEY = 'saved_trip_plans';

type StorageAdapter = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

let storageAdapter: StorageAdapter | null = null;

async function getStorageAdapter(): Promise<StorageAdapter> {
  if (storageAdapter) {
    return storageAdapter;
  }

  try {
    const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default as StorageAdapter;
    storageAdapter = {
      getItem: async (key) => AsyncStorage.getItem(key),
      setItem: async (key, value) => {
        await AsyncStorage.setItem(key, value);
      },
      removeItem: async (key) => {
        await AsyncStorage.removeItem(key);
      },
    };
    return storageAdapter;
  } catch {
    if (typeof window !== 'undefined' && window.localStorage) {
      storageAdapter = {
        getItem: async (key) => window.localStorage.getItem(key),
        setItem: async (key, value) => {
          window.localStorage.setItem(key, value);
        },
        removeItem: async (key) => {
          window.localStorage.removeItem(key);
        },
      };
      return storageAdapter;
    }

    throw new Error('Storage adapter is unavailable.');
  }
}

export function getTripPlanDisplayStatus(plan: TripPlan): 'Upcoming' | 'Ongoing' | 'Completed' {
  if (plan.status === 'completed') return 'Completed';
  if (plan.status === 'confirmed') {
    return plan.travelDates?.endDate && new Date(plan.travelDates.endDate) < new Date() ? 'Completed' : 'Upcoming';
  }
  if (plan.status === 'ongoing') return 'Ongoing';
  return 'Upcoming';
}

export function formatTripPlanDate(value?: string) {
  if (!value) return 'Not available';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not available';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ensureTripPlanData(plan: TripPlan): TripPlan {
  const createdAt = plan.createdAt || new Date().toISOString();
  const generatedDate = plan.generatedDate || createdAt.split('T')[0];
  const startDate = plan.startDate || generatedDate;
  const duration = Number(plan.duration) || 1;
  const numberOfPeople = Number(plan.numberOfPeople) || 1;
  const bestTravelOrder = Array.isArray(plan.bestTravelOrder) ? plan.bestTravelOrder : [];
  const destinations = Array.isArray(plan.destinations) ? plan.destinations : [];
  const endDate = plan.travelDates?.endDate || new Date(new Date(startDate).getTime() + duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return {
    ...plan,
    createdAt,
    generatedDate,
    startDate,
    duration,
    numberOfPeople,
    budgetType: plan.budgetType || 'Medium Budget',
    recommendedStyle: plan.recommendedStyle || 'Flexible',
    bestTravelOrder,
    destinations,
    dailySchedule: plan.dailySchedule || [],
    foodRecommendations: plan.foodRecommendations || [],
    accommodationSuggestions: plan.accommodationSuggestions || [],
    localTransportOptions: plan.localTransportOptions || [],
    transportGuide: plan.transportGuide || {
      method: 'Not specified',
      overview: 'Details will be added soon.',
      alternatives: [],
      estimatedTime: 'Not available',
    },
    costBreakdown: plan.costBreakdown || {
      accommodation: 0,
      transport: 0,
      food: 0,
      entranceFees: 0,
      guideService: 0,
      miscellaneous: 0,
    },
    totalCost: Number(plan.totalCost) || 0,
    estimatedCostPerPerson: Number(plan.estimatedCostPerPerson) || 0,
    status: plan.status || 'confirmed',
    travelDates: {
      startDate,
      endDate,
      ...plan.travelDates,
    },
    travelerInfo: plan.travelerInfo || {
      travelerCount: numberOfPeople,
      groupLabel: `${numberOfPeople} traveler${numberOfPeople > 1 ? 's' : ''}`,
    },
    tripOverview: plan.tripOverview || {
      destination: destinations.map((entry) => entry.destination?.name).filter(Boolean).join(', ') || bestTravelOrder.join(', ') || 'Not available',
      budget: plan.budgetType || 'Medium Budget',
      duration: `${duration} Days`,
      travelStyle: plan.recommendedStyle || 'Flexible',
    },
  };
}

export async function loadSavedTripPlans(): Promise<TripPlan[]> {
  try {
    const storage = await getStorageAdapter();
    const stored = await storage.getItem(SAVED_TRIP_PLANS_KEY);
    if (!stored) {
      if (typeof window !== 'undefined' && window.localStorage) {
        const fallback = window.localStorage.getItem(SAVED_TRIP_PLANS_KEY);
        if (fallback) {
          const parsed = JSON.parse(fallback) as TripPlan[];
          await persistSavedTripPlans(parsed);
          return parsed.map(ensureTripPlanData);
        }
      }
      return [];
    }

    const parsed = JSON.parse(stored) as TripPlan[];
    return parsed.map(ensureTripPlanData);
  } catch {
    return [];
  }
}

export async function persistSavedTripPlans(plans: TripPlan[]) {
  const normalizedPlans = plans.map(ensureTripPlanData);
  const storage = await getStorageAdapter();
  await storage.setItem(SAVED_TRIP_PLANS_KEY, JSON.stringify(normalizedPlans));

  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(SAVED_TRIP_PLANS_KEY, JSON.stringify(normalizedPlans));
  }
}

export async function saveTripPlan(plan: TripPlan): Promise<TripPlan[]> {
  const normalizedPlan = ensureTripPlanData(plan);
  const existingPlans = await loadSavedTripPlans();
  const hasDuplicate = existingPlans.some((item) => item.id === normalizedPlan.id);
  const nextPlans = hasDuplicate
    ? existingPlans.map((item) => (item.id === normalizedPlan.id ? normalizedPlan : item))
    : [...existingPlans, normalizedPlan];

  await persistSavedTripPlans(nextPlans);
  return nextPlans;
}
