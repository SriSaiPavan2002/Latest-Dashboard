import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface Task {
  title: string;
  description: string;
  dueDate: Date | null;
  priority: 'Low' | 'Medium' | 'High';
  category: 'Work' | 'Personal' | 'Other';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  columns: { name: string; tasks: Task[] }[] = [
    { name: 'To Do', tasks: [] },
    { name: 'In Progress', tasks: [] },
    { name: 'Done', tasks: [] }
  ];

  taskToEdit: Task | null = null;
  taskForm: Task = {
    title: '',
    description: '',
    dueDate: null,
    priority: 'Low',  // Default priority
    category: 'Work'  // Default category
  };

  connectedDropLists: string[] = [];

  @ViewChild('taskDialog') taskDialog!: TemplateRef<any>;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // Connect all drop lists based on their indices
    this.connectedDropLists = this.columns.map((_, index) => `task-list-${index}`);
  }

  openTaskDialog(column: any): void {
    this.taskToEdit = null;
    this.taskForm = { title: '', description: '', dueDate: null, priority: 'Low', category: 'Work' };
    this.dialog.open(this.taskDialog, {
      width: '300px',
      data: { column }
    }).afterClosed().subscribe(result => {
      if (result) {
        column.tasks.push(result);
      }
    });
  }

  editTask(task: Task, column: any): void {
    this.taskToEdit = task;
    this.taskForm = { ...task };
    this.dialog.open(this.taskDialog, {
      width: '300px'
    }).afterClosed().subscribe(result => {
      if (result) {
        const index = column.tasks.indexOf(task);
        if (index > -1) {
          column.tasks[index] = result;
        }
      }
    });
  }

  deleteTask(task: Task, column: any): void {
    const index = column.tasks.indexOf(task);
    if (index > -1) {
      column.tasks.splice(index, 1);
    }
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  // Drag-and-Drop logic
  drop(event: CdkDragDrop<Task[]>, columnIndex: number): void {
    if (event.previousContainer === event.container) {
      // Move item within the same column
      moveItemInArray(this.columns[columnIndex].tasks, event.previousIndex, event.currentIndex);
    } else {
      // Transfer item between columns
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
