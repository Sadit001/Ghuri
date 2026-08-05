import { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, ChevronRight, MapPin, Users, Calendar, X, Star, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TripResult } from '@/components/TripResult';
import type { TripPlan } from '@shared/tripPlanner';
import { getGuideBookingStatus, loadGuideAgencies, persistGuideAgencies, type GuideBooking } from '@/lib/guideMarketplace';
import { exportTripPlanPdf } from '@/lib/tripPlanPdf';
import { ensureTripPlanData, formatTripPlanDate, getTripPlanDisplayStatus, loadSavedTripPlans, persistSavedTripPlans } from '@/lib/tripPlanStorage';
import { toast } from 'sonner';

const currencyFormat = (value: number) => `৳${value.toLocaleString()}`;

export default function Bookings() {
  const [savedPlans, setSavedPlans] = useState<TripPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<TripPlan | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  const [guideBookings, setGuideBookings] = useState<GuideBooking[]>([]);
  const [reviewDrafts, setReviewDrafts] = useState<Record<string, { rating: number; comment: string }>>({});

  useEffect(() => {
    const loadData = async () => {
      const storedGuideBookings = localStorage.getItem('guide_bookings');
      if (storedGuideBookings) {
        const parsed: GuideBooking[] = JSON.parse(storedGuideBookings).map((booking: GuideBooking) => ({
          ...booking,
          status: booking.status === 'Cancelled' ? 'Cancelled' : getGuideBookingStatus(booking.startDate, booking.endDate),
        }));
        setGuideBookings(parsed);
      }

      setSavedPlans(await loadSavedTripPlans());
    };

    loadData();
  }, []);

  const upcomingPlans = savedPlans.filter((p) => p.status === 'confirmed' || p.status === 'ongoing' || getTripPlanDisplayStatus(p) === 'Upcoming' || getTripPlanDisplayStatus(p) === 'Ongoing');
  const pastPlans = savedPlans.filter((p) => p.status === 'completed' || getTripPlanDisplayStatus(p) === 'Completed');
  const cancelledPlans = savedPlans.filter((p) => p.status === 'cancelled');

  const guideUpcoming = guideBookings.filter((booking) => booking.status === 'Upcoming' || booking.status === 'Ongoing');
  const guidePast = guideBookings.filter((booking) => booking.status === 'Completed');
  const guideCancelled = guideBookings.filter((booking) => booking.status === 'Cancelled');

  const getPlans = () => {
    switch (activeTab) {
      case 'past':
        return pastPlans;
      case 'cancelled':
        return cancelledPlans;
      default:
        return upcomingPlans;
    }
  };

  const plans = getPlans();
  const activeGuideBookings = activeTab === 'upcoming' ? guideUpcoming : activeTab === 'past' ? guidePast : guideCancelled;

  const handleDeletePlan = async (id: string) => {
    const next = savedPlans.filter((p) => p.id !== id);
    await persistSavedTripPlans(next);
    setSavedPlans(next);
    setSelectedPlan(null);
  };

  const handleExportPlan = async (plan: TripPlan) => {
    try {
      await exportTripPlanPdf(ensureTripPlanData(plan));
      toast.success('Trip plan PDF downloaded successfully.');
    } catch {
      toast.error('Unable to export this trip plan right now.');
    }
  };

  const selectedPlanDetails = selectedPlan ? ensureTripPlanData(selectedPlan) : null;

  const handleReviewSubmit = (booking: GuideBooking) => {
    const draft = reviewDrafts[booking.id];
    if (!draft || draft.rating < 1 || draft.comment.trim().length < 3) {
      return;
    }

    const agencies = loadGuideAgencies();
    const agency = agencies.find((item) => item.id === booking.agencyId);
    const guide = agency?.guides.find((item) => item.id === booking.guideId);

    if (!agency || !guide) {
      return;
    }

    const updatedGuide = {
      ...guide,
      rating: ((guide.rating * guide.reviewCount) + draft.rating) / (guide.reviewCount + 1),
      reviewCount: guide.reviewCount + 1,
      reviews: [
        ...guide.reviews,
        {
          id: `review-${Date.now()}`,
          userName: 'You',
          rating: draft.rating,
          comment: draft.comment,
          date: new Date().toISOString().slice(0, 10),
        },
      ],
    };

    const updatedAgency = {
      ...agency,
      rating: ((agency.rating * agency.reviewCount) + draft.rating) / (agency.reviewCount + 1),
      reviewCount: agency.reviewCount + 1,
      reviews: [
        ...agency.reviews,
        {
          id: `agency-review-${Date.now()}`,
          userName: 'You',
          rating: draft.rating,
          comment: draft.comment,
          date: new Date().toISOString().slice(0, 10),
        },
      ],
    };

    const updatedAgencies = agencies.map((item) => (item.id === agency.id ? {
      ...item,
      ...updatedAgency,
      guides: item.guides.map((guideItem) => (guideItem.id === guide.id ? updatedGuide : guideItem)),
    } : item));

    persistGuideAgencies(updatedAgencies);

    const updatedBookings = guideBookings.map((item) => (item.id === booking.id ? { ...item, review: { rating: draft.rating, comment: draft.comment, createdAt: new Date().toISOString() } } : item));
    setGuideBookings(updatedBookings);
    localStorage.setItem('guide_bookings', JSON.stringify(updatedBookings));
  };

  if (selectedPlanDetails) {
    return (
      <div className="pb-24 bg-background min-h-screen">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border/40 bg-card px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{selectedPlanDetails.name}</h1>
            <p className="mt-1 text-xs text-muted-foreground">{selectedPlanDetails.tripOverview?.destination || 'Saved trip plan'}</p>
          </div>
          <button onClick={() => setSelectedPlan(null)} className="rounded-lg p-2 transition-colors hover:bg-muted">
            <X size={20} />
          </button>
        </div>

        <TripResult
          tripPlan={selectedPlanDetails}
          onFollow={() => undefined}
          onModify={() => setSelectedPlan(null)}
          isFollowing={false}
          showHeader={false}
          showActions={false}
        />

        <div className="sticky bottom-0 z-10 grid grid-cols-1 gap-2 border-t border-border/40 bg-card px-4 py-4 sm:grid-cols-3">
          <Button variant="outline" onClick={() => setSelectedPlan(null)}>Back</Button>
          <Button variant="secondary" onClick={() => handleExportPlan(selectedPlanDetails)}>
            <Download size={16} className="mr-2" />
            Download Plan
          </Button>
          <Button variant="destructive" onClick={() => handleDeletePlan(selectedPlanDetails.id)}>Cancel Trip</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-background min-h-screen">
      <div className="sticky top-0 z-10 border-b border-border/40 bg-card px-4 py-6">
        <h1 className="mb-2 text-3xl font-bold text-foreground">My Bookings</h1>
        <p className="text-muted-foreground">Your trip plans and guide bookings</p>
      </div>

      <div className="sticky top-16 z-10 border-b border-border/40 bg-background px-4 pt-4">
        <div className="flex gap-4">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'past', label: 'Past' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`pb-3 text-sm font-semibold transition-colors ${activeTab === tab.id ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Guide Bookings</h2>
          {activeGuideBookings.length > 0 ? activeGuideBookings.map((booking) => (
            <Card key={booking.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-foreground">{booking.guideName}</div>
                  <div className="text-sm text-muted-foreground">{booking.agencyName}</div>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${booking.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-700' : booking.status === 'Cancelled' ? 'bg-red-500/10 text-red-600' : 'bg-primary/10 text-primary'}`}>{booking.status}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={14} /> {booking.destination}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {booking.startDate} to {booking.endDate}</span>
                <span className="flex items-center gap-1"><Users size={14} /> {booking.travelerCount} travelers</span>
              </div>
              {booking.status === 'Completed' && !booking.review ? (
                <div className="mt-3 rounded-lg border border-border/40 bg-background/70 p-3">
                  <div className="mb-2 text-sm font-semibold text-foreground">Leave a review</div>
                  <div className="mb-2 flex gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button key={value} type="button" onClick={() => setReviewDrafts((prev) => ({ ...prev, [booking.id]: { ...(prev[booking.id] || { comment: '' }), rating: value } }))} className="text-xl text-primary/50 hover:text-primary">
                        <Star size={18} className={value <= (reviewDrafts[booking.id]?.rating || 0) ? 'fill-primary text-primary' : ''} />
                      </button>
                    ))}
                  </div>
                  <textarea value={reviewDrafts[booking.id]?.comment || ''} onChange={(event) => setReviewDrafts((prev) => ({ ...prev, [booking.id]: { ...(prev[booking.id] || { rating: 5 }), comment: event.target.value } }))} className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Share your experience with this guide" />
                  <Button className="mt-2" size="sm" onClick={() => handleReviewSubmit(booking)}>Submit Review</Button>
                </div>
              ) : null}
            </Card>
          )) : <div className="rounded-lg border border-dashed border-border/60 p-4 text-sm text-muted-foreground">No guide bookings in this section yet.</div>}
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Trip Plans</h2>
          {plans.length > 0 ? plans.map((plan) => (
            <Card key={plan.id} onClick={() => setSelectedPlan(plan)} className="cursor-pointer p-4 transition-colors hover:border-primary/50">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-semibold text-foreground">{plan.name}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1"><MapPin size={14} /> <span>{plan.tripOverview?.destination || plan.destinations[0]?.destination.name || 'Multiple destinations'}</span></div>
                    <div className="flex items-center gap-1"><Calendar size={14} /> <span>{plan.duration} days</span></div>
                    <div className="flex items-center gap-1"><Users size={14} /> <span>{plan.travelerInfo?.travelerCount || plan.numberOfPeople} travelers</span></div>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getTripPlanDisplayStatus(plan) === 'Completed' ? 'bg-emerald-500/10 text-emerald-700' : getTripPlanDisplayStatus(plan) === 'Ongoing' ? 'bg-amber-500/10 text-amber-700' : 'bg-primary/10 text-primary'}`}>{getTripPlanDisplayStatus(plan)}</span>
              </div>

              <div className="border-t border-border/40 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Budget</span>
                  <span className="text-sm font-semibold text-foreground">{plan.budgetType}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Created {formatTripPlanDate(plan.generatedDate || plan.createdAt)}</span>
                  <span>{plan.destinations.length} places</span>
                </div>
              </div>
            </Card>
          )) : (
            <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
              <Clock className="mb-4 h-16 w-16 text-muted-foreground/50" />
              <h2 className="mb-2 text-xl font-bold text-foreground">{activeTab === 'upcoming' ? 'No Upcoming Trips' : activeTab === 'past' ? 'No Past Trips' : 'No Cancelled Trips'}</h2>
              <p className="mb-6 max-w-sm text-muted-foreground">{activeTab === 'upcoming' ? 'Start planning your first trip to see it here!' : activeTab === 'past' ? 'Your completed trips will appear here.' : 'Your cancelled trips will appear here.'}</p>
            </div>
          )}
        </div>

        {plans.length === 0 && activeTab === 'upcoming' && (
          <div className="space-y-3 py-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">What you can do</h3>
            <div className="space-y-3">
              {[
                { icon: CheckCircle, title: 'Create Trip Plans', desc: 'Use the trip planner to create custom itineraries' },
                { icon: Clock, title: 'Manage Bookings', desc: 'View and modify your upcoming trips' },
                { icon: AlertCircle, title: 'Cost Details', desc: 'See detailed breakdown of all expenses' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bd-card flex gap-3 p-4">
                    <Icon size={20} className="mt-0.5 flex-shrink-0 text-secondary" />
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

