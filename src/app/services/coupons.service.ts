import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private http:HttpClient) { }

  public getList(store_id:number = 1):Observable<Coupon[]>{
    return this.http.get<Coupon[]>(environment.baseUrl+"coupons?store_id=" + store_id);
  }
  
  public get(id:number):Observable<Coupon>{
    return this.http.get<Coupon>(environment.baseUrl+"coupon?id="+id);
  }

  public add(coupon:Coupon){
    return this.http.post(environment.baseUrl+"coupon/create",coupon);
  }
  public changeStatus(id:number,status:number){
    return this.http.post(environment.baseUrl+"coupon/status?id="+id,{status:status});
  }

  public edit(coupon:Coupon){
    return this.http.post(environment.baseUrl+"coupon/update?id="+coupon.id,coupon);
  }

  public delete(id:number){
    return this.http.delete(environment.baseUrl+"coupon/delete?id="+id,{
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }
}
