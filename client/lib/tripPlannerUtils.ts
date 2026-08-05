import { destinations } from '../../shared/data';
import type { Destination, Division, Category } from '../../shared/data';
import type {
  TripPlan,
  TripBuilderInput,
  CostBreakdown,
  AttractionHighlight,
  TransportGuide,
  TransportOption,
  FoodRecommendation,
  AccommodationSuggestion,
  BudgetType,
} from '../../shared/tripPlanner';

// Bangla to English mapping for common Bangladesh locations
const BANGLA_TO_ENGLISH: Record<string, string> = {
  'ঢাকা': 'Dhaka',
  'চট্টগ্রাম': 'Chattogram',
  'চট্টগ্রামম': 'Chattogram',
  'রাজশাহী': 'Rajshahi',
  'খুলনা': 'Khulna',
  'বরিশাল': 'Barishal',
  'সিলেট': 'Sylhet',
  'রংপুর': 'Rangpur',
  'ময়মনসিংহ': 'Mymensingh',
  'কক্সবাজার': "Cox's Bazar",
  'সেন্ট মার্টিন': 'Saint Martin',
  'বান্দরবান': 'Bandarban',
  'খাগড়াছড়ি': 'Khagrachari',
  'রাঙ্গামাটি': 'Rangamati',
  'দীঘিনালা': 'Dighinala',
  'সুন্দরবন': 'Sundarbans',
  'কুয়াকাটা': 'Kuakata',
  'টাঙ্গুয়ার হাওর': 'Tanguar Haor',
};

function normalizeBanglaInput(input: string): string {
  // Check if input is in Bangla and convert to English
  for (const [bangla, english] of Object.entries(BANGLA_TO_ENGLISH)) {
    if (input.toLowerCase().includes(bangla)) {
      return english;
    }
  }
  return input;
}

const DIVISION_ORDER: Division[] = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
];

function validateTripFeasibility(dests: Destination[], duration: number) {
  if (dests.length <= 1) return;

  const divisions = Array.from(new Set(dests.map(d => d.division)));

  // Check if any destination is a remote island requiring heavy travel time
  const hasRemoteIsland = dests.some(d => 
    d.name.toLowerCase().includes("saint martin") || 
    d.name.toLowerCase().includes("chera dwip")
  );

  // 1. Division Spanning Check
  if (divisions.length > 1) {
    let minDays = 3;
    if (divisions.length === 3) minDays = 5;
    if (divisions.length >= 4) minDays = 7;
    
    // Add extra travel day if a remote island is in the mix
    if (hasRemoteIsland) {
      minDays += 1;
    }

    if (duration < minDays) {
      const examples = dests.slice(0, 2).map(d => `${d.name} (${d.division})`).join(" and ");
      let message = `Visiting places in different regions (${divisions.join(" and ")}) like ${examples} within a ${duration}-day trip is not feasible due to travel distances. `;
      if (hasRemoteIsland) {
        message += `Traveling to Saint Martin's Island requires taking a ship/ferry from Teknaf, which adds significantly to travel time. `;
      } else {
        message += `Travel time between these divisions is typically 6–10 hours. `;
      }
      message += `We gently suggest extending your trip to at least ${minDays} days, or selecting destinations within the same division.`;
      
      throw new Error(message);
    }
  }

  // 2. Specific Distant Pairs within Chattogram Division Check (e.g. Sajek/Bandarban to Cox's/Saint Martin)
  const hasSajekOrBandarban = dests.some(d => 
    d.name.toLowerCase().includes("sajek") || 
    d.name.toLowerCase().includes("bandarban") || 
    d.name.toLowerCase().includes("nilgiri") || 
    d.name.toLowerCase().includes("nilachal")
  );
  const hasSaintMartinOrCoxs = dests.some(d => 
    d.name.toLowerCase().includes("saint martin") || 
    d.name.toLowerCase().includes("chera dwip") || 
    d.name.toLowerCase().includes("cox's") || 
    d.name.toLowerCase().includes("inani")
  );

  if (hasSajekOrBandarban && hasSaintMartinOrCoxs && duration < 4) {
    const hillPlace = dests.find(d => 
      d.name.toLowerCase().includes("sajek") || d.name.toLowerCase().includes("bandarban")
    )?.name || "Bandarban/Sajek";
    const beachPlace = dests.find(d => 
      d.name.toLowerCase().includes("saint martin") || d.name.toLowerCase().includes("cox's")
    )?.name || "Cox's Bazar/Saint Martin";

    throw new Error(`Combining the deep hill tracts (${hillPlace}) and beach destinations (${beachPlace}) within a ${duration}-day trip is not feasible. The travel time between them is over 10–12 hours on mountain roads and highways. We suggest extending your trip to at least 4 days, or choosing only hill tracts / only beaches.`);
  }
}

export function generateTripPlan(input: TripBuilderInput): TripPlan {
  const selectedDestinations = filterDestinations(input);
  const orderedDestinations = optimizeDestinationOrder(selectedDestinations, input.fromLocation);
  
  validateTripFeasibility(orderedDestinations, input.duration);

  const destinationDays = distributeDays(orderedDestinations, input.duration);
  const costBreakdown = calculateCostBreakdown(
    orderedDestinations,
    destinationDays,
    input.numberOfPeople,
    input.duration,
    input.budgetType
  );

  // Hub mode: treat each destination as a hub with nearby attractions.
  // Only activate when the user selected a small number of specific destinations (≤3).
  // When exploring a whole division with many results, use normal behavior to avoid over-expansion.
  const useHubMode = orderedDestinations.length <= 3;

  const totalCost = (Object.values(costBreakdown) as number[]).reduce((sum, cost) => sum + cost, 0);
  const dailySchedule = generateDailySchedule(orderedDestinations, destinationDays, input.duration, input.budgetType, useHubMode);
  const bestTravelOrder = orderedDestinations.map((dest) => dest.name);
  const budgetMultiplier = getBudgetMultiplier(input.budgetType);

  const tripPlan: TripPlan = {
    id: `trip-${Date.now()}`,
    name: generateTripName(orderedDestinations),
    numberOfPeople: input.numberOfPeople,
    duration: input.duration,
    fromLocation: input.fromLocation,
    budgetType: input.budgetType,
    recommendedStyle: getRecommendedStyle(input.budgetType),
    bestTravelOrder,
    routeExplanation: generateRouteExplanation(input.fromLocation, bestTravelOrder),
    transportGuide: generateTransportGuide(input.fromLocation, orderedDestinations, input.budgetType),
    localTransportOptions: generateLocalTransportOptions(input.budgetType),
    foodRecommendations: useHubMode
      ? generateFoodRecommendationsForTrip(orderedDestinations, destinationDays, input.budgetType)
      : generateFoodRecommendations(orderedDestinations),
    accommodationSuggestions: generateAccommodationSuggestions(orderedDestinations, input.budgetType),
    estimatedCostPerPerson: Math.round(totalCost / Number(input.numberOfPeople)),
    startDate: new Date().toISOString().split('T')[0],
    destinations: orderedDestinations.map((dest, idx) => {
      if (!useHubMode) {
        // Original behavior for division-wide exploration
        return {
          destination: dest,
          daysToSpend: destinationDays[idx],
          hotels: dest.nearbyHotels || [],
          activities: generateActivities(dest),
          highlights: [{
            name: dest.name,
            whyVisit: dest.description,
            recommendedVisitingTime: dest.bestTimeToVisit.timeOfDay,
            estimatedTimeNeeded: dest.estimatedVisitDuration || '2-3 hours',
          }],
        };
      }

      // Hub mode: expand each destination with nearby attractions
      const daysHere = destinationDays[idx];
      const nearby = getNearbyAttractions(dest);
      const maxAttractions = daysHere * 2;
      const selectedNearby = nearby.slice(0, maxAttractions - 1);
      const sortedAttractions = [
        dest,
        ...selectedNearby.sort((a, b) => {
          const aInfo = getTravelInfo(a, dest, input.budgetType);
          const bInfo = getTravelInfo(b, dest, input.budgetType);
          return aInfo.timeVal - bInfo.timeVal;
        })
      ];

      const mergedActivities = Array.from(new Set(
        sortedAttractions.flatMap(attr => generateActivities(attr))
      ));

      return {
        destination: dest,
        daysToSpend: daysHere,
        hotels: dest.nearbyHotels || [],
        activities: mergedActivities,
        highlights: generateHubHighlights(dest, sortedAttractions, input.budgetType),
      };
    }),
    dailySchedule,
    costBreakdown,
    totalCost,
    createdAt: new Date().toISOString(),
    status: 'draft',
  };

  return tripPlan;
}

function filterDestinations(input: TripBuilderInput): Destination[] {
  if (input.exploreDivision && input.selectedDivision && input.selectedCategories) {
    return destinations.filter(
      (dest) =>
        dest.division === input.selectedDivision &&
        dest.categories.some((cat) => input.selectedCategories!.includes(cat))
    );
  }

  if (input.customPlaces && input.customPlaces.length > 0) {
    return destinations.filter((dest) =>
      input.customPlaces!.some((place) => {
        // Normalize Bangla input to English
        const normalizedPlace = normalizeBanglaInput(place);
        const searchText = normalizedPlace.toLowerCase().replace(/['']/g, '');
        return (
          dest.name.toLowerCase().replace(/['']/g, '').includes(searchText) ||
          dest.id.toLowerCase().includes(searchText) ||
          dest.division.toLowerCase().includes(searchText) ||
          dest.description.toLowerCase().includes(searchText)
        );
      })
    );
  }

  return [];
}

function optimizeDestinationOrder(dests: Destination[], fromLocation: string): Destination[] {
  const normalizedFrom = fromLocation.toLowerCase();
  const sameLocation = dests.filter((dest) =>
    normalizedFrom.includes(dest.division.toLowerCase()) ||
    normalizedFrom.includes(dest.name.toLowerCase())
  );
  const rest = dests.filter((dest) => !sameLocation.includes(dest));

  const sortedRest = rest.sort((a, b) => {
    const aPriority = DIVISION_ORDER.indexOf(a.division);
    const bPriority = DIVISION_ORDER.indexOf(b.division);
    return aPriority - bPriority;
  });

  return [...sameLocation, ...sortedRest];
}

function distributeDays(dests: Destination[], totalDays: number): number[] {
  if (dests.length === 0) return [];

  const base = Math.max(1, Math.floor(totalDays / dests.length));
  const remainder = totalDays - base * dests.length;
  return dests.map((_, idx) => base + (idx < remainder ? 1 : 0));
}

function calculateCostBreakdown(
  dests: Destination[],
  destinationDays: number[],
  numberOfPeople: number,
  totalDays: number,
  budgetType: BudgetType
): CostBreakdown {
  const multiplier = getBudgetMultiplier(budgetType);
  const accommodationRate = 2500 * multiplier;
  const foodRate = 900 * multiplier;
  const localTransportRate = 250 * multiplier;

  const accommodation = accommodationRate * Math.max(totalDays - 1, 1) * numberOfPeople;
  const food = foodRate * totalDays * numberOfPeople;

  let transport = 0;
  let entranceFees = 0;
  let guideService = 800 * totalDays;

  dests.forEach((dest, idx) => {
    const option = dest.transportOptions?.[0];
    if (option) {
      const averageFare = (option.fareRange.min + option.fareRange.max) / 2;
      transport += averageFare * numberOfPeople;
    }
    const avgFee = (dest.localEntryFee + dest.foreignEntryFee) / 2;
    entranceFees += avgFee * numberOfPeople * destinationDays[idx];
  });

  transport += localTransportRate * totalDays * numberOfPeople;
  const miscellaneous = Math.round((accommodation + transport + food + entranceFees + guideService) * 0.1);

  return {
    accommodation,
    transport,
    food,
    entranceFees,
    guideService,
    miscellaneous,
  };
}

const COMMON_WORDS = new Set([
  'beach', 'valley', 'island', 'lake', 'river', 'park', 'forest', 'fort', 'mosque', 
  'temple', 'shrine', 'museum', 'palace', 'rajbaris', 'rajbari', 'village', 'gardens', 
  'garden', 'hills', 'hill', 'waterfall', 'waterfalls', 'cave', 'bridge', 'vihara', 
  'monastery', 'ruins', 'house', 'houses', 'areas', 'area', 'edge', 'ecosystem', 
  'belt', 'kingdom', 'historical', 'memorial', 'centre', 'dighi', 'ghat', 'barrage', 
  'viewpoint', 'reservoir', 'wetlands', 'eco', 'landscape', 'lodge', 'castle', 
  'university', 'movement', 'spots', 'zero point', 'point', 'national', 'memorial', 
  'local', 'historical', 'ancient', 'attraction', 'scenic', 'nature'
]);

function getKeywords(name: string): string[] {
  return name.toLowerCase()
    .replace(/['’]s/g, '')
    .replace(/[^a-zA-Z\s]/g, ' ')
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length >= 3 && !COMMON_WORDS.has(w));
}

const nearbyCache = new Map<string, Destination[]>();

function getNearbyAttractions(hub: Destination): Destination[] {
  if (nearbyCache.has(hub.id)) {
    return nearbyCache.get(hub.id)!;
  }

  const hubKeywords = getKeywords(hub.name);
  const scored = destinations
    .filter(d => d.id !== hub.id && d.division === hub.division)
    .map(d => {
      let score = 0;
      const dKeywords = getKeywords(d.name);
      
      const nameLower = d.name.toLowerCase();
      const hubNameLower = hub.name.toLowerCase();
      
      // 1. Direct name/keyword match
      hubKeywords.forEach(kw => {
        if (nameLower.includes(kw)) score += 100;
      });
      dKeywords.forEach(kw => {
        if (hubNameLower.includes(kw)) score += 100;
      });

      // 2. Mentions in descriptions/history/transports
      const textBlockB = (
        d.description + " " + 
        d.fullHistory + " " + 
        (d.transportOptions?.map(o => o.estimatedTime).join(" ") || "")
      ).toLowerCase();
      const textBlockA = (
        hub.description + " " + 
        hub.fullHistory + " " + 
        (hub.transportOptions?.map(o => o.estimatedTime).join(" ") || "")
      ).toLowerCase();
      
      hubKeywords.forEach(kw => {
        if (textBlockB.includes(kw)) score += 50;
      });
      dKeywords.forEach(kw => {
        if (textBlockA.includes(kw)) score += 50;
      });

      // 3. Category similarity
      const sharedCategories = d.categories.filter(cat => hub.categories.includes(cat));
      score += sharedCategories.length * 15;
      
      const keyCats: Category[] = ['Sea/Beach', 'Hill/Hill-Tracts', 'River/Waterfall', 'Historical', 'Religious'];
      keyCats.forEach(cat => {
        if (hub.categories.includes(cat) && d.categories.includes(cat)) {
          score += 25;
        }
      });

      // 4. Shared unique geographic terms
      const getGeoTerms = (text: string) => {
        const words = text.match(/[A-Z][a-zA-Z]+/g) || [];
        return new Set(words.map(w => w.toLowerCase()).filter(w => w.length >= 4 && !COMMON_WORDS.has(w)));
      };
      
      const termsA = getGeoTerms(hub.description + " " + hub.fullHistory);
      const termsB = getGeoTerms(d.description + " " + d.fullHistory);
      
      termsA.forEach(t => {
        if (termsB.has(t)) score += 30;
      });

      return { dest: d, score };
    });

  scored.sort((a, b) => b.score - a.score || b.dest.reviews - a.dest.reviews);

  let results = scored.filter(item => item.score > 0);
  if (results.length < 8) {
    const existingIds = new Set(results.map(r => r.dest.id));
    const divisionMates = scored.filter(item => !existingIds.has(item.dest.id));
    results = [...results, ...divisionMates];
  }

  const finalAttractions = results.map(r => r.dest);
  nearbyCache.set(hub.id, finalAttractions);
  return finalAttractions;
}

interface TravelInfo {
  mode: string;
  time: string;
  cost: string;
  timeVal: number;
}

function getTravelInfo(attraction: Destination, hub: Destination, budgetType: BudgetType): TravelInfo {
  let mode = budgetType === 'Premium Budget' ? 'Ride-share' : budgetType === 'Low Budget' ? 'Share CNG' : 'CNG';
  let time = '20-30 mins';
  let cost = budgetType === 'Premium Budget' ? '৳250-400' : budgetType === 'Low Budget' ? '৳50-100' : '৳120-200';
  let timeVal = 25;

  if (attraction.id === hub.id) {
    return { mode: 'Walk/Local transit', time: '0 mins', cost: '৳0', timeVal: 0 };
  }

  const hubKeywords = getKeywords(hub.name);
  let matchedOption = attraction.transportOptions?.find(opt => {
    const descLower = opt.estimatedTime.toLowerCase();
    return hubKeywords.some(kw => descLower.includes(kw));
  });

  if (!matchedOption && attraction.transportOptions?.length) {
    matchedOption = attraction.transportOptions.find(opt => {
      const timeLower = opt.estimatedTime.toLowerCase();
      return (timeLower.includes('minute') || timeLower.includes('min')) && !timeLower.includes('hour');
    });
  }

  if (matchedOption) {
    mode = matchedOption.type;
    time = matchedOption.estimatedTime;
    
    const match = time.match(/(\d+)\s*(?:-\s*(\d+))?\s*(min|hour|hr)/i);
    if (match) {
      const val1 = parseInt(match[1]);
      const val2 = match[2] ? parseInt(match[2]) : val1;
      const avg = (val1 + val2) / 2;
      const isHour = match[3].toLowerCase().startsWith('h');
      timeVal = isHour ? avg * 60 : avg;
    }

    if (matchedOption.fareRange) {
      const avgFare = (matchedOption.fareRange.min + matchedOption.fareRange.max) / 2;
      const multiplier = getBudgetMultiplier(budgetType);
      cost = `৳${Math.round(avgFare * multiplier)}`;
    }
  } else {
    const sharedCount = attraction.categories.filter(cat => hub.categories.includes(cat)).length;
    if (sharedCount >= 2) {
      timeVal = 15;
      time = '15-20 mins';
      cost = budgetType === 'Premium Budget' ? '৳150-250' : budgetType === 'Low Budget' ? '৳40-80' : '৳80-150';
    } else {
      timeVal = 45;
      time = '40-50 mins';
      cost = budgetType === 'Premium Budget' ? '৳400-600' : budgetType === 'Low Budget' ? '৳100-180' : '৳200-350';
    }
  }

  return { mode, time, cost, timeVal };
}

function generateHubHighlights(
  hub: Destination,
  selectedAttractions: Destination[],
  budgetType: BudgetType
): AttractionHighlight[] {
  return selectedAttractions.map(attraction => {
    const travelInfo = getTravelInfo(attraction, hub, budgetType);
    let whyVisitText = attraction.description;
    
    if (attraction.id !== hub.id) {
      whyVisitText += `\n\n🚗 Transportation: Take a ${travelInfo.mode} from ${hub.name} (approx. ${travelInfo.time}, cost: ${travelInfo.cost}).`;
    }

    return {
      name: attraction.name,
      whyVisit: whyVisitText,
      recommendedVisitingTime: attraction.bestTimeToVisit.timeOfDay,
      estimatedTimeNeeded: attraction.estimatedVisitDuration || '2-3 hours',
    };
  });
}

function generateDailySchedule(
  dests: Destination[],
  destinationDays: number[],
  totalDays: number,
  budgetType: BudgetType,
  useHubMode: boolean = true
) {
  const schedule = [];
  let currentDay = 1;

  dests.forEach((dest, idx) => {
    const daysHere = destinationDays[idx];
    const hotelName = dest.nearbyHotels?.[0]?.name || 'Local Hotel';

    // In non-Hub mode, generate a simple day schedule per destination
    if (!useHubMode) {
      for (let day = 0; day < daysHere; day++) {
        const timelineItems = [
          { time: '08:00 AM', activity: day === 0 && currentDay === 1 ? `Arrival and check-in at ${hotelName}` : `Breakfast at ${hotelName}` },
          { time: '09:30 AM', activity: `Explore ${dest.name}: ${dest.description}` },
          { time: '01:00 PM', activity: `Lunch at a local restaurant near ${dest.name}` },
          { time: '03:00 PM', activity: `Leisure walk, photography, and relaxing around ${dest.name}` },
          { time: '07:00 PM', activity: `Dinner featuring local delicacies` },
          { time: '08:30 PM', activity: `Evening leisure or market stroll near ${dest.name}` },
        ];
        schedule.push({
          day: currentDay,
          destination: dest.name,
          activities: generateActivities(dest),
          meals: ['Breakfast', 'Lunch', 'Dinner'],
          accommodation: hotelName,
          transportInfo: dest.transportOptions?.[0]?.type || 'Local transport',
          timelineItems,
        });
        currentDay += 1;
      }
      return;
    }

    // Hub mode: expand to nearby attractions
    const nearby = getNearbyAttractions(dest);
    const maxAttractions = daysHere * 2;
    const selectedNearby = nearby.slice(0, maxAttractions - 1);
    const sortedAttractions = [
      dest,
      ...selectedNearby.sort((a, b) => {
        const aInfo = getTravelInfo(a, dest, budgetType);
        const bInfo = getTravelInfo(b, dest, budgetType);
        return aInfo.timeVal - bInfo.timeVal;
      })
    ];

    const baseCount = Math.floor(sortedAttractions.length / daysHere);
    const remainder = sortedAttractions.length % daysHere;
    
    let currentAttractionIdx = 0;

    for (let day = 0; day < daysHere; day++) {
      const countForThisDay = baseCount + (day < remainder ? 1 : 0);
      const dayAttractions = sortedAttractions.slice(currentAttractionIdx, currentAttractionIdx + countForThisDay);
      currentAttractionIdx += countForThisDay;

      const timelineItems = [];
      
      timelineItems.push({ 
        time: '08:00 AM', 
        activity: day === 0 && currentDay === 1 
          ? `Arrival and check-in at ${hotelName}` 
          : `Breakfast at ${hotelName}` 
      });

      if (dayAttractions.length === 1) {
        const attr = dayAttractions[0];
        const travel = getTravelInfo(attr, dest, budgetType);
        
        if (attr.id !== dest.id) {
          timelineItems.push({ 
            time: '09:00 AM', 
            activity: `Travel to ${attr.name} via ${travel.mode} (approx. ${travel.time}, cost: ${travel.cost})` 
          });
        }
        timelineItems.push({ time: '09:30 AM', activity: `Explore ${attr.name}: ${attr.description}` });
        timelineItems.push({ time: '01:00 PM', activity: `Lunch at a local restaurant near ${attr.name}` });
        timelineItems.push({ time: '03:00 PM', activity: `Leisure walk, photography, and relaxing around ${attr.name}` });
      } 
      else if (dayAttractions.length === 2) {
        const attr1 = dayAttractions[0];
        const travel1 = getTravelInfo(attr1, dest, budgetType);
        const attr2 = dayAttractions[1];
        const travel2 = getTravelInfo(attr2, dest, budgetType);

        if (attr1.id !== dest.id) {
          timelineItems.push({ 
            time: '09:00 AM', 
            activity: `Travel to ${attr1.name} via ${travel1.mode} (approx. ${travel1.time}, cost: ${travel1.cost})` 
          });
        }
        timelineItems.push({ time: '09:30 AM', activity: `Explore ${attr1.name}: ${attr1.description}` });
        timelineItems.push({ time: '01:00 PM', activity: `Lunch at a local restaurant near ${attr1.name}` });
        
        timelineItems.push({ 
          time: '02:30 PM', 
          activity: `Travel to ${attr2.name} via ${travel2.mode} (approx. ${travel2.time}, cost: ${travel2.cost})` 
        });
        timelineItems.push({ time: '03:00 PM', activity: `Explore ${attr2.name} and enjoy the surroundings: ${attr2.description}` });
      } 
      else {
        const attr1 = dayAttractions[0];
        const travel1 = getTravelInfo(attr1, dest, budgetType);
        const attr2 = dayAttractions[1];
        const travel2 = getTravelInfo(attr2, dest, budgetType);
        const attr3 = dayAttractions[2];
        const travel3 = getTravelInfo(attr3, dest, budgetType);

        if (attr1.id !== dest.id) {
          timelineItems.push({ 
            time: '09:00 AM', 
            activity: `Travel to ${attr1.name} via ${travel1.mode} (approx. ${travel1.time}, cost: ${travel1.cost})` 
          });
        }
        timelineItems.push({ time: '09:30 AM', activity: `Explore ${attr1.name}: ${attr1.description}` });
        timelineItems.push({ time: '12:30 PM', activity: `Lunch at a local restaurant near ${attr1.name}` });
        
        timelineItems.push({ 
          time: '01:30 PM', 
          activity: `Travel to ${attr2.name} via ${travel2.mode} (approx. ${travel2.time}, cost: ${travel2.cost})` 
        });
        timelineItems.push({ time: '02:00 PM', activity: `Visit ${attr2.name}: ${attr2.description}` });
        
        timelineItems.push({ 
          time: '04:00 PM', 
          activity: `Travel to ${attr3.name} via ${travel3.mode} (approx. ${travel3.time}, cost: ${travel3.cost})` 
        });
        timelineItems.push({ time: '04:30 PM', activity: `Explore ${attr3.name} (perfect for sunset views): ${attr3.description}` });
      }

      timelineItems.push({ time: '07:00 PM', activity: `Dinner featuring local delicacies` });
      timelineItems.push({ time: '08:30 PM', activity: `Evening leisure or market stroll near ${dest.name}` });

      const dayActivities = Array.from(new Set(
        dayAttractions.flatMap(attr => generateActivities(attr))
      ));
      const dayTransports = Array.from(new Set(
        dayAttractions.map(attr => getTravelInfo(attr, dest, budgetType).mode)
      )).join(' / ');

      schedule.push({
        day: currentDay,
        destination: dest.name,
        activities: dayActivities,
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: hotelName,
        transportInfo: dayTransports,
        timelineItems,
      });
      
      currentDay += 1;
    }
  });

  return schedule;
}


function generateActivities(dest: Destination): string[] {
  const baseActivities = ['Sightseeing', 'Local dining', 'Photography', 'Relaxation'];

  if (dest.categories.includes('Historical')) {
    baseActivities.unshift('Historical exploration');
  }
  if (dest.categories.includes('Natural/Scenic')) {
    baseActivities.unshift('Nature walk');
  }
  if (dest.categories.includes('Sea/Beach')) {
    baseActivities.unshift('Beach time');
  }
  if (dest.categories.includes('Adventure/Wildlife')) {
    baseActivities.unshift('Adventure activity');
  }

  return Array.from(new Set(baseActivities));
}

function getBudgetMultiplier(budgetType: BudgetType) {
  switch (budgetType) {
    case 'Low Budget':
      return 0.75;
    case 'Medium Budget':
      return 1.0;
    case 'Premium Budget':
      return 1.45;
    default:
      return 1;
  }
}

function getRecommendedStyle(budgetType: BudgetType) {
  if (budgetType === 'Low Budget') return 'Comfortable budget travel with local experiences';
  if (budgetType === 'Premium Budget') return 'Premium travel with curated comfort and quality';
  return 'Balanced travel with popular experiences and mid-range comfort';
}

function generateRouteExplanation(fromLocation: string, travelOrder: string[]) {
  if (travelOrder.length === 0) return 'Choose destinations above to view the best route.';
  if (travelOrder.length === 1) {
    return `Start from ${fromLocation} and spend your trip exploring ${travelOrder[0]} in depth.`;
  }

  return `Begin at ${fromLocation}, then follow the route: ${travelOrder.join(' → ')}. This order keeps travel efficient by grouping nearby sights and minimizing backtracking.`;
}

function generateTransportGuide(fromLocation: string, dests: Destination[], budgetType: BudgetType): TransportGuide {
  const firstDestination = dests[0];
  const primaryMode = budgetType === 'Premium Budget' ? 'Private car or ride-share' : 'Bus or train';
  const alternatives = budgetType === 'Low Budget'
    ? ['Local bus', 'Shared taxi']
    : ['Private car', 'Train', 'Domestic flight'];

  return {
    method: primaryMode,
    overview: `From ${fromLocation} to ${firstDestination?.name || 'your first destination'}, the recommended option is ${primaryMode.toLowerCase()}.`,
    alternatives,
    estimatedTime: firstDestination?.transportOptions?.[0]?.estimatedTime || '3-5 hours',
  };
}

function generateLocalTransportOptions(budgetType: BudgetType): TransportOption[] {
  const baseCost = budgetType === 'Premium Budget' ? '৳200-400' : budgetType === 'Medium Budget' ? '৳100-200' : '৳40-120';

  return [
    { mode: 'Rickshaw', description: 'Short local trips within town', estimatedCost: baseCost },
    { mode: 'Auto Rickshaw', description: 'Efficient point-to-point travel', estimatedCost: baseCost },
    { mode: 'CNG', description: 'Affordable local travel', estimatedCost: baseCost },
    { mode: 'Local Bus', description: 'Best for budget-friendly routes', estimatedCost: '৳15-60' },
    { mode: 'Rental Bike', description: 'Great for flexible local exploration', estimatedCost: '৳500-900/day' },
    { mode: 'Rental Car', description: 'Comfortable private travel for groups', estimatedCost: '৳2800-5000/day' },
  ];
}

// Simple (non-hub) food recommendations: one entry per destination
function generateFoodRecommendations(dests: Destination[]): FoodRecommendation[] {
  return dests.map(dest => {
    if (dest.nearbyFood && dest.nearbyFood.length > 0) {
      const mustTryFoods = dest.nearbyFood.map(f => f.name).slice(0, 4);
      const foodDetails = dest.nearbyFood.map(f => `${f.name} (${f.description})`).slice(0, 2).join(', ');
      return {
        destination: dest.name,
        mustTryFoods,
        notes: `Enjoy fresh local dining around ${dest.name}. Must try: ${foodDetails}.`,
      };
    }
    return {
      destination: dest.name,
      mustTryFoods: ['Local traditional curries', 'Fresh fish', 'Bengali desserts'],
      notes: `Enjoy fresh local dining around ${dest.name} city center and popular dining hubs.`,
    };
  });
}

function generateFoodRecommendationsForTrip(
  dests: Destination[],
  destinationDays: number[],
  budgetType: BudgetType
): FoodRecommendation[] {
  const recommendations: FoodRecommendation[] = [];
  const seenDests = new Set<string>();

  dests.forEach((dest, idx) => {
    const daysHere = destinationDays[idx];
    const nearby = getNearbyAttractions(dest);
    const maxAttractions = daysHere * 2;
    const selectedNearby = nearby.slice(0, maxAttractions - 1);
    const allVisited = [dest, ...selectedNearby];

    allVisited.forEach(attr => {
      if (seenDests.has(attr.name)) return;

      if (attr.nearbyFood && attr.nearbyFood.length > 0) {
        seenDests.add(attr.name);
        const mustTryFoods = attr.nearbyFood.map(food => food.name).slice(0, 4);
        const foodDetails = attr.nearbyFood.map(food => `${food.name} (${food.description})`).slice(0, 2).join(', ');
        
        recommendations.push({
          destination: attr.name,
          mustTryFoods,
          notes: attr.id === dest.id 
            ? `Specialties near the hub area of ${dest.name}. Try local spots: ${foodDetails}.`
            : `Delicious local specialties to enjoy while visiting ${attr.name}. Recommended: ${foodDetails}.`
        });
      }
    });

    if (!seenDests.has(dest.name)) {
      seenDests.add(dest.name);
      recommendations.push({
        destination: dest.name,
        mustTryFoods: ['Local traditional curries', 'Fresh fish', 'Bengali desserts'],
        notes: `Enjoy fresh local dining around ${dest.name} city center and popular dining hubs.`
      });
    }
  });

  return recommendations;
}

function generateAccommodationSuggestions(dests: Destination[], budgetType: BudgetType): AccommodationSuggestion[] {
  return dests.map((dest) => {
    const hotels = dest.nearbyHotels?.slice(0, 3) ?? [];
    const options = hotels.map((hotel) => ({
      name: hotel.name,
      costPerNight: Math.round(hotel.ratePerNight * (budgetType === 'Premium Budget' ? 1.2 : budgetType === 'Low Budget' ? 0.75 : 1)),
      suitableFor: budgetType === 'Premium Budget' ? 'Premium travelers' : budgetType === 'Low Budget' ? 'Budget-conscious visitors' : 'Comfort seekers',
    }));

    return {
      destination: dest.name,
      options: options.length > 0 ? options : [{ name: 'Local guesthouse', costPerNight: budgetType === 'Low Budget' ? 2000 : budgetType === 'Premium Budget' ? 9000 : 4500, suitableFor: 'Suitable for all travelers' }],
    };
  });
}

function generateTripName(dests: Destination[]): string {
  if (dests.length === 0) return 'Trip Plan';
  if (dests.length === 1) return `${dests[0].name} Explorer`; 
  return `${dests[0].name} + ${dests.length - 1} Places Trip`;
}
