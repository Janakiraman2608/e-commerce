import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrlCategory = environment.apiURL+'category/'
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrlCategory);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrlCategory}${categoryId}`);
  }

  createCategory(category: Category) {
    return this.http.post(this.apiUrlCategory, category);
  }

  updateCategory(category: Category) {
    return this.http.put(`${this.apiUrlCategory}${category.id}`, category);
  }
  deleteCategory(categoryId: string) {
    return this.http.delete(
      `${this.apiUrlCategory}${categoryId}`
    );
  }
}
