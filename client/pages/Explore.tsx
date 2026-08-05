import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { divisions, destinations, categories } from '@shared/data';
import type { Division, Category, Destination } from '@shared/data';
import { DestinationList } from '@/components/DestinationList';
import { DestinationDetail } from '@/components/DestinationDetail';

type ExploreStep = 'divisions' | 'categories' | 'spots' | 'detail';

export default function Explore() {
  const [step, setStep] = useState<ExploreStep>('divisions');
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const divisionImages: Record<Division, string> = {
    Dhaka: 'https://images.unsplash.com/photo-1570147088989-e75582edfe20?w=800',
    Chattogram: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    Rajshahi: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    Khulna: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    Barishal: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    Sylhet: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    Rangpur: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    Mymensingh: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  };

  const divisionTaglines: Record<Division, string> = {
    Dhaka: 'Heart of Bangladesh',
    Chattogram: 'Port City & Hill Tracts',
    Rajshahi: 'Land of Silk',
    Khulna: 'Sundarbans & Mangroves',
    Barishal: 'Rivers & Islands',
    Sylhet: 'Tea Gardens & Springs',
    Rangpur: 'Northern Plains',
    Mymensingh: 'Agriculture & Culture',
  };

  const handleDivisionSelect = (division: Division) => {
    setSelectedDivision(division);
    setSelectedCategories([]);
    setStep('categories');
  };

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination);
    setStep('detail');
  };

  const handleBack = () => {
    if (step === 'detail') {
      setStep('categories');
      setSelectedDestination(null);
    } else if (step === 'categories') {
      setStep('divisions');
      setSelectedDivision(null);
      setSelectedCategories([]);
    }
  };

  // Filter destinations based on selection
  const filteredDestinations = destinations.filter(d => {
    if (d.division !== selectedDivision) return false;
    if (selectedCategories.length === 0) return true;
    return d.categories.some(cat => selectedCategories.includes(cat));
  });

  if (step === 'detail' && selectedDestination) {
    return <DestinationDetail destination={selectedDestination} onBack={handleBack} />;
  }

  if (step === 'categories') {
    return (
      <div className="pb-24 bg-background min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border/40 px-4 py-4">
          <button
            onClick={handleBack}
            className="mb-4 text-primary hover:text-primary-light transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Discover Bangladesh
          </h1>
          <p className="text-muted-foreground text-sm">
            Choose a destination
          </p>
        </div>

        {/* Division Info */}
        <div className="px-4 py-4 bg-card/50 border-b border-border/40">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
              {selectedDivision?.[0]}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Exploring {selectedDivision} Division
              </h3>
              <p className="text-xs text-muted-foreground">
                {filteredDestinations.length} destinations available
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-4 py-4 border-b border-border/40 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">Filter by category</h4>
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="text-xs text-primary hover:text-primary-light"
              >
                All
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategories.includes(category)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border/40 text-foreground hover:border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations List */}
        <div className="px-4 py-4 space-y-4">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">
                No destinations found
              </p>
              <button
                onClick={() => setSelectedCategories([])}
                className="text-primary hover:text-primary-light"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredDestinations.map(destination => (
              <button
                key={destination.id}
                onClick={() => handleDestinationSelect(destination)}
                className="w-full text-left bd-card overflow-hidden hover:shadow-xl transition-all active:scale-95"
              >
                {/* Image */}
                <div className="w-full h-48 overflow-hidden relative">
                  <img
                    src={destination.images[0]}
                    alt={destination.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Title and Rating */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {destination.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold text-foreground flex items-center gap-0.5">
                            ★ {destination.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({destination.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2">
                    {destination.categories.slice(0, 2).map(cat => (
                      <span
                        key={cat}
                        className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary font-semibold"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Entry Fee Preview */}
                  <div className="pt-2 border-t border-border/40 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Entry Fee</span>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Local</div>
                      <span className="text-sm font-semibold text-primary">
                        ৳{destination.localEntryFee.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    );
  }

  // Step 1: Division Selection
  return (
    <div className="pb-24 bg-background min-h-screen">
      {/* Header */}
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Explore Bangladesh
        </h1>
        <p className="text-muted-foreground">
          Choose a division to discover amazing destinations
        </p>
      </div>

      {/* Division Grid */}
      <div className="px-4 space-y-3">
        {divisions.map(division => (
          <button
            key={division}
            onClick={() => handleDivisionSelect(division)}
            className="group w-full h-40 rounded-2xl overflow-hidden relative bd-card hover:shadow-xl transition-all active:scale-95"
          >
            {/* Background Image */}
            <img
              src={divisionImages[division]}
              alt={division}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-black/60 to-black/30" />

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-white drop-shadow-lg">{division}</h2>
                <ChevronRight className="text-primary group-hover:translate-x-1 transition-transform drop-shadow-md" />
              </div>
              <p className="text-sm text-white/90 drop-shadow-md">{divisionTaglines[division]}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
