import { MESSAGES } from '../constants/messages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { bookingRepository } from '../repositories/bookingRepository';
import { feedbackRepository } from '../repositories/feedbackRepository';
import { userRepository } from '../repositories/userRepository';
import { Complaint, ComplaintStatus, Feedback, SubmitComplaintDto, SubmitFeedbackDto } from '../types/feedback';
import { ApiError } from '../utils/apiError';

export class FeedbackService {
  async submitFeedback(userId: string, dto: SubmitFeedbackDto): Promise<Feedback> {
    const user = await userRepository.findById(userId);
    const userName = user ? user.name : 'Anonymous Tourist';
    const userEmail = user ? user.email : 'user@example.com';

    return feedbackRepository.saveFeedback({
      userId,
      userName,
      userEmail,
      category: dto.category,
      message: dto.message,
      images: dto.images || [],
    });
  }

  async submitComplaint(userId: string, dto: SubmitComplaintDto): Promise<Complaint> {
    const user = await userRepository.findById(userId);
    const userName = user ? user.name : 'Tourist';
    const userEmail = user ? user.email : 'user@example.com';

    const complaint = await feedbackRepository.saveComplaint({
      userId,
      userName,
      userEmail,
      bookingId: dto.bookingId,
      subject: dto.subject,
      description: dto.description,
      images: dto.images || [],
      status: 'Pending',
    });

    // Also store complaint as a booking record if bookingId is associated
    await bookingRepository.create({
      userId,
      type: 'complaint',
      title: `Complaint: ${dto.subject}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      cost: 0,
      details: dto.description,
      complaintMeta: {
        complaintId: complaint.id,
        subject: dto.subject,
        status: 'Pending',
      },
    });

    return complaint;
  }

  async getUserComplaints(userId: string): Promise<Complaint[]> {
    return feedbackRepository.findComplaintsByUserId(userId);
  }

  async getComplaintById(id: string, userId: string): Promise<Complaint> {
    const complaint = await feedbackRepository.findComplaintById(id);
    if (!complaint) {
      throw new ApiError('Complaint not found.', HTTP_STATUS.NOT_FOUND);
    }
    if (complaint.userId !== userId) {
      throw new ApiError('Unauthorized to view this complaint.', HTTP_STATUS.FORBIDDEN);
    }
    return complaint;
  }

  async updateComplaintStatus(id: string, status: ComplaintStatus, adminResponse?: string): Promise<Complaint> {
    const updated = await feedbackRepository.updateComplaintStatus(id, status, adminResponse);
    if (!updated) {
      throw new ApiError('Complaint not found.', HTTP_STATUS.NOT_FOUND);
    }
    return updated;
  }
}

export const feedbackService = new FeedbackService();
