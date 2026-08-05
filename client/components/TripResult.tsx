import { MapPin, Calendar, Users, DollarSign, Hotel, Utensils, Navigation as NavIcon, Ticket, User, AlertCircle, Globe2, Clock3, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TripPlan } from '@shared/tripPlanner';

interface TripResultProps {
  tripPlan: TripPlan;
  onFollow: (plan: TripPlan) => void;
  onModify: () => void;
  isFollowing?: boolean;
  showHeader?: boolean;
  showActions?: boolean;
}

const currencyFormat = (value: number) => `৳${value.toLocaleString()}`;

export function TripResult({ tripPlan, onFollow, onModify, isFollowing = false, showHeader = true, showActions = true }: TripResultProps) {
  return (
    <div className="space-y-6 pb-28">
      {showHeader ? (
        <div className="sticky top-0 z-10 bg-card/90 backdrop-blur px-4 py-4 border-b border-border/40">
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{tripPlan.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Intelligent travel plan for {tripPlan.numberOfPeople} traveler{tripPlan.numberOfPeople > 1 ? 's' : ''}.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <Card className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar size={18} />
                <span className="text-xs uppercase tracking-[0.12em]">Duration</span>
              </div>
              <div className="text-lg font-semibold text-foreground">{tripPlan.duration} Days</div>
              <div className="text-xs text-muted-foreground">{Math.max(0, tripPlan.duration - 1)} Nights</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Users size={18} />
                <span className="text-xs uppercase tracking-[0.12em]">Travelers</span>
              </div>
              <div className="text-lg font-semibold text-foreground">{tripPlan.numberOfPeople}</div>
              <div className="text-xs text-muted-foreground">Group size</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin size={18} />
                <span className="text-xs uppercase tracking-[0.12em]">From</span>
              </div>
              <div className="text-lg font-semibold text-foreground">{tripPlan.fromLocation}</div>
              <div className="text-xs text-muted-foreground">Budget: {tripPlan.budgetType}</div>
            </Card>
          </div>
        </div>
        </div>
      ) : null}

      <div className="px-4 space-y-4">
        <div className="grid gap-3 lg:grid-cols-2">
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Trip Overview</h3>
            <div className="space-y-2 text-sm text-foreground">
              <div><span className="font-semibold">Travel Style:</span> {tripPlan.recommendedStyle}</div>
              <div><span className="font-semibold">Route:</span> {tripPlan.bestTravelOrder.join(' → ') || 'Not specified'}</div>
              <div className="text-xs text-muted-foreground">{tripPlan.routeExplanation}</div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/20">
            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Cost Summary</div>
            <div className="text-3xl font-bold text-primary mb-1">{currencyFormat(tripPlan.totalCost)}</div>
            <div className="text-sm text-muted-foreground">Total estimated cost</div>
            <div className="mt-3 text-sm text-foreground">Per person: {currencyFormat(tripPlan.estimatedCostPerPerson)}</div>
          </Card>
        </div>

        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Best Travel Order</h3>
          <div className="flex flex-wrap gap-2">
            {tripPlan.bestTravelOrder.map((place) => (
              <Badge key={place}>{place}</Badge>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Route Explanation</h3>
          <p className="text-sm text-foreground leading-6">{tripPlan.routeExplanation}</p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Transportation Guide</h3>
          <div className="space-y-3 text-sm text-foreground">
            <div>
              <div className="font-semibold">Recommended</div>
              <p>{tripPlan.transportGuide.method}</p>
            </div>
            <div>
              <div className="font-semibold">Overview</div>
              <p>{tripPlan.transportGuide.overview}</p>
            </div>
            <div>
              <div className="font-semibold">Estimated time</div>
              <p>{tripPlan.transportGuide.estimatedTime}</p>
            </div>
            <div>
              <div className="font-semibold">Alternative options</div>
              <ul className="list-disc list-inside">
                {tripPlan.transportGuide.alternatives.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Local Transportation</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {tripPlan.localTransportOptions.map((option) => (
              <div key={option.mode} className="rounded-xl border border-border/50 p-3">
                <div className="font-semibold text-foreground">{option.mode}</div>
                <p className="text-xs text-muted-foreground mb-2">{option.description}</p>
                <div className="text-sm font-medium">{option.estimatedCost}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-3 xl:grid-cols-2">
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Food Recommendations</h3>
            <div className="space-y-4">
              {tripPlan.foodRecommendations.map((item) => (
                <div key={item.destination}>
                  <div className="font-semibold text-foreground">{item.destination}</div>
                  <div className="text-xs text-muted-foreground mb-2">{item.notes}</div>
                  <div className="flex flex-wrap gap-2">
                    {item.mustTryFoods.map((food) => (
                      <Badge key={food} variant="secondary">{food}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Accommodation Suggestions</h3>
            <div className="space-y-4">
              {tripPlan.accommodationSuggestions.map((stay) => (
                <div key={stay.destination}>
                  <div className="font-semibold text-foreground mb-2">{stay.destination}</div>
                  <div className="space-y-2">
                    {stay.options.map((hotel) => (
                      <div key={hotel.name} className="rounded-lg bg-muted/50 p-3">
                        <div className="font-medium text-foreground">{hotel.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {currencyFormat(hotel.costPerNight)}/night • {hotel.suitableFor}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tourist Attractions</h3>
          <div className="space-y-4">
            {tripPlan.destinations.map((entry) => (
              <div key={entry.destination.id} className="rounded-xl border border-border/40 p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="font-semibold text-foreground">{entry.destination.name}</div>
                    <div className="text-xs text-muted-foreground">{entry.destination.division}</div>
                  </div>
                  <Badge>{entry.daysToSpend} Days</Badge>
                </div>
                {entry.highlights.map((highlight, hIdx) => (
                  <div key={highlight.name} className={`space-y-2 ${hIdx > 0 ? 'mt-4 pt-4 border-t border-border/20' : ''}`}>
                    {highlight.name !== entry.destination.name && (
                      <div className="font-semibold text-primary text-sm mb-1">{highlight.name}</div>
                    )}
                    <div className="text-sm font-medium text-foreground">Why Visit</div>
                    <p className="text-sm text-muted-foreground">{highlight.whyVisit}</p>
                    <div className="grid gap-2 md:grid-cols-2 text-sm text-foreground">
                      <div><span className="font-semibold">Recommended time:</span> {highlight.recommendedVisitingTime}</div>
                      <div><span className="font-semibold">Estimated duration:</span> {highlight.estimatedTimeNeeded}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Day-by-Day Itinerary</h3>
          <div className="space-y-4">
            {tripPlan.dailySchedule.map((schedule) => (
              <div key={schedule.day} className="rounded-2xl border border-border/40 p-4">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="text-lg font-semibold text-foreground">Day {schedule.day}</div>
                  <Badge>{schedule.destination}</Badge>
                </div>
                <div className="grid gap-2">
                  {schedule.timelineItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="text-xs font-mono text-muted-foreground w-20">{item.time}</div>
                      <div className="text-sm text-foreground">{item.activity}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  Accommodation: {schedule.accommodation} • Transport: {schedule.transportInfo}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Estimated Cost Breakdown</h3>
          <div className="space-y-3">
            {[
              { label: 'Accommodation', value: tripPlan.costBreakdown.accommodation },
              { label: 'Transport', value: tripPlan.costBreakdown.transport },
              { label: 'Food', value: tripPlan.costBreakdown.food },
              { label: 'Attractions & Entrance', value: tripPlan.costBreakdown.entranceFees },
              { label: 'Guide Service', value: tripPlan.costBreakdown.guideService },
              { label: 'Miscellaneous', value: tripPlan.costBreakdown.miscellaneous },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm text-foreground gap-2">
                <span>{item.label}</span>
                <span className="font-semibold">{currencyFormat(item.value)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border/40 pt-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Total Estimated Cost</div>
              <div className="text-xl font-bold text-foreground">{currencyFormat(tripPlan.totalCost)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Per Person</div>
              <div className="text-xl font-bold text-primary">{currencyFormat(tripPlan.estimatedCostPerPerson)}</div>
            </div>
          </div>
        </Card>
      </div>

      {showActions ? (
        <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-card border-t border-border/40 flex gap-3">
          <Button variant="outline" onClick={onModify} className="flex-1">
            Modify
          </Button>
          <Button onClick={() => onFollow(tripPlan)} disabled={isFollowing} className="flex-1">
            {isFollowing ? 'Saved to Bookings' : 'Follow Plan'}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
