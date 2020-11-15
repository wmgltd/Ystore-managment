import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 * Handles the initial store creation request recived from Yaad Sarig
 */
export class StoreService {
  constructor(private http: HttpClient) {}

  public initStore(q: string) {
    return this.http.post(environment.baseUrl + 'init_store' , {q});
  }
}
