import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Example data for the dashboard
  tasksDone: number = 11;
  tasksInProgress: number = 4;
  financialData: string = '$2.4k';
  coursesCompleted: number = 11;
  coursesInProgress: number = 36;
  
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
    // Initialization logic here
  }

  createTask(): void {
    // Logic to open the task creation dialog or page
    console.log('Create Task clicked');
  }

  createNewTask(): void {
    // Logic to open a different task creation dialog or page
    console.log('Create a New Task clicked');
  }

  logout(): void {
    // Logic to handle user logout
    console.log('Logout clicked');
  }
}
