import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';
import { AuthGuardService } from './others/services/auth-guard-service/auth-guard.service';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    // {path: "/signin", component: SigninComponent},
    {path: "home", component: HomeComponent, canActivate: [AuthGuardService]}
];
