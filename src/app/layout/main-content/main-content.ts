import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Header } from "../header/header";
import { Sidebar } from "../sidebar/sidebar";
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-main-content',
  imports: [Header, Sidebar, RouterOutlet],
  standalone: true,
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss'
})
export class MainContent {
  isSidebarShrinked = false;

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  toggleSidebar() {
    const container = this.elRef.nativeElement.querySelector('.dashboard-container');
    const sidebar = this.elRef.nativeElement.querySelector('.sidebar');

    this.isSidebarShrinked = !this.isSidebarShrinked;

    if (this.isSidebarShrinked) {
      this.renderer.addClass(container, 'sidebar-shrink');
      this.renderer.addClass(sidebar, 'sidebar-xs');
    } else {
      this.renderer.removeClass(container, 'sidebar-shrink');
      this.renderer.removeClass(sidebar, 'sidebar-xs');
    }
  }
}
