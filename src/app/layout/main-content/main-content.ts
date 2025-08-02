import { Component } from '@angular/core';
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

}
