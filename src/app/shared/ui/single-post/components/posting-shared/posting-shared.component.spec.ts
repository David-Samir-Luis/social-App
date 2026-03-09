import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingSharedComponent } from './posting-shared.component';

describe('PostingSharedComponent', () => {
  let component: PostingSharedComponent;
  let fixture: ComponentFixture<PostingSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostingSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostingSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
