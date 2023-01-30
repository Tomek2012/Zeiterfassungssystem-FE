import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakGuard } from './keycloak.guard';
import { HomeComponent } from './pages/home/home.component';
import { TimetrackingComponent } from './pages/timetracking/timetracking.component';
import { WorkpackageComponent } from './pages/workpackage/workpackage.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'timetracking',
    component: TimetrackingComponent,
    canActivate: [KeycloakGuard],
  },
  {
    path: 'workpackage',
    component: WorkpackageComponent,
    canActivate: [KeycloakGuard],
    data: { roles: ['time_administration'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
