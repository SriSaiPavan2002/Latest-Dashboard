import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  tasks = [
    { subject: 'Generate a quote.', company: 'ACME', priority: 'normal', startDate: new Date('2020-10-04'), dueDate: new Date('2020-10-14'), owner: 'Amelia Harper', status: 'completed', selected: false },
    // ... other tasks
  ];

  sortedBy: string = '';
  searchQuery: string = '';
  filteredTasks: any[] = [...this.tasks];
  isAddTaskModalOpen = false;
  isEditTaskModalOpen = false;
  newTask = {
    subject: '',
    company: '',
    priority: 'normal',
    startDate: '',
    dueDate: '',
    owner: '',
    status: 'open',
    selected: false
  };
  taskToEdit: any = null;

  constructor() {}

  ngOnInit(): void {
    this.filterTasks();
  }

  openAddTaskModal(): void {
    this.isAddTaskModalOpen = true;
  }

  closeAddTaskModal(): void {
    this.isAddTaskModalOpen = false;
  }

  onSubmit(): void {
    if (this.validateTask(this.newTask)) {
      const task = {
        ...this.newTask,
        startDate: new Date(this.newTask.startDate),
        dueDate: new Date(this.newTask.dueDate)
      };
      this.tasks.push(task);
      this.filterTasks();
      this.resetForm();
      this.closeAddTaskModal();
    }
  }

  validateTask(task: any): boolean {
    return task.subject && task.company && task.startDate && task.dueDate && task.owner && new Date(task.startDate) <= new Date(task.dueDate);
  }

  resetForm(): void {
    this.newTask = {
      subject: '',
      company: '',
      priority: 'normal',
      startDate: '',
      dueDate: '',
      owner: '',
      status: 'open',
      selected: false
    };
  }

  openEditTaskModal(task: any): void {
    if (!task) {
      console.error('Task to edit is null or undefined:', task);
    }
    this.taskToEdit = { ...task }; // Clone the task for editing
    this.isEditTaskModalOpen = true; // Open the edit modal
  }

  closeEditTaskModal(): void {
    this.isEditTaskModalOpen = false;
    this.taskToEdit = null;
  }

  saveEditedTask(): void {
    if (this.taskToEdit && this.validateTask(this.taskToEdit)) {
      const index = this.tasks.findIndex(task => task.subject === this.taskToEdit.subject && task.company === this.taskToEdit.company);
      if (index !== -1) {
        this.tasks[index] = { ...this.taskToEdit };
        this.filterTasks();
        this.closeEditTaskModal();
      }
    }
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value.toLowerCase();
    this.filterTasks();
  }

  onSort(field: string): void {
    if (this.sortedBy === field) {
      this.filteredTasks.reverse();
    } else {
      this.filteredTasks.sort((a, b) => {
        if (field === 'startDate' || field === 'dueDate') {
          return new Date(a[field]).getTime() - new Date(b[field]).getTime();
        } else {
          return a[field].localeCompare(b[field]);
        }
      });
      this.sortedBy = field;
    }
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task =>
      task.subject.toLowerCase().includes(this.searchQuery) ||
      task.company.toLowerCase().includes(this.searchQuery)
    );
  }
}
