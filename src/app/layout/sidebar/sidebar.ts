import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit {

  public menuItems!: any[];
  @Input() offcanvasRef!: NgbOffcanvasRef;

  constructor(private router: Router,
    public auth: AuthService,
    private offcanvas: NgbOffcanvas) { }

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  closeSidebar() {
    this.offcanvas.dismiss('Navigation item selected');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.menuItems = this.auth.Navroutes?.filter(menuItem => menuItem);
      console.log("this.menuItems ==>", this.menuItems)
    }, 400);
  }

}
