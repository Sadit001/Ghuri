import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { Division, Category } from '@shared/data';
import type { TripBuilderInput, BudgetType } from '@shared/tripPlanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface TripFormProps {
  onGenerate: (data: TripBuilderInput) => void;
  isLoading?: boolean;
}

const DIVISIONS: Division[] = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
];

const CATEGORIES: Category[] = [
  'Historical',
  'Natural/Scenic',
  'Hill/Hill-Tracts',
  'Sea/Beach',
  'River/Waterfall',
  'Religious',
  'Adventure/Wildlife',
  'Urban/Modern',
];

const BUDGET_TYPES: BudgetType[] = ['Low Budget', 'Medium Budget', 'Premium Budget'];

export function TripBuilderForm({ onGenerate, isLoading = false }: TripFormProps) {
  const [numberOfPeople, setNumberOfPeople] = useState<number | "">(1);
  const [duration, setDuration] = useState(3);
  const [fromLocation, setFromLocation] = useState('');
  const [budgetType, setBudgetType] = useState<BudgetType>('Medium Budget');
  const [exploreDivision, setExploreDivision] = useState(true);
  const [selectedDivision, setSelectedDivision] = useState<Division>('Dhaka');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [customPlaces, setCustomPlaces] = useState<string[]>([]);
  const [customPlaceInput, setCustomPlaceInput] = useState('');
  const [detectingLocation, setDetectingLocation] = useState(false);

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const addCustomPlace = () => {
    if (customPlaceInput.trim()) {
      setCustomPlaces((prev) => [...prev, customPlaceInput.trim()]);
      setCustomPlaceInput('');
    }
  };

  const removeCustomPlace = (place: string) => {
    setCustomPlaces((prev) => prev.filter((p) => p !== place));
  };

  const autoDetectLocation = () => {
    if (!navigator?.geolocation) {
      alert('Geolocation is not available in your browser.');
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const detected = `Current Location (${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)})`;
        setFromLocation(detected);
        setDetectingLocation(false);
      },
      () => {
        alert('Unable to detect your location. Please enter it manually.');
        setDetectingLocation(false);
      },
      { timeout: 10000 }
    );
  };

  const handleGenerate = () => {
    if (!fromLocation.trim()) {
      alert('Please enter where you are traveling from');
      return;
    }

    if (exploreDivision && selectedCategories.length === 0) {
      alert('Please select at least one category');
      return;
    }

    if (!exploreDivision && customPlaces.length === 0) {
      alert('Please add at least one destination');
      return;
    }

    onGenerate({
      numberOfPeople: Number(numberOfPeople) || 1,
      duration,
      fromLocation,
      budgetType,
      exploreDivision,
      selectedDivision: exploreDivision ? selectedDivision : undefined,
      selectedCategories: exploreDivision ? selectedCategories : undefined,
      customPlaces: !exploreDivision ? customPlaces : undefined,
    });
  };

  return (
    <div className="space-y-6 px-4 py-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Number of Travelers
          </label>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNumberOfPeople(Math.max(1, (Number(numberOfPeople) || 1) - 1))}
            >
              −
            </Button>
            <Input
              type="number"
              value={numberOfPeople}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  setNumberOfPeople('');
                } else {
                  const num = parseInt(val, 10);
                  setNumberOfPeople(isNaN(num) ? '' : Math.max(1, num));
                }
              }}
              onBlur={() => {
                if (numberOfPeople === '' || numberOfPeople < 1) {
                  setNumberOfPeople(1);
                }
              }}
              className="text-center w-20"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNumberOfPeople((Number(numberOfPeople) || 1) + 1)}
            >
              +
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Trip Duration
          </label>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDuration(Math.max(1, duration - 1))}
            >
              −
            </Button>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
              className="text-center w-20"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDuration(duration + 1)}
            >
              +
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {duration} Day{duration > 1 ? 's' : ''} • {Math.max(0, duration - 1)} Night{duration - 1 !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Budget Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {BUDGET_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setBudgetType(type)}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                budgetType === type ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Starting Location
        </label>
        <Input
          type="text"
          placeholder="e.g., Dhaka, Chattogram, Airport, Hotel Name"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={autoDetectLocation}
            disabled={detectingLocation}
          >
            {detectingLocation ? 'Detecting location…' : 'Auto Detect'}
          </Button>
          <span className="text-xs text-muted-foreground">Use device location permission</span>
        </div>
      </div>

      <div className="bd-card p-4">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold text-foreground">
            Explore Division
          </label>
          <button
            onClick={() => setExploreDivision(!exploreDivision)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              exploreDivision ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                exploreDivision ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {exploreDivision ? (
          <>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">
                Select Division
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DIVISIONS.map((division) => (
                  <button
                    key={division}
                    onClick={() => setSelectedDivision(division)}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                      selectedDivision === division
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {division}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">
                Select Categories
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-2 rounded-lg font-medium text-sm text-left transition-all ${
                      selectedCategories.includes(category)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-muted-foreground uppercase">
                Add Destinations
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter destinations like Cox's Bazar, Sajek Valley"
                  value={customPlaceInput}
                  onChange={(e) => setCustomPlaceInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomPlace();
                    }
                  }}
                />
                <Button size="sm" onClick={addCustomPlace}>
                  <Plus size={18} />
                </Button>
              </div>

              {customPlaces.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {customPlaces.map((place) => (
                    <Badge key={place} variant="secondary" className="pl-3 gap-2">
                      {place}
                      <button
                        onClick={() => removeCustomPlace(place)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? 'Generating Plan...' : 'Generate Trip Plan'}
      </Button>
    </div>
  );
}
