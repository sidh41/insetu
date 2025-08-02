import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutologinGuard } from './guards/autologin.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'auth', loadChildren: () => import('./routes/normalroutes').then(mod => mod.Auth_Routes),
        // canActivate: [AutologinGuard]
    },
    {
        path: '', loadChildren: () => import('./routes/membersroutes').then(mod => mod.Member_Routes),
        canActivate: [AuthGuard]
    },
];