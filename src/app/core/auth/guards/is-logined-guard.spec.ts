import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isLoginedGuard } from './is-logined-guard';

describe('isLoginedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isLoginedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
