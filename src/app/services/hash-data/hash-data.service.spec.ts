import { TestBed } from '@angular/core/testing';

import { HashDataService } from './hash-data.service';

describe('HashDataService', () => {
  let service: HashDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
