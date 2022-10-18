import { TestBed } from '@angular/core/testing';

import { OrderStorageService } from './order-storage.service';

describe('OrderStorageService', () => {
  let service: OrderStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
