export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'booking' | 'trip' | 'guide' | 'complaint' | 'system';
  read: boolean;
  createdAt: string;
}

export class NotificationService {
  private notifications: AppNotification[] = [];

  async sendNotification(userId: string, title: string, body: string, type: AppNotification['type']): Promise<AppNotification> {
    const notification: AppNotification = {
      id: 'notif_' + Math.random().toString(36).substring(2, 9),
      userId,
      title,
      body,
      type,
      read: false,
      createdAt: new Date().toISOString(),
    };
    this.notifications.push(notification);
    console.log(`[NotificationTriggered] User: ${userId} | ${title}: ${body}`);
    return notification;
  }

  async getUserNotifications(userId: string): Promise<AppNotification[]> {
    return this.notifications
      .filter((n) => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async markAsRead(notificationId: string, userId: string): Promise<boolean> {
    const found = this.notifications.find((n) => n.id === notificationId && n.userId === userId);
    if (found) {
      found.read = true;
      return true;
    }
    return false;
  }
}

export const notificationService = new NotificationService();
