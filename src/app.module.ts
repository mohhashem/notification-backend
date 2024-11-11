/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationController } from './notification/notification.controller';
import { NotificationsService } from './notification/notification.service';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [NotificationsService],
})
export class AppModule {}
