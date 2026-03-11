import { TestBed } from '@angular/core/testing';

import { UnreadNotificationsCountService } from './unread-notifications-count.service';

describe('UnreadNotificationsCountService', () => {
  let service: UnreadNotificationsCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnreadNotificationsCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
