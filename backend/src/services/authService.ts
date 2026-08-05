import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { MESSAGES } from '../constants/messages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { userRepository } from '../repositories/userRepository';
import { UserLoginDto, UserProfile, UserRegistrationDto } from '../types/user';
import { ApiError } from '../utils/apiError';
import { generateToken } from '../utils/jwt';

export class AuthService {
  async register(dto: UserRegistrationDto): Promise<{ user: UserProfile; token: string }> {
    const existingUser = await userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ApiError(MESSAGES.AUTH.EMAIL_EXISTS, HTTP_STATUS.CONFLICT);
    }

    const uid = 'usr_' + uuidv4().substring(0, 8);
    const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthsBn = ['জানুয়ারী', 'ফেব্রুয়ারী', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
    const today = new Date();
    const isBn = dto.language === 'bn';
    const memberSince = isBn
      ? `${monthsBn[today.getMonth()]} ${today.getFullYear().toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d)])}`
      : `${monthsEn[today.getMonth()]} ${today.getFullYear()}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const newProfile: UserProfile & { passwordHash?: string } = {
      uid,
      name: dto.name,
      email: dto.email.trim().toLowerCase(),
      contactNumber: dto.contactNumber,
      gender: dto.gender,
      documentType: dto.documentType,
      documentFront: dto.documentFront,
      documentBack: dto.documentBack,
      memberSince,
      language: dto.language || 'en',
      theme: 'light',
      badges: ['Explorer Beginner'],
      stats: {
        totalTrips: 0,
        completedTrips: 0,
        guideBookings: 0,
        savedSpots: 0,
      },
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = await userRepository.save(newProfile as UserProfile);
    delete (saved as any).passwordHash;

    const token = generateToken({ uid: saved.uid, email: saved.email });
    return { user: saved, token };
  }

  async login(dto: UserLoginDto): Promise<{ user: UserProfile; token: string }> {
    const user = await userRepository.findByEmail(dto.email);
    if (!user) {
      throw new ApiError(MESSAGES.AUTH.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
    }

    const passwordHash = (user as any).passwordHash;
    if (passwordHash) {
      const isMatch = await bcrypt.compare(dto.password, passwordHash);
      if (!isMatch) {
        throw new ApiError(MESSAGES.AUTH.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
      }
    }

    delete (user as any).passwordHash;
    const token = generateToken({ uid: user.uid, email: user.email });
    return { user, token };
  }

  async validateSession(uid: string): Promise<UserProfile> {
    const user = await userRepository.findById(uid);
    if (!user) {
      throw new ApiError(MESSAGES.USER.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    delete (user as any).passwordHash;
    return user;
  }
}

export const authService = new AuthService();
