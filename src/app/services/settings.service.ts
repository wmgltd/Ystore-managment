import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Settings } from 'src/app/models/settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  
  constructor(private http:HttpClient) { }
  
  public get(id:number):Observable<Settings>{
    return this.http.get<Settings>(environment.baseUrl+"settings?id="+id);
  }

  // public add(product:Product){
  //   return this.http.post(environment.baseUrl+"product/create",product);
  // }

  public edit(settings:Settings){
    return this.http.post(environment.baseUrl+"settings/update?id="+settings.id,settings);
  }

}
