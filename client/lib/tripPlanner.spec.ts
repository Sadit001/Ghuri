import { describe, it, expect } from "vitest";
import { generateTripPlan } from "./tripPlannerUtils";
import type { TripBuilderInput } from "../../shared/tripPlanner";

describe("generateTripPlan with Destination Hub logic", () => {
  it("should treat Cox's Bazar as a hub and include nearby attractions based on duration", () => {
    const input: TripBuilderInput = {
      numberOfPeople: 2,
      duration: 3,
      fromLocation: "Dhaka",
      budgetType: "Medium Budget",
      exploreDivision: false,
      customPlaces: ["Cox's Bazar Beach"]
    };

    const plan = generateTripPlan(input);

    expect(plan.destinations.length).toBe(1);
    const destEntry = plan.destinations[0];
    expect(destEntry.destination.name).toContain("Cox's Bazar");
    
    // For 3 days, it should include Cox's Bazar itself + up to 4 nearby attractions (total 5)
    expect(destEntry.highlights.length).toBeGreaterThan(2);

    // Verify Cox's Bazar itself is the first highlight
    expect(destEntry.highlights[0].name).toContain("Cox's Bazar");

    // Verify nearby attractions are present (like Inani, Laboni, or Himchari)
    const highlightNames = destEntry.highlights.map(h => h.name);
    expect(highlightNames.some(name => name.includes("Inani") || name.includes("Laboni") || name.includes("Himchari"))).toBe(true);

    // Verify transportation info is embedded in the highlights of nearby attractions
    const inaniHighlight = destEntry.highlights.find(h => h.name.includes("Inani") || h.name.includes("Himchari") || h.name.includes("Laboni"));
    if (inaniHighlight && inaniHighlight.name !== "Cox's Bazar Beach") {
      expect(inaniHighlight.whyVisit).toContain("🚗 Transportation:");
    }

    // Verify daily schedule has timeline items visiting the attractions
    expect(plan.dailySchedule.length).toBe(3);
    
    // Check that timeline items mention exploring different attractions
    const activitiesList = plan.dailySchedule.flatMap(s => s.timelineItems.map(item => item.activity));
    expect(activitiesList.some(act => act.includes("Explore") || act.includes("Visit"))).toBe(true);

    // Verify food recommendations include the nearby attractions
    expect(plan.foodRecommendations.length).toBeGreaterThan(1);
    expect(plan.foodRecommendations.some(r => r.destination.includes("Inani") || r.destination.includes("Himchari") || r.destination.includes("Laboni") || r.destination.includes("Saint Martin"))).toBe(true);
  });

  it("should adjust the number of attractions to visit based on duration", () => {
    const inputShort: TripBuilderInput = {
      numberOfPeople: 1,
      duration: 1,
      fromLocation: "Dhaka",
      budgetType: "Low Budget",
      exploreDivision: false,
      customPlaces: ["Cox's Bazar Beach"]
    };

    const planShort = generateTripPlan(inputShort);
    // For 1 day, it should include Cox's Bazar itself + up to 1 nearby attraction (total 2 max)
    expect(planShort.destinations[0].highlights.length).toBeLessThanOrEqual(2);

    const inputLong: TripBuilderInput = {
      numberOfPeople: 1,
      duration: 4,
      fromLocation: "Dhaka",
      budgetType: "Low Budget",
      exploreDivision: false,
      customPlaces: ["Cox's Bazar Beach"]
    };

    const planLong = generateTripPlan(inputLong);
    // For 4 days, it should include more attractions (up to 7)
    expect(planLong.destinations[0].highlights.length).toBeGreaterThan(3);
  });
});

describe("generateTripPlan feasibility validation", () => {
  it("should throw a validation error when traveling between divisions with insufficient duration (e.g. Dhaka to St Martin in 1 day)", () => {
    const input: TripBuilderInput = {
      numberOfPeople: 1,
      duration: 1,
      fromLocation: "Dhaka",
      budgetType: "Medium Budget",
      exploreDivision: false,
      customPlaces: ["Lalbagh Fort", "Saint Martin"]
    };

    expect(() => generateTripPlan(input)).toThrowError(/Visiting places in different regions.*not feasible/);
  });

  it("should throw a validation error when combining mountain destinations and beach destinations in a short duration", () => {
    const input: TripBuilderInput = {
      numberOfPeople: 1,
      duration: 2,
      fromLocation: "Dhaka",
      budgetType: "Medium Budget",
      exploreDivision: false,
      customPlaces: ["Sajek Valley", "Saint Martin's Island"]
    };

    expect(() => generateTripPlan(input)).toThrowError(/Combining the deep hill tracts.*and beach destinations.*not feasible/);
  });
});
