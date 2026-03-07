import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFriendsInputComponent } from './search-friends-input.component';

describe('SearchFriendsInputComponent', () => {
  let component: SearchFriendsInputComponent;
  let fixture: ComponentFixture<SearchFriendsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFriendsInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFriendsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
