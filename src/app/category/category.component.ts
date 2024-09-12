import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  tasks = [
    { subject: 'Generate a quote.', company: 'ACME', priority: 'normal', startDate: new Date('2020-10-04'), dueDate: new Date('2020-10-14'), owner: 'Amelia Harper', status: 'completed', selected: false },
    { subject: 'Obtain CEO contact info.', company: 'ACME', priority: 'high', startDate: new Date('2020-10-05'), dueDate: new Date('2020-10-15'), owner: 'Amelia Harper', status: 'completed', selected: false },
    { subject: 'Call to clarify customer requirements.', company: 'ACME', priority: 'low', startDate: new Date('2020-10-06'), dueDate: new Date('2020-10-16'), owner: 'Amelia Harper', status: 'open', selected: false },
    { subject: 'Send SWAG to customer.', company: 'Zone Toys', priority: 'normal', startDate: new Date('2020-10-07'), dueDate: new Date('2020-10-17'), owner: 'Taylor Riley', status: 'completed', selected: false },
    { subject: 'Apply discounts and generate a binding offer.', company: 'Zone Toys', priority: 'high', startDate: new Date('2020-10-08'), dueDate: new Date('2020-10-18'), owner: 'Taylor Riley', status: 'completed', selected: false },
    { subject: 'Generate a quote.', company: 'Zone Toys', priority: 'low', startDate: new Date('2020-10-09'), dueDate: new Date('2020-10-19'), owner: 'Taylor Riley', status: 'completed', selected: false },
    { subject: 'Create requested product comparison report.', company: 'ACME', priority: 'low', startDate: new Date('2020-10-04'), dueDate: new Date('2020-10-19'), owner: 'Amelia Harper', status: 'completed', selected: false },
    { subject: 'Follow up and discuss the offer.', company: 'Zone Toys', priority: 'normal', startDate: new Date('2020-10-10'), dueDate: new Date('2020-10-20'), owner: 'Taylor Riley', status: 'open', selected: false },
    { subject: 'Follow up and discuss the offer.', company: 'ACME', priority: 'normal', startDate: new Date('2020-10-05'), dueDate: new Date('2020-10-20'), owner: 'Amelia Harper', status: 'in-progress', selected: false },
    { subject: 'Call to clarify customer requirements.', company: 'Zone Toys', priority: 'high', startDate: new Date('2020-10-11'), dueDate: new Date('2020-10-21'), owner: 'Taylor Riley', status: 'open', selected: false },
    { subject: 'Ask if upgrade is required.', company: 'Zone Toys', priority: 'high', startDate: new Date('2020-10-06'), dueDate: new Date('2020-10-21'), owner: 'Taylor Riley', status: 'completed', selected: false },
    { subject: 'Send SWAG to customer.', company: 'Store of America', priority: 'low', startDate: new Date('2020-10-12'), dueDate: new Date('2020-10-22'), owner: 'Olivia Peyton', status: 'completed', selected: false },
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
    return task.subject && task.company && task.startDate && task.dueDate && task.owner;
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

  onEditTask(task: any): void {
    this.taskToEdit = { ...task }; // Clone the task for editing
    this.isEditTaskModalOpen = true; // Open the edit modal
  }

  saveEditedTask(): void {
    if (this.validateTask(this.taskToEdit)) {
      const index = this.tasks.findIndex(task => task === this.taskToEdit);
      if (index !== -1) {
        this.tasks[index] = { ...this.taskToEdit };
        this.filterTasks();
        this.closeEditTaskModal();
      }
    }
  }

  closeEditTaskModal(): void {
    this.isEditTaskModalOpen = false;
    this.taskToEdit = null;
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
