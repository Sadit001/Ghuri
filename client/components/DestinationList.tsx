import { Star, MapPin } from 'lucide-react';
import type { Destination, Category, Division } from '@shared/data';

interface DestinationListProps {
  destinations: Destination[];
  division: Division | null;
  categories: Category[];
  onDestinationSelect: (destination: Destination) => void;
  onBack: () => void;
}

const currencyFormat = (value: number) => `৳${value.toLocaleString()}`;

export function DestinationList({
  destinations,
  division,
  categories,
  onDestinationSelect,
  onBack,
}: DestinationListProps) {
  return (
    <div className="pb-24 bg-background min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border/40 px-4 py-4">
        <button
          onClick={onBack}
          className="mb-4 text-primary hover:text-primary-light transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-foreground mb-1">
          {division} Destinations
        </h1>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map(cat => (
              <span
                key={cat}
                className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary font-semibold"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Destinations Grid */}
      <div className="p-4 space-y-4">
        {destinations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">
              No destinations found
            </p>
            <button
              onClick={onBack}
              className="text-primary hover:text-primary-light"
            >
              Try different filters
            </button>
          </div>
        ) : (
          destinations.map(destination => (
            <button
              key={destination.id}
              onClick={() => onDestinationSelect(destination)}
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
                        <Star size={16} className="text-primary fill-primary" />
                        <span className="text-sm font-semibold text-foreground">
                          {destination.rating}
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
                      {currencyFormat(destination.localEntryFee)}
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
