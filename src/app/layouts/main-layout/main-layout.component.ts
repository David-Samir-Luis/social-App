import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { OpenImageFullScreenComponent } from "./components/open-image-full-screen/open-image-full-screen.component";

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavbarComponent, OpenImageFullScreenComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {

}
