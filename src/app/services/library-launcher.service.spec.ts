import { TestBed } from '@angular/core/testing';

import { LibraryLauncherService } from './library-launcher.service';

describe('LibraryLauncherService', () => {
  let service: LibraryLauncherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryLauncherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
