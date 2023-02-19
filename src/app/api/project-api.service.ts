import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectApiService {
  constructor(
    private http: HttpClient,
    public keycloakService: KeycloakService
  ) {}

  getAllTimetrackings(): Observable<Project[]> {
    const headers = new HttpHeaders();
    this.keycloakService.addTokenToHeader(headers);
    return this.http.get<Project[]>('http://localhost:8081/project/', {
      headers: headers,
    });
  }

  save(project: Project): Observable<any> {
    const headers = new HttpHeaders();
    this.keycloakService.addTokenToHeader(headers);
    return this.http.post<Project>('http://localhost:8081/project/save', project, {
      headers: headers,
    });
  }

  delete(id: number): Observable<any> {
    const idString = id.toString();
    const headers = new HttpHeaders();
    this.keycloakService.addTokenToHeader(headers);
    return this.http.delete<any>('http://localhost:8081/project/' + idString, {
      headers: headers,
    });
  }
}
