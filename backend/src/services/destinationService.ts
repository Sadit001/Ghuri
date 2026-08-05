import { MESSAGES } from '../constants/messages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { destinationRepository } from '../repositories/destinationRepository';
import { Destination, Hotel } from '../types/destination';
import { ApiError } from '../utils/apiError';

export class DestinationService {
  async getAllDestinations(query?: { division?: string; category?: string; search?: string }): Promise<Destination[]> {
    return destinationRepository.findAll(query);
  }

  async getDestinationById(id: string): Promise<Destination> {
    const dest = await destinationRepository.findById(id);
    if (!dest) {
      throw new ApiError(MESSAGES.DESTINATION.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return dest;
  }

  async getAllHotels(query?: { division?: string; destination?: string }): Promise<Hotel[]> {
    return destinationRepository.findAllHotels(query);
  }

  async getHotelById(id: string): Promise<Hotel> {
    const hotel = await destinationRepository.findHotelById(id);
    if (!hotel) {
      throw new ApiError('Hotel not found.', HTTP_STATUS.NOT_FOUND);
    }
    return hotel;
  }
}

export const destinationService = new DestinationService();
