import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthViewComponent } from "./components/auth-view/auth-view.component";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthViewComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {

}
