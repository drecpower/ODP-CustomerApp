import { TestBed } from '@angular/core/testing';

import { AppshellService } from './appshell.service';

describe('AppshellService', () => {
  let service: AppshellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppshellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
