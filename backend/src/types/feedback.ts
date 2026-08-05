export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  category: 'General' | 'Bug' | 'Feature Request' | 'App Experience';
  message: string;
  images?: string[];
  createdAt: string;
}

export type ComplaintStatus = 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  bookingId?: string;
  subject: string;
  description: string;
  images?: string[];
  status: ComplaintStatus;
  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitFeedbackDto {
  category: 'General' | 'Bug' | 'Feature Request' | 'App Experience';
  message: string;
  images?: string[];
}

export interface SubmitComplaintDto {
  bookingId?: string;
  subject: string;
  description: string;
  images?: string[];
}
