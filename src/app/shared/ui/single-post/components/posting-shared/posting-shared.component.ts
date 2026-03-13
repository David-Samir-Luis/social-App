import { Component, inject, Input, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { OpenImageFullScreenService } from '../../../../../layouts/main-layout/components/open-image-full-screen/open-image-full-screen.service';

@Component({
  selector: 'app-posting-shared',
  imports: [RouterLink],
  templateUrl: './posting-shared.component.html',
  styleUrl: './posting-shared.component.css',
})
export class PostingSharedComponent {
  @Input({required:true}) sharedPost!:Ipost;
  readonly openImageFullScreenService = inject(OpenImageFullScreenService);

}
