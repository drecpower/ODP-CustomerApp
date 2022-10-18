import { TestBed } from '@angular/core/testing';

import { PizzaFactoryService } from './pizza-factory.service';

describe('PizzaFactoryService', () => {
  let service: PizzaFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
