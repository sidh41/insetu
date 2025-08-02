import { Route, Routes } from '@angular/router';
import { LoginComponent } from '../pages/auth/login/login.component';
import { ResetRequestPageComponent } from '../pages/auth/reset-request-page/reset-request-page.component';
import { VerifyOtpComponent } from '../pages/auth/verify-otp/verify-otp.component';
import { ResetPasswordPageComponent } from '../pages/auth/reset-password-page/reset-password-page.component';
import { NewPasswordPageComponent } from '../pages/auth/new-password-page/new-password-page.component';


export const Auth_Routes: Route[] = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'reset-password', component: ResetPasswordPageComponent, },
      { path: 'new-password', component: NewPasswordPageComponent, },
      { path: 'reset-request', component: ResetRequestPageComponent, },
      { path: 'veryfy-otp', component: VerifyOtpComponent },
      { path: '**', redirectTo: 'login' },
    ]
  },
];