import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  // Example data for the dashboard
  tasksDone: number = 11;
  tasksInProgress: number = 4;
  financialData: string = '$2.4k';
  coursesCompleted: number = 11;
  coursesInProgress: number = 36;
  currentDate: string = new Date().toLocaleDateString();

  statistics = {
    hoursWorked: '40',
    moneyPaid: '$2,000',
    tasksDoneToday: 5
  };

  weeklyCalendar: { [key: string]: string[] } = {
    'Sun': ['30'],
    'Mon': ['31', 'Daily Standup Call 9:00 AM'],
    'Tue': ['1'],
    'Wed': ['2'],
    'Thu': ['3'],
    'Fri': ['4', 'Brand Identity Meeting 11:00 AM'],
    'Sat': ['5']
  };

  upcomingEvents: { time: string, description: string }[] = [
    { time: '9:00 AM', description: 'Discuss team tasks for the day.' },
    { time: '11:00 AM', description: 'Discuss brand identity guidelines for the print media.' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    // Access CanvasJS from the global window object
    const CanvasJS = (window as any).CanvasJS;
    if (CanvasJS) {
      const chart = new CanvasJS.Chart("chartContainer", {
        title: {
          text: "Tasks Done"
        },
        data: [
          {
            type: "line",
            dataPoints: [
              { label: "Sep 1", y: 10 },
              { label: "Sep 2", y: 15 },
              { label: "Sep 3", y: 25 },
              { label: "Sep 4", y: 20 }
            ]
          }
        ]
      });
      chart.render();
    } else {
      console.error("CanvasJS is not loaded.");
    }
  }

  createTask(): void {
    console.log('Create Task clicked');
  }

  createNewTask(): void {
    console.log('Create a New Task clicked');
  }

  logout(): void {
    console.log('Logout clicked');
  }
}
