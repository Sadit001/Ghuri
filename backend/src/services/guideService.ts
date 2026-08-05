import { MESSAGES } from '../constants/messages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { bookingRepository } from '../repositories/bookingRepository';
import { guideRepository } from '../repositories/guideRepository';
import { userRepository } from '../repositories/userRepository';
import { Agency, BookGuideDto, GuideBookingCheckRequest, Review, TourGuide } from '../types/guide';
import { ApiError } from '../utils/apiError';

export class GuideService {
  async getAllGuides(division?: string, specialization?: string): Promise<TourGuide[]> {
    return guideRepository.findAllGuides({ division, specialization });
  }

  async getGuideById(id: string): Promise<TourGuide> {
    const guide = await guideRepository.findGuideById(id);
    if (!guide) {
      throw new ApiError(MESSAGES.GUIDE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return guide;
  }

  async checkAvailability(req: GuideBookingCheckRequest): Promise<{ available: boolean; message: string; conflictingDates?: string[] }> {
    const guide = await this.getGuideById(req.guideId);
    const requestedDates = this.generateDateRange(req.startDate, req.endDate);
    const bookedDates = guide.bookedDates || [];

    const conflicts = requestedDates.filter((d) => bookedDates.includes(d));

    if (conflicts.length > 0) {
      return {
        available: false,
        message: MESSAGES.GUIDE.UNAVAILABLE,
        conflictingDates: conflicts,
      };
    }

    return {
      available: true,
      message: MESSAGES.GUIDE.AVAILABLE,
    };
  }

  async bookGuide(userId: string, dto: BookGuideDto) {
    const availability = await this.checkAvailability({
      guideId: dto.guideId,
      startDate: dto.startDate,
      endDate: dto.endDate,
    });

    if (!availability.available) {
      throw new ApiError(availability.message, HTTP_STATUS.CONFLICT, { conflictingDates: availability.conflictingDates });
    }

    const guide = await this.getGuideById(dto.guideId);
    const requestedDates = this.generateDateRange(dto.startDate, dto.endDate);
    const totalDays = requestedDates.length;
    const totalCost = totalDays * guide.pricePerDay;

    // Reserve dates on guide record
    await guideRepository.updateGuideBookedDates(guide.id, requestedDates);

    // Save booking record
    const booking = await bookingRepository.create({
      userId,
      type: 'guide',
      title: `Guide Booking: ${guide.name}`,
      date: dto.startDate,
      status: 'Confirmed',
      cost: totalCost,
      details: dto.specialRequests || `Tour guide booking for ${totalDays} days (${dto.startDate} to ${dto.endDate})`,
      guideMeta: {
        guideId: guide.id,
        guideName: guide.name,
        agencyId: guide.agencyId,
        agencyName: guide.agencyName,
        startDate: dto.startDate,
        endDate: dto.endDate,
        totalDays,
        pricePerDay: guide.pricePerDay,
        status: 'Confirmed',
      },
    });

    // Increment user guideBookings stat
    const user = await userRepository.findById(userId);
    if (user) {
      const stats = user.stats || { totalTrips: 0, completedTrips: 0, guideBookings: 0, savedSpots: 0 };
      stats.guideBookings += 1;
      await userRepository.update(userId, { stats });
    }

    return booking;
  }

  async getAllAgencies(division?: string): Promise<Agency[]> {
    return guideRepository.findAllAgencies(division);
  }

  async getAgencyById(id: string): Promise<Agency> {
    const agency = await guideRepository.findAgencyById(id);
    if (!agency) {
      throw new ApiError('Agency not found.', HTTP_STATUS.NOT_FOUND);
    }
    return agency;
  }

  async submitReview(userId: string, guideId: string, rating: number, text: string, photos: string[] = []): Promise<Review> {
    const user = await userRepository.findById(userId);
    const userName = user ? user.name : 'Anonymous Tourist';
    const userPhoto = user?.avatar || '';

    return guideRepository.addReview({
      targetId: guideId,
      targetType: 'guide',
      userId,
      userName,
      userPhoto,
      rating,
      text,
      photos,
    });
  }

  private generateDateRange(start: string, end: string): string[] {
    const dates: string[] = [];
    let current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates.length === 0 ? [start] : dates;
  }
}

export const guideService = new GuideService();
