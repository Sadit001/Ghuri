import { MESSAGES } from '../constants/messages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { userRepository } from '../repositories/userRepository';
import { UserPreferencesDto, UserProfile } from '../types/user';
import { ApiError } from '../utils/apiError';

export class UserService {
  async getProfile(uid: string): Promise<UserProfile> {
    const user = await userRepository.findById(uid);
    if (!user) {
      throw new ApiError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    delete (user as any).passwordHash;
    return user;
  }

  async updateProfile(uid: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const updated = await userRepository.update(uid, data);
    if (!updated) {
      throw new ApiError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    delete (updated as any).passwordHash;
    return updated;
  }

  async updateAvatar(uid: string, avatarUrl: string): Promise<UserProfile> {
    return this.updateProfile(uid, { avatar: avatarUrl });
  }

  async updateDocuments(uid: string, docFront: string, docBack: string, docType?: 'NID' | 'Passport'): Promise<UserProfile> {
    return this.updateProfile(uid, {
      documentFront: docFront,
      documentBack: docBack,
      ...(docType && { documentType: docType }),
    });
  }

  async getStatsAndBadges(uid: string) {
    const profile = await this.getProfile(uid);
    return {
      stats: profile.stats || { totalTrips: 0, completedTrips: 0, guideBookings: 0, savedSpots: 0 },
      badges: profile.badges || ['Explorer Beginner'],
    };
  }

  async updatePreferences(uid: string, dto: UserPreferencesDto): Promise<UserProfile> {
    return this.updateProfile(uid, {
      ...(dto.language && { language: dto.language }),
      ...(dto.theme && { theme: dto.theme }),
    });
  }
}

export const userService = new UserService();
