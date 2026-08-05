import { describe, expect, it } from 'vitest';
import { getGuideBookingStatus, hasGuideBookingConflict } from './guideMarketplace';

describe('guide marketplace booking helpers', () => {
  it('detects overlapping guide bookings', () => {
    const bookings = [
      {
        id: '1',
        guideId: 'guide-1',
        agencyId: 'agency-1',
        guideName: 'Test Guide',
        agencyName: 'Test Agency',
        destination: 'Cox\'s Bazar',
        startDate: '2026-08-01',
        endDate: '2026-08-03',
        travelerCount: 2,
        contactNumber: '01700000000',
        hotelName: 'Hotel Test',
        hotelAddress: 'Dhaka',
        specialRequests: '',
        createdAt: '2026-07-01',
        status: 'Upcoming' as const,
      },
    ];

    expect(hasGuideBookingConflict(bookings, 'guide-1', '2026-08-02', '2026-08-04')).toBe(true);
    expect(hasGuideBookingConflict(bookings, 'guide-1', '2026-08-04', '2026-08-05')).toBe(false);
  });

  it('returns booking status based on current date', () => {
    const today = new Date();
    const upcoming = new Date(today);
    upcoming.setDate(today.getDate() + 5);
    const futureStart = new Date(today);
    futureStart.setDate(today.getDate() + 2);
    const past = new Date(today);
    past.setDate(today.getDate() - 2);
    const ongoingStart = new Date(today);
    ongoingStart.setDate(today.getDate() - 1);
    const ongoingEnd = new Date(today);
    ongoingEnd.setDate(today.getDate() + 1);

    expect(getGuideBookingStatus(futureStart.toISOString().slice(0, 10), upcoming.toISOString().slice(0, 10))).toBe('Upcoming');
    expect(getGuideBookingStatus(past.toISOString().slice(0, 10), past.toISOString().slice(0, 10))).toBe('Completed');
    expect(getGuideBookingStatus(ongoingStart.toISOString().slice(0, 10), ongoingEnd.toISOString().slice(0, 10))).toBe('Ongoing');
  });
});
