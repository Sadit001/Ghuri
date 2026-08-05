import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import type { TripPlan } from '@shared/tripPlanner';
import { formatTripPlanDate, getTripPlanDisplayStatus } from '@/lib/tripPlanStorage';

const currencyFormat = (value: number) => `৳${value.toLocaleString()}`;

function formatSectionTitle(title: string) {
  return `<h2 style="font-size:18px; font-weight:700; margin:18px 0 8px; color:#0f172a;">${title}</h2>`;
}

function addCard(content: string) {
  return `<div style="border:1px solid #e2e8f0; border-radius:12px; padding:14px; margin-bottom:12px; background:#fff;">${content}</div>`;
}

export function buildTripPlanPdfHtml(plan: TripPlan) {
  const normalizedPlan = {
    ...plan,
    tripOverview: plan.tripOverview || {
      destination: plan.destinations?.map((entry) => entry.destination.name).join(', ') || plan.bestTravelOrder.join(', '),
      budget: plan.budgetType,
      duration: `${plan.duration} Days`,
      travelStyle: plan.recommendedStyle,
    },
    travelerInfo: plan.travelerInfo || {
      travelerCount: plan.numberOfPeople,
      groupLabel: `${plan.numberOfPeople} traveler${plan.numberOfPeople > 1 ? 's' : ''}`,
    },
  };

  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: Arial, sans-serif; color: #0f172a; margin: 0; padding: 24px; background: #f8fafc; }
          h1 { font-size: 24px; margin: 0 0 8px; }
          h2 { font-size: 18px; margin: 16px 0 8px; }
          p { margin: 3px 0; font-size: 12px; line-height: 1.45; }
          .muted { color: #64748b; }
          .grid { display: flex; flex-wrap: wrap; gap: 10px; }
          .pill { display: inline-block; padding: 4px 8px; border-radius: 999px; background: #e2e8f0; font-size: 11px; margin-right: 6px; margin-bottom: 6px; }
          .section { margin-top: 8px; }
          table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 12px; }
          th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
          th { background: #f1f5f9; }
        </style>
      </head>
      <body>
        <h1>${normalizedPlan.name}</h1>
        <p class="muted">Generated on ${formatTripPlanDate(normalizedPlan.generatedDate || normalizedPlan.createdAt)}</p>
        <p class="muted">Status: ${getTripPlanDisplayStatus(normalizedPlan)}</p>
        <div class="section">${addCard(`<p><strong>Destination:</strong> ${normalizedPlan.tripOverview?.destination || 'N/A'}</p><p><strong>Travelers:</strong> ${normalizedPlan.travelerInfo?.groupLabel || normalizedPlan.numberOfPeople}</p><p><strong>Budget:</strong> ${normalizedPlan.budgetType}</p><p><strong>Duration:</strong> ${normalizedPlan.tripOverview?.duration || `${normalizedPlan.duration} Days`}</p><p><strong>Travel Style:</strong> ${normalizedPlan.tripOverview?.travelStyle || normalizedPlan.recommendedStyle}</p>`)}</div>

        ${formatSectionTitle('Trip Overview')}
        ${addCard(`<p><strong>Travel Style:</strong> ${normalizedPlan.tripOverview?.travelStyle || normalizedPlan.recommendedStyle}</p><p><strong>Route:</strong> ${normalizedPlan.bestTravelOrder.join(' → ') || 'Not specified'}</p><p>${normalizedPlan.routeExplanation || 'No additional notes available.'}</p>`)}

        ${formatSectionTitle('Best Travel Order')}
        ${addCard(`<div class="grid">${normalizedPlan.bestTravelOrder.map((place) => `<span class="pill">${place}</span>`).join('')}</div>`) }

        ${formatSectionTitle('Day-by-Day Itinerary')}
        ${normalizedPlan.dailySchedule.map((schedule) => addCard(`<h3 style="margin:0 0 8px; font-size:14px;">Day ${schedule.day} • ${schedule.destination}</h3><p><strong>Accommodation:</strong> ${schedule.accommodation}</p><p><strong>Transport:</strong> ${schedule.transportInfo}</p><div class="grid">${schedule.timelineItems.map((item) => `<span class="pill">${item.time} • ${item.activity}</span>`).join('')}</div>`)).join('')}

        ${formatSectionTitle('Tourist Attractions')}
        ${normalizedPlan.destinations.map((entry) => addCard(`<h3 style="margin:0 0 6px; font-size:14px;">${entry.destination.name}</h3><p class="muted">${entry.destination.division}</p>${entry.highlights.map((highlight) => `<div style="margin-top:8px;"><p><strong>${highlight.name}</strong></p><p>${highlight.whyVisit}</p><p><strong>Time:</strong> ${highlight.recommendedVisitingTime} • <strong>Duration:</strong> ${highlight.estimatedTimeNeeded}</p></div>`).join('')}`)).join('')}

        ${formatSectionTitle('Transportation Guide')}
        ${addCard(`<p><strong>Method:</strong> ${normalizedPlan.transportGuide?.method || 'N/A'}</p><p><strong>Overview:</strong> ${normalizedPlan.transportGuide?.overview || 'N/A'}</p><p><strong>Estimated time:</strong> ${normalizedPlan.transportGuide?.estimatedTime || 'N/A'}</p><p><strong>Alternatives:</strong> ${normalizedPlan.transportGuide?.alternatives?.join(', ') || 'N/A'}</p>`)}

        ${formatSectionTitle('Accommodation Suggestions')}
        ${normalizedPlan.accommodationSuggestions.map((stay) => addCard(`<h3 style="margin:0 0 6px; font-size:14px;">${stay.destination}</h3>${stay.options.map((hotel) => `<p><strong>${hotel.name}</strong> • ${currencyFormat(hotel.costPerNight)}/night • ${hotel.suitableFor}</p>`).join('')}`)).join('')}

        ${formatSectionTitle('Food Recommendations')}
        ${normalizedPlan.foodRecommendations.map((item) => addCard(`<h3 style="margin:0 0 6px; font-size:14px;">${item.destination}</h3><p>${item.notes}</p><div class="grid">${item.mustTryFoods.map((food) => `<span class="pill">${food}</span>`).join('')}</div>`)).join('')}

        ${formatSectionTitle('Cost Breakdown')}
        ${addCard(`<table><tr><th>Category</th><th>Amount</th></tr>${[
          ['Accommodation', normalizedPlan.costBreakdown?.accommodation || 0],
          ['Transport', normalizedPlan.costBreakdown?.transport || 0],
          ['Food', normalizedPlan.costBreakdown?.food || 0],
          ['Attractions', normalizedPlan.costBreakdown?.entranceFees || 0],
          ['Guide Service', normalizedPlan.costBreakdown?.guideService || 0],
          ['Miscellaneous', normalizedPlan.costBreakdown?.miscellaneous || 0],
        ].map(([label, value]) => `<tr><td>${label}</td><td>${currencyFormat(Number(value))}</td></tr>`).join('')}</table>`)}

        ${formatSectionTitle('Final Cost Summary')}
        ${addCard(`<p><strong>Total Cost:</strong> ${currencyFormat(normalizedPlan.totalCost)}</p><p><strong>Cost Per Person:</strong> ${currencyFormat(normalizedPlan.estimatedCostPerPerson)}</p><p><strong>Budget Category:</strong> ${normalizedPlan.budgetType}</p>`)}
      </body>
    </html>
  `;
}

export async function exportTripPlanPdf(plan: TripPlan) {
  const html = buildTripPlanPdfHtml(plan);
  const file = await printToFileAsync({
    html,
    base64: false,
    margins: {
      top: 8,
      bottom: 8,
      left: 8,
      right: 8,
    },
  });

  await shareAsync(file.uri, { UTI: 'com.adobe.pdf', mimeType: 'application/pdf' });
}
