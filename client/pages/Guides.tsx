import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BadgeCheck, CalendarDays, Compass, MapPin, Search, Star, Users, Wallet, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { loadGuideAgencies, persistGuideAgencies, hasGuideBookingConflict, getGuideBookingStatus, type GuideAgency, type GuideBooking, type GuideProfile } from '@/lib/guideMarketplace';

const currencyFormat = (value: number) => `৳${value.toLocaleString()}`;
const divisions = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh'];
const destinationSuggestions = ['Cox\'s Bazar', 'Sajek Valley', 'Ratargul', 'Kuakata', 'Sundarbans', 'Jaflong', 'Saint Martin', 'Bandarban'];

const initialBookingForm = {
  travelerCount: '2',
  contactNumber: '',
  destination: '',
  startDate: '',
  endDate: '',
  hotelName: '',
  hotelAddress: '',
  specialRequests: '',
};

export default function Guides() {
  const [agencies, setAgencies] = useState<GuideAgency[]>([]);
  const [guideBookings, setGuideBookings] = useState<GuideBooking[]>([]);
  const [activeView, setActiveView] = useState<'discover' | 'agency' | 'guide' | 'booking'>('discover');
  const [selectedAgencyId, setSelectedAgencyId] = useState<string | null>(null);
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState(initialBookingForm);
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    const storedAgencies = loadGuideAgencies();
    setAgencies(storedAgencies);

    const storedBookings = window.localStorage.getItem('guide_bookings');
    if (storedBookings) {
      setGuideBookings(JSON.parse(storedBookings));
    }
  }, []);

  const filteredAgencies = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return agencies.filter((agency) => {
      const divisionMatch = !selectedDivision || agency.division === selectedDivision;
      const searchMatch = !query || [agency.name, agency.shortDescription, agency.fullDescription, ...agency.coveredDestinations]
        .join(' ')
        .toLowerCase()
        .includes(query);
      return divisionMatch && searchMatch;
    });
  }, [agencies, searchTerm, selectedDivision]);

  const selectedAgency = agencies.find((agency) => agency.id === selectedAgencyId) ?? null;
  const selectedGuide = selectedAgency?.guides.find((guide) => guide.id === selectedGuideId) ?? null;

  const handleOpenAgency = (agency: GuideAgency) => {
    setSelectedAgencyId(agency.id);
    setSelectedGuideId(null);
    setActiveView('agency');
    setBookingMessage(null);
    setBookingError(null);
  };

  const handleOpenGuide = (guide: GuideProfile) => {
    setSelectedGuideId(guide.id);
    setActiveView('guide');
    setBookingMessage(null);
    setBookingError(null);
  };

  const handleOpenBooking = (guide: GuideProfile) => {
    setSelectedGuideId(guide.id);
    setBookingForm({
      ...initialBookingForm,
      destination: selectedAgency?.coveredDestinations[0] ?? '',
      contactNumber: '01700000000',
    });
    setActiveView('booking');
    setBookingMessage(null);
    setBookingError(null);
  };

  const handleBookingSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedGuide || !selectedAgency) {
      return;
    }

    const startDate = bookingForm.startDate;
    const endDate = bookingForm.endDate;

    if (!bookingForm.travelerCount || !bookingForm.contactNumber || !bookingForm.destination || !startDate || !endDate || !bookingForm.hotelName) {
      setBookingError('Please complete all required booking fields.');
      return;
    }

    if (startDate > endDate) {
      setBookingError('The tour end date must be on or after the start date.');
      return;
    }

    const conflict = hasGuideBookingConflict(guideBookings, selectedGuide.id, startDate, endDate);
    if (conflict) {
      setBookingError('This tour guide is already booked for the selected dates. Please choose another guide or select different travel dates.');
      return;
    }

    const newBooking: GuideBooking = {
      id: `guide-booking-${Date.now()}`,
      guideId: selectedGuide.id,
      agencyId: selectedAgency.id,
      guideName: selectedGuide.name,
      agencyName: selectedAgency.name,
      destination: bookingForm.destination,
      startDate,
      endDate,
      travelerCount: Number(bookingForm.travelerCount),
      contactNumber: bookingForm.contactNumber,
      hotelName: bookingForm.hotelName,
      hotelAddress: bookingForm.hotelAddress,
      specialRequests: bookingForm.specialRequests,
      createdAt: new Date().toISOString(),
      status: getGuideBookingStatus(startDate, endDate),
    };

    const updatedBookings = [...guideBookings, newBooking];
    setGuideBookings(updatedBookings);
    window.localStorage.setItem('guide_bookings', JSON.stringify(updatedBookings));
    setBookingForm(initialBookingForm);
    setBookingMessage('Guide booking completed successfully.');
    setBookingError(null);
    setActiveView('agency');
  };

  const resetToDiscover = () => {
    setActiveView('discover');
    setSelectedAgencyId(null);
    setSelectedGuideId(null);
    setBookingError(null);
    setBookingMessage(null);
  };

  const handleBackFromAgency = () => {
    if (activeView === 'guide' || activeView === 'booking') {
      setActiveView('agency');
      setSelectedGuideId(null);
      setBookingError(null);
      setBookingMessage(null);
      return;
    }
    resetToDiscover();
  };

  const renderDiscoverView = () => (
    <>
      <div className="px-4 py-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search destination or tourist place..."
            className="w-full rounded-full border border-border bg-card px-10 py-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="rounded-2xl border border-border/50 bg-card/70 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">Suggested destinations</p>
          <div className="flex flex-wrap gap-2">
            {destinationSuggestions.map((destination) => (
              <button
                key={destination}
                type="button"
                onClick={() => setSearchTerm(destination)}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary"
              >
                {destination}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Browse by Division</h2>
            <span className="text-sm text-muted-foreground">8 divisions</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {divisions.map((division) => {
              const isSelected = selectedDivision === division;
              return (
                <button
                  key={division}
                  type="button"
                  onClick={() => setSelectedDivision(isSelected ? null : division)}
                  className={`rounded-xl border p-3 text-left transition-all ${isSelected ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-foreground hover:border-primary/50'}`}
                >
                  <div className="font-semibold">{division}</div>
                  <div className="text-xs opacity-80">{agencies.filter((agency) => agency.division === division).length} agencies</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Guide Agencies</h2>
            <span className="text-sm text-muted-foreground">{filteredAgencies.length} found</span>
          </div>
          {filteredAgencies.length > 0 ? filteredAgencies.map((agency) => (
            <Card key={agency.id} className="overflow-hidden">
              <div className="p-4 space-y-4">
                <div className="flex gap-3">
                  <img src={agency.logo} alt={agency.name} className="h-14 w-14 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-foreground">{agency.name}</h3>
                      <span className="rounded-full bg-secondary/20 px-2 py-1 text-xs font-semibold text-secondary">{agency.division}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{agency.shortDescription}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Star size={14} className="fill-primary text-primary" />{agency.rating}</span>
                      <span>({agency.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-background/70 p-3">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Covered destinations</div>
                  <div className="flex flex-wrap gap-2">
                    {agency.coveredDestinations.slice(0, 4).map((destination) => (
                      <span key={destination} className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">{destination}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border/40 pt-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Starting from</div>
                    <div className="font-semibold text-primary">{currencyFormat(agency.startingPrice)}</div>
                  </div>
                  <Button onClick={() => handleOpenAgency(agency)} size="sm">View Details</Button>
                </div>
              </div>
            </Card>
          )) : (
            <Card className="p-6 text-center text-muted-foreground">
              No agencies match your search yet. Try another destination or division.
            </Card>
          )}
        </div>
      </div>
    </>
  );

  const renderAgencyView = () => {
    if (!selectedAgency) {
      return null;
    }

    return (
      <div className="px-4 py-4 space-y-4">
        <Button variant="outline" className="w-full justify-start gap-2" onClick={handleBackFromAgency}>
          <ArrowLeft size={16} /> Back to agencies
        </Button>

        {bookingMessage ? <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700">{bookingMessage}</div> : null}
        {bookingError ? <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600">{bookingError}</div> : null}

        <Card className="overflow-hidden">
          <div className="p-4 space-y-4">
            <div className="flex gap-3">
              <img src={selectedAgency.logo} alt={selectedAgency.name} className="h-16 w-16 rounded-full object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">{selectedAgency.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{selectedAgency.fullDescription}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star size={14} className="fill-primary text-primary" /> {selectedAgency.rating}</span>
                  <span>({selectedAgency.reviewCount} reviews)</span>
                  <span className="flex items-center gap-1"><Users size={14} /> {selectedAgency.activeGuides} active guides</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border/40 bg-background/70 p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Division</div>
                <div className="mt-1 font-semibold text-foreground">{selectedAgency.division}</div>
              </div>
              <div className="rounded-lg border border-border/40 bg-background/70 p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Office address</div>
                <div className="mt-1 font-semibold text-foreground">{selectedAgency.officeAddress}</div>
              </div>
              <div className="rounded-lg border border-border/40 bg-background/70 p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</div>
                <div className="mt-1 font-semibold text-foreground">{selectedAgency.contactNumber}</div>
              </div>
              <div className="rounded-lg border border-border/40 bg-background/70 p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Experience</div>
                <div className="mt-1 font-semibold text-foreground">{selectedAgency.yearsOfExperience} years</div>
              </div>
            </div>

            <div className="rounded-lg border border-border/40 bg-background/70 p-3">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Covered destinations</div>
              <div className="flex flex-wrap gap-2">
                {selectedAgency.coveredDestinations.map((destination) => (
                  <span key={destination} className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">{destination}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Available Tour Guides</h3>
            <span className="text-sm text-muted-foreground">{selectedAgency.guides.length} professionals</span>
          </div>
          <div className="space-y-3">
            {selectedAgency.guides.map((guide) => (
              <div key={guide.id} className="rounded-xl border border-border/40 bg-background/60 p-3">
                <div className="flex gap-3">
                  <img src={guide.photo} alt={guide.name} className="h-14 w-14 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-foreground">{guide.name}</h4>
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${guide.status === 'Available' ? 'bg-emerald-500/10 text-emerald-700' : 'bg-amber-500/10 text-amber-700'}`}>{guide.status}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span>{guide.age} years</span>
                      <span>{guide.yearsOfExperience} yrs</span>
                      <span>{guide.rating} ★</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {guide.specialization.slice(0, 3).map((item) => <span key={item} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{item}</span>)}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border/30 pt-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Guide fee</div>
                    <div className="font-semibold text-primary">{currencyFormat(guide.fee)} / day</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenGuide(guide)}>View Profile</Button>
                    <Button size="sm" onClick={() => handleOpenBooking(guide)} disabled={guide.status !== 'Available'}>{guide.status === 'Available' ? 'Book Appointment' : 'Unavailable'}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold text-foreground">Customer Reviews</h3>
          <div className="mt-3 space-y-2">
            {selectedAgency.reviews.map((review) => (
              <div key={review.id} className="rounded-lg border border-border/40 bg-background/60 p-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-foreground">{review.userName}</div>
                  <div className="text-sm text-muted-foreground">{review.date}</div>
                </div>
                <div className="mt-1 flex items-center gap-1 text-sm text-primary"><Star size={14} className="fill-primary" /> {review.rating}</div>
                <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  const renderGuideView = () => {
    if (!selectedGuide || !selectedAgency) {
      return null;
    }

    return (
      <div className="px-4 py-4 space-y-4">
        <Button variant="outline" className="w-full justify-start gap-2" onClick={() => handleBackFromAgency()}>
          <ArrowLeft size={16} /> Back to agency
        </Button>

        <Card className="overflow-hidden">
          <div className="p-4 space-y-4">
            <div className="flex gap-3">
              <img src={selectedGuide.photo} alt={selectedGuide.name} className="h-20 w-20 rounded-full object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">{selectedGuide.name}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star size={14} className="fill-primary text-primary" /> {selectedGuide.rating}</span>
                  <span>({selectedGuide.reviewCount} reviews)</span>
                  <span className="flex items-center gap-1"><Wallet size={14} /> {currencyFormat(selectedGuide.fee)} / day</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${selectedGuide.status === 'Available' ? 'bg-emerald-500/10 text-emerald-700' : 'bg-amber-500/10 text-amber-700'}`}>{selectedGuide.status}</span>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">{selectedGuide.division}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border/40 bg-background/70 p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Age</div>
                <div className="mt-1 font-semibold text-foreground">{selectedGuide.age} years</div>
              </div>
              <div className="rounded-lg border border-border/40 bg-background/70 p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Languages</div>
                <div className="mt-1 font-semibold text-foreground">{selectedGuide.languages.join(', ')}</div>
              </div>
              <div className="rounded-lg border border-border/40 bg-background/70 p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Experience</div>
                <div className="mt-1 font-semibold text-foreground">{selectedGuide.yearsOfExperience} years</div>
              </div>
              <div className="rounded-lg border border-border/40 bg-background/70 p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Guide Fee</div>
                <div className="mt-1 font-semibold text-foreground">{currencyFormat(selectedGuide.fee)} / day</div>
              </div>
            </div>

            <div className="rounded-lg border border-border/40 bg-background/70 p-3">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Areas of expertise</div>
              <div className="flex flex-wrap gap-2">
                {selectedGuide.expertise.map((item) => <span key={item} className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">{item}</span>)}
              </div>
            </div>

            <div className="rounded-lg border border-border/40 bg-background/70 p-3">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Professional history</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-muted-foreground">Tours completed</div>
                  <div className="font-semibold text-foreground">{selectedGuide.totalToursCompleted}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Popular destinations</div>
                  <div className="font-semibold text-foreground">{selectedGuide.popularDestinations.join(', ')}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Certifications</div>
                  <div className="font-semibold text-foreground">{selectedGuide.certifications.join(', ')}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Safety training</div>
                  <div className="font-semibold text-foreground">{selectedGuide.safetyTraining.join(', ')}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => handleOpenBooking(selectedGuide)} disabled={selectedGuide.status !== 'Available'}>{selectedGuide.status === 'Available' ? 'Book Appointment' : 'Guide is currently unavailable'}</Button>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold text-foreground">Reviews</h3>
          <div className="mt-3 space-y-2">
            {selectedGuide.reviews.map((review) => (
              <div key={review.id} className="rounded-lg border border-border/40 bg-background/60 p-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-foreground">{review.userName}</div>
                  <div className="text-sm text-muted-foreground">{review.date}</div>
                </div>
                <div className="mt-1 flex items-center gap-1 text-sm text-primary"><Star size={14} className="fill-primary" /> {review.rating}</div>
                <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  const renderBookingView = () => {
    if (!selectedGuide || !selectedAgency) {
      return null;
    }

    return (
      <div className="px-4 py-4 space-y-4">
        <Button variant="outline" className="w-full justify-start gap-2" onClick={() => handleBackFromAgency()}>
          <ArrowLeft size={16} /> Back to guide profile
        </Button>

        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Book {selectedGuide.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedAgency.name}</p>
            </div>
            <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{selectedGuide.status}</div>
          </div>

          <form className="space-y-3" onSubmit={handleBookingSubmit}>
            {bookingError ? <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600">{bookingError}</div> : null}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Number of travelers</label>
                <input type="number" min="1" value={bookingForm.travelerCount} onChange={(event) => setBookingForm((prev) => ({ ...prev, travelerCount: event.target.value }))} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Contact number</label>
                <input type="tel" value={bookingForm.contactNumber} onChange={(event) => setBookingForm((prev) => ({ ...prev, contactNumber: event.target.value }))} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Tour destination</label>
                <input value={bookingForm.destination} onChange={(event) => setBookingForm((prev) => ({ ...prev, destination: event.target.value }))} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Hotel name</label>
                <input value={bookingForm.hotelName} onChange={(event) => setBookingForm((prev) => ({ ...prev, hotelName: event.target.value }))} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Tour start date</label>
                <input type="date" readOnly value={bookingForm.startDate} onChange={(event) => setBookingForm((prev) => ({ ...prev, startDate: event.target.value }))} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Tour end date</label>
                <input type="date" readOnly value={bookingForm.endDate} onChange={(event) => setBookingForm((prev) => ({ ...prev, endDate: event.target.value }))} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Hotel address (optional)</label>
              <input value={bookingForm.hotelAddress} onChange={(event) => setBookingForm((prev) => ({ ...prev, hotelAddress: event.target.value }))} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Special requests (optional)</label>
              <textarea value={bookingForm.specialRequests} onChange={(event) => setBookingForm((prev) => ({ ...prev, specialRequests: event.target.value }))} className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setActiveView('guide')}>Cancel</Button>
              <Button type="submit" className="flex-1">Confirm Booking</Button>
            </div>
          </form>
        </Card>
      </div>
    );
  };

  return (
    <div className="pb-24 bg-background min-h-screen">
      <div className="sticky top-0 z-10 border-b border-border/40 bg-card px-4 py-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Guide Marketplace</h1>
            <p className="mt-1 text-sm text-muted-foreground">Discover premium guide agencies, compare professionals, and book with confidence.</p>
          </div>
          <div className="rounded-full border border-primary/20 bg-primary/10 p-2 text-primary">
            <Compass size={18} />
          </div>
        </div>
      </div>

      {activeView === 'discover' ? renderDiscoverView() : null}
      {activeView === 'agency' ? renderAgencyView() : null}
      {activeView === 'guide' ? renderGuideView() : null}
      {activeView === 'booking' ? renderBookingView() : null}
    </div>
  );
}
