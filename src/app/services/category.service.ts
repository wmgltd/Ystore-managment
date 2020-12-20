import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getList(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.baseUrl + 'categories');
  }
  public editCategories(data: any) {
    return this.http.post(environment.baseUrl + 'categories/update', data);
  }
  public validateDeleteCategory(category: number) {
    return this.http.post(environment.baseUrl + 'deleteCategory/validate', {
      category,
    });
  }
}
