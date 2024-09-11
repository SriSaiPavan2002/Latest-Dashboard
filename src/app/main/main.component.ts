import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isSidebarVisible = true;
  showHeaderAndSidebar = true;

  constructor(private router: Router, private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible: boolean) => {
      this.isSidebarVisible = isVisible;
    });

    // Check the route on initialization
    this.checkRoute(this.router.url);

    // Listen for route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });
  }

  private checkRoute(url: string) {
    // Hide header and sidenav on the login page
    this.showHeaderAndSidebar = !url.includes('/login');
  }
}
