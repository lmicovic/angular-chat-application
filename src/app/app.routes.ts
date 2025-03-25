import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';
import { AuthGuardService } from './others/services/auth-guard-service/auth-guard.service';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    // {path: "home", component: HomeComponent, canActivate: [AuthGuardService]},
    {path: "home", component: HomeComponent},    // delete only for testing
    {path: "settings", component: UserSettingsComponent}
];
