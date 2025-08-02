import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';

import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('insetu');

  authSub!: Subscription;
  isAuthenticated: boolean = false;



  constructor(private router: Router, private _auth: AuthService) {
  }
  ngOnInit(): void {    
    this._auth.attemptAutoLogin();
    this.subscribeToAuth();
  }

  ngOnDestroy() {
    this.isAuthenticated = false;
    this.authSub.unsubscribe();
  }

  subscribeToAuth() {
    this.authSub = this._auth.authenticated$.subscribe((authValue: any) => {
      this.isAuthenticated = authValue.auth;
    });
  }
}
