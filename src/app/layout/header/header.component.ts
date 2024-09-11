import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SidebarService } from '../../services/sidebar.service';
import { NotificationDialogComponent } from '../../notification-dialog/notification-dialog.component';
import { NotificationService } from '../../services/notification.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor(
    private sidebarService: SidebarService,
    private dialog: MatDialog,
    private notificationService: NotificationService  // Inject NotificationService
  ) {}

  // Toggle sidebar method
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  // Method to open notifications dialog
  openNotifications() {
    // Open the dialog and fetch notifications from the service
    this.dialog.open(NotificationDialogComponent, {
      data: this.notificationService.getNotifications(),  // Fetch notifications from the service
      width: '300px',  // Adjust dialog width if necessary
    });
  }
}
