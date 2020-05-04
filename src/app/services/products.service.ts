import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  
  constructor(private http:HttpClient) { }

  public getList(store_id:number = 1):Observable<Product[]>{
    return this.http.get<Product[]>(environment.baseUrl+"products?store_id=" + store_id);
  }
  
  public get(id:number):Observable<Product>{
    return this.http.get<Product>(environment.baseUrl+"product?id="+id);
  }

  public add(product:Product){
    return this.http.post(environment.baseUrl+"product/create",product);
  }

  public edit(product:Product){
    return this.http.post(environment.baseUrl+"product/update?id="+product.id,product);
  }

  public delete(product:Product){
    return this.http.delete(environment.baseUrl+"product/delete?id="+product.id,{
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }
}
