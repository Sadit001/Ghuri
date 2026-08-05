import { useState } from 'react';
import { ChevronLeft, Star, Bookmark, Share2, AlertCircle, UtensilsCrossed, Clock, MapPin } from 'lucide-react';
import type { Destination } from '@shared/data';

interface DestinationDetailProps {
  destination: Destination;
  onBack: () => void;
}

const currencyFormat = (value: number) => `৳${value.toLocaleString()}`;

export function DestinationDetail({ destination, onBack }: DestinationDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState(false);

  return (
    <div className="pb-24 bg-background min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center px-4 py-3 bg-gradient-to-b from-black/40 to-transparent">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-3">
          <button className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white">
            <Bookmark size={20} />
          </button>
          <button className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src={destination.images[currentImageIndex]}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Image Indicators */}
        {destination.images.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
            {destination.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/40 w-1.5'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Sections */}
      <div className="px-4 py-6 space-y-6">
        {/* Title, Rating, Categories */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">{destination.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={18} className="text-primary fill-primary" />
              <span className="font-semibold text-foreground">{destination.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({destination.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Categories & Amenities */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {destination.categories.map(cat => (
                <span
                  key={cat}
                  className="text-xs px-3 py-1 rounded-full bg-secondary/20 text-secondary font-semibold"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Amenities Icons */}
            {destination.amenities && destination.amenities.length > 0 && (
              <div className="flex gap-4 pt-2">
                {destination.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold mb-1">
                      {amenity === 'No Wifi' ? '📶' : amenity === 'Foreign' ? '🌍' : '✓'}
                    </div>
                    <span className="text-xs text-muted-foreground text-center">{amenity}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">About</h3>
          <p className="text-foreground leading-relaxed">
            {expandedDescription ? destination.fullHistory : destination.description}
          </p>
          {!expandedDescription && destination.fullHistory.length > destination.description.length && (
            <button
              onClick={() => setExpandedDescription(true)}
              className="text-primary hover:text-primary-light font-semibold text-sm transition-colors"
            >
              Read more ↓
            </button>
          )}
        </div>

        {/* Best Time to Visit */}
        <div className="bg-card rounded-xl p-4 border border-border/40 space-y-3">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Best Time to Visit</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <span className="text-xs text-muted-foreground font-semibold uppercase mt-0.5">🌤️ Season</span>
              <span className="text-foreground font-semibold">{destination.bestTimeToVisit.season}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs text-muted-foreground font-semibold uppercase mt-0.5">⏰ Time of Day</span>
              <span className="text-foreground">{destination.bestTimeToVisit.timeOfDay}</span>
            </div>
            {destination.categories.includes('Sea/Beach') && (
              <p className="text-xs text-muted-foreground italic pt-1">
                Avoid monsoon months (June-September) when the sea is rough and swimming is dangerous
              </p>
            )}
          </div>
        </div>

        {/* How to Get There */}
        <div className="bg-card rounded-xl p-4 border border-border/40 space-y-3">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">How to Get There</h3>
          <div className="space-y-3">
            {destination.transportOptions.map((option, idx) => (
              <div key={idx} className="p-3 bg-background rounded-lg border border-border/40 space-y-1">
                <div className="flex items-start gap-3">
                  <span className="text-lg">
                    {option.type === 'Air' && '✈️'}
                    {option.type === 'Bus' && '🚌'}
                    {option.type === 'Train' && '🚆'}
                    {option.type === 'CNG' && '🛺'}
                    {option.type === 'Rickshaw' && '🚲'}
                    {option.type === 'Ride-share' && '🚗'}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-foreground">{option.type}</span>
                      <span className="text-sm text-primary font-semibold">
                        {currencyFormat(option.fareRange.min)}-{currencyFormat(option.fareRange.max)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{option.estimatedTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fair Price Guide */}
        {destination.fairPriceGuide && destination.fairPriceGuide.length > 0 && (
          <div className="bg-card rounded-xl p-4 border border-border/40 space-y-3">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Fair Price Guide</h3>
            <div className="space-y-3">
              {destination.fairPriceGuide.map((guide, idx) => (
                <div key={idx} className="p-3 bg-background rounded-lg border border-border/40 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <span className="text-lg flex-shrink-0">💵</span>
                      <div>
                        <span className="font-semibold text-foreground text-sm">{guide.item}</span>
                        <p className="text-xs text-muted-foreground">{guide.description}</p>
                      </div>
                    </div>
                    <span className="text-sm text-primary font-semibold flex-shrink-0 whitespace-nowrap">
                      {currencyFormat(guide.priceRange.min)}-{currencyFormat(guide.priceRange.max)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visit Duration */}
        <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} className="text-secondary" />
            <span className="text-xs text-muted-foreground font-semibold uppercase">Visit Duration</span>
          </div>
          <p className="font-semibold text-foreground text-lg">{destination.estimatedVisitDuration}</p>
        </div>

        {/* Nearby Hotels */}
        {destination.nearbyHotels && destination.nearbyHotels.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Nearby Hotels</h3>
            <div className="space-y-3">
              {destination.nearbyHotels.map(hotel => (
                <div
                  key={hotel.id}
                  className="bg-card rounded-xl overflow-hidden border border-border/40 hover:shadow-lg transition-all"
                >
                  <div className="flex gap-3 h-32">
                    {/* Hotel Image */}
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-32 h-32 object-cover flex-shrink-0"
                    />

                    {/* Hotel Info */}
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-foreground text-sm">{hotel.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={14} className="text-primary fill-primary" />
                          <span className="text-xs font-semibold text-foreground">
                            {hotel.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({hotel.reviews} reviews)
                          </span>
                        </div>
                        {hotel.distanceFromDestination && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {hotel.distanceFromDestination} km from site
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">per night</p>
                          <p className="font-bold text-primary text-sm">{currencyFormat(hotel.ratePerNight)}</p>
                        </div>
                        <button className="px-4 py-2 rounded-full bg-primary hover:bg-primary-light text-primary-foreground font-semibold text-xs transition-all active:scale-95">
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Food & Dining */}
        {destination.nearbyFood && destination.nearbyFood.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <UtensilsCrossed size={16} className="text-secondary" />
              Food & Dining
            </h3>

            {/* Famous Dishes Tags */}
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase mb-2">Famous Dishes</p>
              <div className="flex flex-wrap gap-2">
                {destination.nearbyFood.slice(0, 3).map((food, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary/20 text-secondary font-semibold"
                  >
                    {food.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Restaurant Details */}
            <div className="space-y-2">
              {destination.nearbyFood.slice(0, 5).map((food, idx) => (
                <div key={idx} className="p-3 bg-background rounded-lg border border-border/40">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🍽️</span>
                      <span className="font-semibold text-foreground text-sm">{food.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-semibold whitespace-nowrap">
                      {currencyFormat(food.priceRange.min)}-{currencyFormat(food.priceRange.max)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{food.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety Tips */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
            <AlertCircle size={16} className="text-primary" />
            Safety Tips
          </h3>
          <div className="space-y-2">
            {destination.safetyTips.map((tip, idx) => (
              <div key={idx} className="p-3 bg-background rounded-lg border border-border/40 flex gap-3">
                <span className="text-orange-500 font-bold flex-shrink-0">⚠️</span>
                <p className="text-sm text-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        {destination.userReviews && destination.userReviews.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Reviews</h3>
            <div className="space-y-3">
              {destination.userReviews.map((review, idx) => (
                <div key={idx} className="p-4 bg-card rounded-lg border border-border/40">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        {review.author[0]}
                      </div>
                      <span className="font-semibold text-foreground">{review.author}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Star size={14} className="text-primary fill-primary" />
                      <span className="text-xs font-semibold text-foreground">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA: Add to Trip */}
        <button className="w-full py-4 rounded-full bg-primary hover:bg-primary-light text-primary-foreground font-semibold transition-all active:scale-95 text-lg sticky bottom-24">
          Add to Trip
        </button>
      </div>
    </div>
  );
}
