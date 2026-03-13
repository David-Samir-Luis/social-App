import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLikesComponent } from './show-likes.component';

describe('ShowLikesComponent', () => {
  let component: ShowLikesComponent;
  let fixture: ComponentFixture<ShowLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowLikesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
