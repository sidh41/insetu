import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {

  strengthLinks = [
    { path: '/home/strength/jaguarseriespremium', title: 'Jaguar Series Premium' },
    { path: '/home/strength/jaguarseriesinfinity', title: 'Jaguar Series Infinity' },
    { path: '/home/home/strength/jaguarseriesprime', title: 'Jaguar Series Prime' },
    { path: '/home/strength/loadedfreeweight', title: 'Loaded Free Weight' },
  ];

  productLinks = [
    { path: '/home/benches', title: 'Benches & Rack' },
    { path: '/home/dumbell', title: 'Dumbbells & Plate Bars' },
    { path: '/home/multigym', title: 'Multi gym' },
    { path: '/home/matt', title: 'Matt' },
    { path: '/home/accessories', title: 'Accessories' },
  ];

}
