import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { Timetrackings } from '../models/timetrackings';

@Injectable({
  providedIn: 'root',
})
export class TimetrackingApiService {
  constructor(
    private http: HttpClient,
    public keycloakService: KeycloakService
  ) {}

  getAllTimetrackings(): Observable<Array<Timetrackings>> {
    const headers = new HttpHeaders();
    this.keycloakService.addTokenToHeader(headers);
    return this.http.get<Array<Timetrackings>>(
      'http://localhost:8081/time/11-20-2020',
      {
        headers: headers,
      }
    );
  }
}
