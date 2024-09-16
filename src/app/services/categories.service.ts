import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {tap,catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = 'http://localhost:3000/categories';
  private categoriesSubject = new BehaviorSubject<any[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchCategories();
  }

  private fetchCategories() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.categoriesSubject.next(data);
    });
  }

  getCategories(): Observable<any[]> {
    return this.categories$;
  }

  addCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, category).pipe(
      tap(() => this.fetchCategories())
    );
  }

  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, category).pipe(
      tap(() => this.fetchCategories())
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.fetchCategories())
    );
  }
}
