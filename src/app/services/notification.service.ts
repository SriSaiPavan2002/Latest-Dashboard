import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  // Initial notifications
  private initialNotifications = [
    { message: 'You have a new message' },
    { message: 'Your order has been shipped' },
    { message: 'New friend request' }
  ];

  // BehaviorSubject to manage notifications
  private notificationsSubject = new BehaviorSubject<any[]>(this.initialNotifications);
  notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  // Method to add a new notification
  addNotification(notification: any) {
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);
  }

  // Method to get all notifications as an observable
  getNotifications(): Observable<any[]> {
    return this.notifications$;
  }
}
