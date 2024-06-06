import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

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
        path: "",
        component: LoginComponent
    },
    {
        path: "**",
        component: LoginComponent,
        pathMatch: "full"
    }
];
