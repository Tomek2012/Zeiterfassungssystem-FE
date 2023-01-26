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

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    // this.isUserAuthorized();
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout('http://localhost:4200/home');
  }

  // TODO: Wie?
  // async isUserAuthorized(): Promise<boolean> {
  //   this.keycloakService.isLoggedIn().then((value) => {
  //     //this return will `return` value in chained manner
  //     return value ? true : false;
  //   });
  // }
}
