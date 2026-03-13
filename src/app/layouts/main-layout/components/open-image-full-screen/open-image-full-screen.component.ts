import { Component, inject } from '@angular/core';
import { OpenImageFullScreenService } from './open-image-full-screen.service';

@Component({
  selector: 'app-open-image-full-screen',
  imports: [],
  templateUrl: './open-image-full-screen.component.html',
  styleUrl: './open-image-full-screen.component.css',
})
export class OpenImageFullScreenComponent {
  readonly openImageFullScreenService=inject(OpenImageFullScreenService)
}
