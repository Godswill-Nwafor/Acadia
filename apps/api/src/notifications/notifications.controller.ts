import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Post()
  create(@Body() dto: CreateNotificationDto) {
    return this.service.create(dto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get('user/:userId/unread-count')
  getUnreadCount(@Param('userId') userId: string) {
    return this.service.getUnreadCount(userId);
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string) {
    return this.service.markRead(id);
  }

  @Patch('user/:userId/mark-all-read')
  markAllRead(@Param('userId') userId: string) {
    return this.service.markAllRead(userId);
  }
}
