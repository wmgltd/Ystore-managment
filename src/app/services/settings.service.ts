import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Settings } from 'src/app/models/settings';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}
  // tslint:disable-next-line: variable-name
  protected _settings: Settings;
  protected clientId: number;

  public setClientId(clientId: number) {
    this.clientId = clientId;
  }

  public getClientId() {
    return this.clientId;
  }

  public get(): Observable<Settings> {
    console.log(environment.baseUrl + 'settings');
    console.log('********************');
    return this.http.get<Settings>(environment.baseUrl + 'settings');
  }

  public getSettings(refresh?: boolean): Observable<Settings> {
    if (!refresh && this._settings) {
      return of(this._settings);
    }
    return this.get();
  }

  public signUp(data: Settings) {
    return this.http.post(environment.baseUrl + 'signup', data);
  }

  public validateSubdomain(subdomain: string) {
    return this.http.post(environment.baseUrl + 'subdomain/validate', {
      subdomain,
    });
  }

  public edit(data: Settings) {
    return this.http.post(
      environment.baseUrl + 'settings/update?id=' + data.id,
      data
    );
  }

  public editExternal(data: Settings) {
    return this.http.post(
      environment.baseUrl + 'settings/update/external?id=' + data.id,
      data
    );
  }

  public editDeliveryTypes(data: any) {
    return this.http.post(
      environment.baseUrl + 'settings/update/delivery_types?id=' + data.id,
      data
    );
  }

  public uploadImage(id, data, attr: string, savedImg) {
    return this.http.post(environment.baseUrl + 'settings/upload?id=' + id, {
      attr,
      savedImg,
      data,
    });
  }
}
