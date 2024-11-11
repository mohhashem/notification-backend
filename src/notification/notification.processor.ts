/* eslint-disable prettier/prettier */

import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('notifications')
export class NotificationProcessor {
  @Process('sendNotification')
  async handleSendNotification(job: Job) {
    const { title, body } = job.data;
    // Logic to send push notification to the client
  }
}
