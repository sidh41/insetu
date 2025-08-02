import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @Input() collapsed = false;
  isMobile: boolean = false;


  navItems = [
    { link: 'dashboard', label: 'Templates', icon: 'bi-file-text-fill' },
    { link: 'prompt_library', label: 'Prompt Library', icon: 'bi-file-text-fill' },
  ];

  constructor(private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.updateScreenSize();
    window.addEventListener('resize', this.updateScreenSize.bind(this));
  }

  updateScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  Logout() {
    this.authService.logout(true);
  }

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }
}
