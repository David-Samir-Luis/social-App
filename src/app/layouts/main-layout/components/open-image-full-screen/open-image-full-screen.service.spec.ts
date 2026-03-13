import { TestBed } from '@angular/core/testing';

import { OpenImageFullScreenService } from './open-image-full-screen.service';

describe('OpenImageFullScreenService', () => {
  let service: OpenImageFullScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenImageFullScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
