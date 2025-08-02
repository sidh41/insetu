import { CommonModule, } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
// import { SideBarComponent } from '../../components/dashboard/side-bar/side-bar.component';

@Component({
  selector: 'app-offcanvas',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class OffcanvasComponent {

  constructor() {

  }
}
