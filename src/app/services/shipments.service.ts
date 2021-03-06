import { Injectable } from '@angular/core';
import { Shipment } from '../models/shipment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShipmentsService {

  constructor(private http:HttpClient) { }

  public getList(store_id:number = 1):Observable<Shipment[]>{
    return this.http.get<Shipment[]>(environment.baseUrl+"shipments?store_id=" + store_id);
  }
  
  public get(id:number):Observable<Shipment>{
    return this.http.get<Shipment>(environment.baseUrl+"shipment?id="+id);
  }

  public add(shipment:Shipment){
    return this.http.post(environment.baseUrl+"shipment/create",shipment);
  }

  public edit(shipment:Shipment){
    return this.http.post(environment.baseUrl+"shipment/update?id="+shipment.id,shipment);
  }

  public changeStatus(id:number,status:number){
    return this.http.post(environment.baseUrl+"shipment/status?id="+id,{status:status});
  }

  public delete(shipment:Shipment){
    return this.http.delete(environment.baseUrl+"shipment/delete?id="+shipment.id,{
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json'),
      observe: 'response'
    });
  }
}
