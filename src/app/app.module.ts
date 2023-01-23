import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TimetrackingComponent } from './pages/timetracking/timetracking.component';

@NgModule({
  declarations: [AppComponent, TimetrackingComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AuthModule.forRoot({
      domain: 'dev-5qxndj1r1v7v2wgq.us.auth0.com',
      clientId: 'qy9vFiTzOAZOrnWc2n8jyKAsWs0KluJ8',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
