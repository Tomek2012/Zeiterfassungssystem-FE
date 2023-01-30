import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() inputSideNav!: MatSidenav;

  public isLoggedIn = false;

  constructor(public keycloakService: KeycloakService) {}

  ngOnInit() {
    this.isUserAuthorized();
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout('http://localhost:4200/');
  }

  async isUserAuthorized() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
  }

  getUserInformation(): string {
    return this.keycloakService.getUsername();
  }
}
