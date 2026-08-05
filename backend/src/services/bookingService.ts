import { MESSAGES } from '../constants/messages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { bookingRepository } from '../repositories/bookingRepository';
import { userRepository } from '../repositories/userRepository';
import { Booking, BookingStatus, BookingType, CreateBookingDto } from '../types/booking';
import { ApiError } from '../utils/apiError';

export class BookingService {
  async createBooking(userId: string, dto: CreateBookingDto): Promise<Booking> {
    const booking = await bookingRepository.create({
      userId,
      type: dto.type,
      title: dto.title,
      date: dto.date || new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      cost: dto.cost,
      details: dto.details,
      guideMeta: dto.guideMeta,
      hotelMeta: dto.hotelMeta,
      spotMeta: dto.spotMeta,
      tripPlan: dto.tripPlan,
    });

    // Update user stats
    const user = await userRepository.findById(userId);
    if (user) {
      const stats = user.stats || { totalTrips: 0, completedTrips: 0, guideBookings: 0, savedSpots: 0 };
      if (dto.type === 'trip') stats.totalTrips += 1;
      if (dto.type === 'guide') stats.guideBookings += 1;
      if (dto.type === 'spot') stats.savedSpots += 1;
      await userRepository.update(userId, { stats });
    }

    return booking;
  }

  async getUserBookings(userId: string, status?: BookingStatus, type?: BookingType): Promise<Booking[]> {
    return bookingRepository.findByUserId(userId, { status, type });
  }

  async getBookingById(id: string, userId: string): Promise<Booking> {
    const booking = await bookingRepository.findById(id);
    if (!booking) {
      throw new ApiError(MESSAGES.BOOKING.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    if (booking.userId !== userId) {
      throw new ApiError('Unauthorized to access this booking.', HTTP_STATUS.FORBIDDEN);
    }
    return booking;
  }

  async updateBookingStatus(id: string, userId: string, status: BookingStatus): Promise<Booking> {
    await this.getBookingById(id, userId);
    const updated = await bookingRepository.updateStatus(id, status);
    if (!updated) {
      throw new ApiError(MESSAGES.BOOKING.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return updated;
  }

  async cancelBooking(id: string, userId: string): Promise<Booking> {
    return this.updateBookingStatus(id, userId, 'Cancelled');
  }
}

export const bookingService = new BookingService();
