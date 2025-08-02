import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutologinGuard {
  constructor(private service: AuthService, private route: Router) { }
  canActivate() {
    if (!this.service.authenticated$.value.auth) {
      return true;
    } else {
      this.route.navigate(['dashboard']);
      return false;
    }
  }



}
