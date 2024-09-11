import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  notifications: Array<{ message: string, date: Date }> = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // Fetch notifications on component initialization
    this.notificationService.getNotifications().subscribe(
      notifications => {
        // Map notifications to include a date field
        this.notifications = notifications.map(notification => ({
          ...notification,
          date: new Date() // You might want to use actual dates if available
        }));
      },
      error => {
        console.error('Error fetching notifications:', error);
      }
    );
  }
}
