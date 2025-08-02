import { Component } from '@angular/core';
import { NgbDropdownModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Sidebar } from "../sidebar/sidebar";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
  imports: [Sidebar, NgbDropdownModule, RouterModule]
})
export class Header {
  constructor(private offcanvasService: NgbOffcanvas,
    private authService: AuthService,
  ) { }

  openSidebar(content: any) {
    this.offcanvasService.open(content, { position: 'start' });
  }

  LogoutUser() {
    this.authService.logout(true);
  }

}
