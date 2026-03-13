import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentSectionComponent } from './create-comment-section.component';

describe('CreateCommentSectionComponent', () => {
  let component: CreateCommentSectionComponent;
  let fixture: ComponentFixture<CreateCommentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCommentSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCommentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
