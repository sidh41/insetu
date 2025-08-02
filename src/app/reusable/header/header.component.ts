import { CommonModule, } from '@angular/common';
import { Component, ViewEncapsulation, HostListener, ElementRef, Renderer2, TemplateRef, inject, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbAccordionModule, NgbCollapseModule, NgbOffcanvas, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { UtilService } from '../../services/util.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from '../../components/dashboard/side-bar/side-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgbCollapseModule, RouterLink, SideBarComponent, FormsModule, ReactiveFormsModule, NgbAccordionModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  public isCollapsed = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  showSubmenu: boolean = false;

  toggleNavbarCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleSubmenu() {
    this.showSubmenu = !this.showSubmenu;
  }
  private offcanvasService = inject(NgbOffcanvas);
  server_error_message = [];
  modalRef?: NgbModalRef;
  input_type: string = '';
  Authform!: FormGroup;
  is_login: boolean = false;
  is_server_validation_error: boolean = false;



  menu(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end', scroll: false, panelClass: 'custom_menu' });
  }

  otherLinks = [
    { path: '/home/about', title: 'Home' },
    { path: '/home/gymgallery', title: 'Accounts' },
    { path: '/home/ecatalogue', title: 'My Profile' },
    { path: '/home/enquiry', title: 'Refer a Friend' },
    { path: '/home/contact', title: 'Help' },
  ];

  constructor(private el: ElementRef,
    public authService: AuthService,
    public util: UtilService,
    public formBuilder: FormBuilder,
    public modalService: NgbModal,
    public router: Router,
    public dataservice: DataService,
    private renderer: Renderer2) { }

  // @HostListener('window:scroll', [])

  // onWindowScroll(): void {
  //   const navbarElement = this.el.nativeElement.querySelector('.navbar');
  //   const containerElement = this.el.nativeElement.querySelector('.navbar .container');
  //   if (window.scrollY > 80) {
  //     this.renderer.addClass(navbarElement, 'fixed-top');
  //     this.renderer.addClass(navbarElement, 'bg-dark');
  //     this.renderer.addClass(navbarElement, 'shadow');
  //   } else {
  //     this.renderer.removeClass(navbarElement, 'fixed-top');
  //     this.renderer.removeClass(navbarElement, 'bg-white');
  //     this.renderer.removeClass(navbarElement, 'shadow');
  //   }
  // }

  open(content: any, isparams: string) {
    console.log(isparams)
    this.is_login = isparams == 'login' ? true : false
  }

  GoDashboard() {
    this.router.navigate(['/members/memberhome'])
  }

  GoReset() {
    this.router.navigate(['/home/reset-request'])
  }


  logoutUser() {
    this.authService.logout();
  }


  onToggleClick() {
    this.toggleSidebar.emit();
  }

}
