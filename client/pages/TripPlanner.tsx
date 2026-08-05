import { useEffect, useState } from 'react';
import { ChevronLeft, Plus, Calendar, AlertCircle } from 'lucide-react';
import { TripBuilderForm } from '@/components/TripBuilderForm';
import { TripResult } from '@/components/TripResult';
import { generateTripPlan } from '@/lib/tripPlannerUtils';
import { loadSavedTripPlans, saveTripPlan } from '@/lib/tripPlanStorage';
import type { TripPlan, TripBuilderInput } from '@shared/tripPlanner';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function TripPlanner() {
  const [state, setState] = useState<'initial' | 'form' | 'result'>('initial');
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedPlans, setSavedPlans] = useState<TripPlan[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlans = async () => {
      setSavedPlans(await loadSavedTripPlans());
    };

    loadPlans();
  }, []);

  const handleStartPlanning = () => {
    setState('form');
    setError(null);
  };

  const handleGeneratePlan = async (formData: TripBuilderInput) => {
    setIsLoading(true);
    setError(null);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const plan = generateTripPlan(formData);
      setTripPlan(plan);
      setState('result');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowPlan = async (plan: TripPlan) => {
    const updatedPlan: TripPlan = {
      ...plan,
      status: 'confirmed' as const,
      bookingStatus: 'Upcoming' as const,
      generatedDate: new Date().toISOString().split('T')[0],
      travelDates: {
        startDate: plan.startDate || new Date().toISOString().split('T')[0],
        endDate: new Date(new Date(plan.startDate || Date.now()).getTime() + plan.duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      travelerInfo: {
        travelerCount: plan.numberOfPeople,
        groupLabel: `${plan.numberOfPeople} traveler${plan.numberOfPeople > 1 ? 's' : ''}`,
      },
      tripOverview: {
        destination: plan.destinations?.map((entry) => entry.destination.name).join(', ') || plan.bestTravelOrder.join(', '),
        budget: plan.budgetType,
        duration: `${plan.duration} Days`,
        travelStyle: plan.recommendedStyle,
      },
    };

    const nextPlans = await saveTripPlan(updatedPlan);
    setSavedPlans(nextPlans);
    setTripPlan(updatedPlan);
    toast.success('Trip plan added to your Booking successfully.');
    setState('initial');
  };

  const handleModifyPlan = () => {
    setState('form');
    setError(null);
  };

  const handleBackToInitial = () => {
    setState('initial');
    setTripPlan(null);
    setError(null);
  };

  if (state === 'form') {
    return (
      <div className="pb-24 bg-background min-h-screen">
        <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-4 bg-card border-b border-border/40">
          <button
            onClick={handleBackToInitial}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-foreground flex-1">Build Your Trip</h1>
        </div>

        {error && (
          <div className="mx-4 mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-semibold block mb-1">Illogical Travel Schedule</span>
              {error}
            </div>
          </div>
        )}

        <TripBuilderForm onGenerate={handleGeneratePlan} isLoading={isLoading} />
      </div>
    );
  }

  if (state === 'result' && tripPlan) {
    return (
      <div className="bg-background min-h-screen">
        <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-4 bg-card border-b border-border/40">
          <button
            onClick={handleBackToInitial}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-foreground flex-1">Your Trip Plan</h1>
        </div>
        <TripResult
          tripPlan={tripPlan}
          onFollow={handleFollowPlan}
          onModify={handleModifyPlan}
          isFollowing={savedPlans.some((p) => p.id === tripPlan.id)}
        />
      </div>
    );
  }

  // Initial State
  return (
    <div className="pb-24 bg-background min-h-screen">
      {/* Header */}
      <div className="px-4 py-6 border-b border-border/40">
        <h1 className="text-3xl font-bold text-foreground mb-2">Trip Planner</h1>
        <p className="text-muted-foreground">Build custom multi-destination itineraries</p>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <Calendar className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">
          Create Your First Trip
        </h2>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Plan a multi-destination itinerary with activities, hotels, transport, and transparent pricing.
        </p>
        <Button onClick={handleStartPlanning} className="gap-2">
          <Plus size={20} />
          Start Planning
        </Button>
      </div>

      {/* Feature Preview Cards */}
      <div className="px-4 py-8 space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Features</h3>
        <div className="space-y-3">
          {[
            { title: 'Multi-destination routing', desc: 'Smart itinerary sequencing' },
            { title: 'Hotel selection', desc: 'Browse verified accommodations' },
            { title: 'Cost breakdown', desc: 'Transparent pricing breakdown' },
            { title: 'Day-by-day schedule', desc: 'Hour-by-hour activities' },
          ].map((feature, idx) => (
            <div key={idx} className="bd-card p-4">
              <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
