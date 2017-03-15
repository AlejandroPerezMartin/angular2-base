import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from './http-client';

import { environment } from '../../environments/environment';
import { NotificationEmail } from '../_models/notification_email';

@Injectable()
export class NotificationService {

  constructor(private http: Http, private httpClient: HttpClient) {}

  /**
   * Returns the list of emails configured to receive notifications
   */
  listEmailsNotifications() {
    return this.httpClient.get('notifications/listEmailsNotifications');
  }

  /**
   * Adds a user to the list of emails to be notified
   * @param email Email to be added to receive notifications
   */
  createEmailsNotifications(email: string) {
    return this.httpClient.post('notifications/createEmailsNotifications', {'email': email});
  }

  /**
   * Deletes an email from the email notifications list
   * @param {number} id - Email ID to be deleted
   */
  deleteEmailsNotifications(id: number) {
    return this.httpClient.delete(`notifications/deleteEmailNotifications/${id}`);
  }

  /**
   * Updates an email from the email notifications list
   * @param {Object} data - Email that will get notifications
   * @param {number} data.id - Email ID
   * @param {string} data.email - Email address where notifications are received
   */
  updateEmailsNotifications(email: NotificationEmail) {
    return this.httpClient.put('notifications/updateEmailsNotifications', email);
  }

}
