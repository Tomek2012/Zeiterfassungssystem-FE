import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public isLoggedIn = false;
  public isUserAllowed = false;

  constructor(public keycloakService: KeycloakService) {}

  ngOnInit() {
    this.isUserAuthorized();
  }

  async isUserAuthorized() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    this.isUserAllowed = this.keycloakService.isUserInRole(
      'time_administration'
    );
  }
}
