/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';

@Injectable()
export class NotificationsService {
  private subscriptions: any[] = [];
  private vapidKeys: { publicKey: string; privateKey: string };

  constructor() {
    this.vapidKeys = webpush.generateVAPIDKeys();
    webpush.setVapidDetails(
      'mailto:example@yourdomain.org',
      this.vapidKeys.publicKey,
      this.vapidKeys.privateKey
    );
  }

  getPublicVapidKey() {
    return this.vapidKeys.publicKey;
  }

  addSubscription(subscription: any) {
    const exists = this.subscriptions.find(sub => sub.endpoint === subscription.endpoint);
    if (!exists) {
      this.subscriptions.push(subscription);
    }
  }

  async sendNotification(title: string, body: string) {
    const payload = JSON.stringify({ title, body });
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      try {
        await webpush.sendNotification(subscription, payload);
      } catch (error) {
        if (error.statusCode === 410 || error.statusCode === 404) {
          console.log('Subscription no longer valid: ', subscription.endpoint);
          this.subscriptions.splice(i, 1);
        } else {
          console.error('Error sending notification:', error.statusCode, error.body);
        }
      }
    }
  }
}