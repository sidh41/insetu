import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CookieInterface, UserInterface, LoginInterface, SessionInterface, SignupInterface, RouteInfo } from '../interfaces/interfaces';
import { PermissionEnum } from '../interfaces/enums';
// import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';


export const ROUTES: RouteInfo[] = [];

let apiurl = environment.apiurl;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  Navroutes!: RouteInfo[];
  user_data: any
  public user: UserInterface | null = null;
  public permission: PermissionEnum = PermissionEnum.USER;

  private userSession: SessionInterface | null = null;
  private accessToken: string | null = null;
  authenticated$ = new BehaviorSubject<{ auth: boolean; admin: boolean; role: PermissionEnum | null }>({ auth: false, admin: false, role: null });
  constructor(private http: HttpClient,
    // private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _router: Router
  ) {
  }

  IsLoggedIn() {
    return this.authenticated$.value.auth
  }

  getUserRole() {
    return this.authenticated$.value.role
  }

  GetToken(): any {
    return localStorage.getItem('revausertoken') || '';
  }

  HaveAccess() {
    if (this.isSuperAdmin) {
      return true
    } else {
      return false
    }
  }

  get isSuperAdmin(): boolean {
    return this.permission === PermissionEnum.SUPERADMIN
  }

  get isAdmin(): boolean {
    return this.permission === PermissionEnum.ADMIN
  }

  get isUser(): boolean {
    return this.permission === PermissionEnum.USER
  }

  get session() { return this.userSession; }

  get access_token() { return this.accessToken; }

  ProceedLogin(loginAttempt: any): Promise<SessionInterface> {
    const url = `${apiurl}auth/login`;
    return new Promise((resolve, reject) => {
      this.http.post(url, loginAttempt).subscribe({
        next: (res: any) => {
          if (res.status) {
            this.setupSession(res)
          }
          resolve(res);
        }, error: (error) => {
          console.log(error.status)
          if (error.status != 200) {
            console.log("AAYA ", error.error.message)
            // this.toastr.error(error.error.message, error.error.title);
          }
          console.log("In Chatconnect provider : Error", error);
          reject(error);
        }
      })
    });
  }

  Proceedsignup(signupAttempt: any): Promise<SessionInterface> {
    const url = `${apiurl}auth/register`;
    return new Promise((resolve, reject) => {
      this.http.post(url, signupAttempt).subscribe({
        next: (res: any) => {
          if (res.status) {
            this.setupSession(res.data)
            resolve(res.data);
          }
        }, error: (error) => {
          reject(error);
          if (error.status != 200) {
            // this.toastr.error(error.error.message, error.error.title);
          }
          console.log("In Chatconnect provider : Error", error);
        }
      })
    });
  }

  logout(navigate: boolean = true) {
    console.log("navigate ===>", navigate)
    this.userSession = null;
    this.accessToken = null;
    this.resetService();
    localStorage.clear();
    this.authenticated$.next({ auth: false, admin: false, role: null });
    if (navigate) {
      this._router.navigate(['/auth']);
    }
  }

  refreshSession(): Observable<SessionInterface> {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.access_token}`)
    };
    return this.http.post<SessionInterface>(`${apiurl}auth/refresh`, {}, header);
  }

  private setupSession(newSession: SessionInterface) {
    this.user_data = newSession.user_data
    this.userSession = newSession;
    this.accessToken = newSession.access_token;
    this.setCookie(newSession);
    this.setupUser(newSession.user);
    this.setPermission(newSession.permission);
    this.authenticated$.next({ auth: true, admin: this.isSuperAdmin, role: null });
    this.SetupRoutes()
  }

  SetupRoutes() {
    if (this.getPermission() == 'super_admin') {
      // this.Navroutes = [
      //   { path: '', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
      //   { path: '/manager/excel', title: 'Campaign', icon: 'ni-archive-2 text-primary', class: '' },
      //   { path: '/manager/reset-password', title: 'Reset Password', icon: 'ni-archive-2 text-primary', class: '' },
      //   { path: '/manager/processeddata', title: 'Processed Data', icon: 'ni-archive-2 text-primary', class: '' },
      //   { path: '/manager/unprocesseddata', title: 'Unprocessed Data', icon: 'ni-archive-2 text-primary', class: '' },
      // ];

      this.Navroutes = [
        { path: '/home', title: 'Dashboard', icon: 'bi bi-grid-fill', class: '' },
        { path: '/performance', title: 'Performance', icon: 'bi bi-bar-chart-fill', class: '' },
        { path: '/organization', title: 'Create Organization', icon: 'bi bi-plus-circle', class: '' },
        { path: '/users', title: 'Create Users', icon: 'bi bi-plus-circle', class: '' },
        { path: '/campaign', title: 'Create Campaign', icon: 'bi bi-plus-circle', class: '' },
        { path: '/lead-bank', title: 'Lead Bank', icon: 'bi bi-bank2', class: '' },
        { path: '/mail-templates', title: 'Mail Templates', icon: 'bi bi-envelope-paper-fill', class: '' },
        { path: '/mailbox', title: 'Mailbox', icon: 'bi bi-envelope-fill', class: '' },
      ];

    } else if (this.getPermission() == 'admin') {
      this.Navroutes = [
        { path: '/home', title: 'Dashboard', icon: 'bi bi-grid-fill', class: '' },
        { path: '/performance', title: 'Performance', icon: 'bi bi-bar-chart-fill', class: '' },
        { path: '/campaign', title: 'Create Campaign', icon: 'bi bi-plus-circle', class: '' },
        { path: '/lead-bank', title: 'Lead Bank', icon: 'bi bi-bank2', class: '' },
        { path: '/mail-templates', title: 'Mail Templates', icon: 'bi bi-envelope-paper-fill', class: '' },
        { path: '/mailbox', title: 'Mailbox', icon: 'bi bi-envelope-fill', class: '' },
      ];
    } else if (this.getPermission() == 'user') {
      this.Navroutes = [
        { path: '/home', title: 'Dashboard', icon: 'bi bi-grid-fill', class: '' },
      ];
    }
  }

  private setCookie(data?: SessionInterface) {
    if (data) {
      const cookie: CookieInterface = {
        access_token: data.access_token ? data.access_token : undefined,
        role: data.permission ? data.permission : undefined,
      };
      localStorage.setItem('revausertoken', JSON.stringify(cookie));
    }
  }

  setupUser(acc: any) {
    this.user = acc;
    localStorage.setItem('user_data', acc);
  }

  GetUser() {
    return this.user;
  }

  setPermission(permission: PermissionEnum) {
    this.permission = permission;
  }

  getPermission() {
    return this.permission
  }

  resetService() {
    this.user = null;
  }

  findInvite(inviteId: string): Observable<any> {
    return this.http.get<any>(
      `${apiurl}auth/signup/${inviteId}`
    );
  }

  findPasswordReset(resetId: string, email: string): Observable<boolean> {
    return this.http.get<boolean>(`${apiurl}auth/verify-password-reset?token=${resetId}&email=${email}`);
  }

  requestPasswordReset(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${apiurl}auth/request-reset`, {
      email: email,
    });
  }


  submitPasswordReset(resetId: string, resetReq: { email: string; password: string; passwordConfirm: string; }): Observable<boolean> {
    return this.http.post<boolean>(
      `${apiurl}auth/password-reset`,
      resetReq
    );
  }

  // submitNewPasswordRequest(resetId: string, resetReq: { email: string; password: string; passwordConfirm: string; }): Observable<boolean> {
  //   return this.http.post<boolean>(
  //     `${apiurl}auth/new-password-request`,
  //     resetReq
  //   );
  // }

  attemptAutoLogin() {

    const sesCookie = localStorage.getItem('revausertoken');
    if (sesCookie && JSON.parse(sesCookie).access_token) {
      if (sesCookie)
        this.setupSession(JSON.parse(sesCookie))
      this.refreshSession().subscribe({
        next: (res: any) => {
          this.setupSession(res)
        }, error: (error) => {
          console.log(error)
          if (error.status != 200) {
            // this.toastr.error(error.error.message, "Session Expired");
            this.logout();
          }
        }
      });
    } else {
      this.logout(false);
    }
  }
}