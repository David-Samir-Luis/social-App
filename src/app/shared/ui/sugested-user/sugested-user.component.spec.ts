import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugestedUserComponent } from './sugested-user.component';

describe('SugestedUserComponent', () => {
  let component: SugestedUserComponent;
  let fixture: ComponentFixture<SugestedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SugestedUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SugestedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
