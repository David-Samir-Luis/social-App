import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsAreaComponent } from './posts-area.component';

describe('PostsAreaComponent', () => {
  let component: PostsAreaComponent;
  let fixture: ComponentFixture<PostsAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
