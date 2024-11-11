/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('vapid-public-key')
  getPublicVapidKey() {
    return this.notificationsService.getPublicVapidKey();
  }

  @Post()
  async subscribe(@Body() subscription: any) {
    await this.notificationsService.addSubscription(subscription);
  }

  @Post('send-notification')
  async sendNotification(@Body() notification: { title: string; body: string }) {
    console.log('hey')
    await this.notificationsService.sendNotification(notification.title, notification.body);
  }
}