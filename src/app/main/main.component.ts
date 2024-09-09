import { Component } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  isSidebarVisible = true;
  constructor(private sidebarService: SidebarService) {}


  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible: boolean) => {
      console.log(isVisible)
      this.isSidebarVisible = isVisible;
    });
  }


}
