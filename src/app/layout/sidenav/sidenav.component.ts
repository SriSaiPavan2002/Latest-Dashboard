import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
 // Ensure the path is correct

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidebarComponent implements OnInit {
  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible: boolean) => {
      console.log(isVisible);
      this.isSidebarVisible = isVisible;
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar(); // Toggle sidebar state
  }

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  selectDashboard() {
    this.isDashboardSelected = true;
  }
}
