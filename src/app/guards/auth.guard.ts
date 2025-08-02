import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private service: AuthService, private route: Router) { }

  canActivate() {
    console.log("Will activate auth guard")
    if (this.service.authenticated$.value.auth) {
      return true;
    } else {
      this.route.navigate(['/auth'])
      return false;
    }
  }
}