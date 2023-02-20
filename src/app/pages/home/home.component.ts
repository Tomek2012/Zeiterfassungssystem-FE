import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isLoggedIn = false;

  constructor(public keycloakService: KeycloakService){}

  ngOnInit(): void {
    this.isUserAuthorized();
  }

  async isUserAuthorized() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
  }
  
  login() {
    this.keycloakService.login();
  }
}
