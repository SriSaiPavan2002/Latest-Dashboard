import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  newCategory: string = '';
  isEditing: boolean = false;
  editCategoryId: number | null = null;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  addCategory() {
    if (this.newCategory.trim()) {
      this.categoriesService.addCategory({ name: this.newCategory }).subscribe(() => {
        this.newCategory = '';
        this.loadCategories();
      });
    }
  }

  editCategory(id: number) {
    this.isEditing = true;
    this.editCategoryId = id;
  }

  updateCategory(id: number, name: string) {
    this.categoriesService.updateCategory(id, { name }).subscribe(() => {
      this.isEditing = false;
      this.editCategoryId = null;
      this.loadCategories();
    });
  }

  deleteCategory(id: number) {
    this.categoriesService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }
}
