import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TradesComponent } from './pages/trades/trades.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: "auth",
        children: [
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "register",
                component: RegisterComponent
            }
        ]
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "trades",
        component: TradesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "**",
        component: LoginComponent,
        pathMatch: "full"
    }
];
