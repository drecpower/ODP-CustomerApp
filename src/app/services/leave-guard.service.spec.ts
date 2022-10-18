import { TestBed } from '@angular/core/testing';

import { LeaveGuardService } from './leave-guard.service';

describe('LeaveGuardService', () => {
  let service: LeaveGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
