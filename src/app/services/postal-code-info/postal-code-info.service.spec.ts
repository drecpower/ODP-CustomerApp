import { TestBed } from '@angular/core/testing';

import { PostalCodeInfoService } from './postal-code-info.service';

describe('PostalCodeInfoService', () => {
  let service: PostalCodeInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostalCodeInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
