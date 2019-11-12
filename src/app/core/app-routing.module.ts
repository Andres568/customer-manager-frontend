import { NgModule, LOCALE_ID } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { SignInComponent } from '../pages/login/sign-in/sign-in.component';
import { CustomersComponent } from '../pages/customers/customers/customers.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { CustomersService } from '../_services/customers.service';
import { VisitsComponent } from '../pages/visits/visits/visits.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'customers', component: CustomersComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ROLE_USER'] }},
  {path: 'customer/:id/visits', component: VisitsComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ROLE_USER'] }},
  {path: '', component: HomeComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    CustomersService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
