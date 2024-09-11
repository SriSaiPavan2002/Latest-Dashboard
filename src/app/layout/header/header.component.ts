import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';  // Import MatDialog
import { SidebarService } from '../../services/sidebar.service';
import { NotificationDialogComponent } from '../../notification-dialog/notification-dialog.component'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  // Sample list of unseen notifications (can be fetched from a service)
  unseenNotifications = [
    { message: 'You have a new message' },
    { message: 'Your order has been shipped' },
    { message: 'New friend request' },
  ];

  constructor(private sidebarService: SidebarService, private dialog: MatDialog) {}

  // Toggle sidebar method
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  // Method to open notifications dialog
  openNotifications() {
    this.dialog.open(NotificationDialogComponent, {
      data: this.unseenNotifications,  // Passing unseen notifications to dialog
      width: '300px',  // Adjust dialog width if necessary
    });
  }
}
