import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenImageFullScreenComponent } from './open-image-full-screen.component';

describe('OpenImageFullScreenComponent', () => {
  let component: OpenImageFullScreenComponent;
  let fixture: ComponentFixture<OpenImageFullScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenImageFullScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenImageFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
