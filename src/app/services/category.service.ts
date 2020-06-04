import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public getList(store_id:number = 1):Observable<Category[]>{
    return this.http.get<Category[]>(environment.baseUrl+"categories?store_id=" + store_id);
  }
  public editCategories(data:any,store_id:number = 1){
    return this.http.post(environment.baseUrl+"categories/update?id="+store_id,data);
  }
}
