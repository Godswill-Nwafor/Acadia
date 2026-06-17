import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
}

@Injectable()
export class NotificationsService {
  private notifications: Notification[] = [];
  private counter = 0;

  create(dto: CreateNotificationDto): Notification {
    const notification: Notification = {
      id: `notif_${++this.counter}`,
      userId: dto.userId,
      title: dto.title,
      message: dto.message,
      type: dto.type || 'info',
      read: false,
      createdAt: new Date(),
    };
    this.notifications.unshift(notification);
    return notification;
  }

  findByUser(userId: string): Notification[] {
    return this.notifications
      .filter((n) => n.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  markRead(id: string): Notification | undefined {
    const n = this.notifications.find((n) => n.id === id);
    if (n) n.read = true;
    return n;
  }

  markAllRead(userId: string) {
    this.notifications.forEach((n) => {
      if (n.userId === userId) n.read = true;
    });
    return { message: 'All notifications marked as read' };
  }

  getUnreadCount(userId: string) {
    return {
      count: this.notifications.filter((n) => n.userId === userId && !n.read)
        .length,
    };
  }
}
