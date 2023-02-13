import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { ROTimetrackings } from '../models/ROTimetrackings';
import { Timetrackings } from '../models/timetrackings';


@Injectable({
  providedIn: 'root',
})
export class TimetrackingApiService {
  constructor(
    private http: HttpClient,
    public keycloakService: KeycloakService
  ) {}

  getAllTimetrackings(date: string): Observable<ROTimetrackings> {
    const headers = new HttpHeaders();
    this.keycloakService.addTokenToHeader(headers);
    return this.http.get<ROTimetrackings>(
      'http://localhost:8081/time/' + date,
      {
        headers: headers,
      }
    );
  }

  saveAndUpdate(
    timetrackings: Array<Timetrackings>
  ): Observable<Array<Timetrackings>> {
    const headers = new HttpHeaders();
    this.keycloakService.addTokenToHeader(headers);
    return this.http.post<Array<Timetrackings>>(
      'http://localhost:8081/time/save',
      timetrackings,
      {
        headers: headers,
      }
    );
  }

  delete(id: number): Observable<any> {
    console.log(id);
    const idString = id.toString();
    const headers = new HttpHeaders();
    this.keycloakService.addTokenToHeader(headers);
    return this.http.delete<any>('http://localhost:8081/time/' + idString, {
      headers: headers,
    });
  }
}
