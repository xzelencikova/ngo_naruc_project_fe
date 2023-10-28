import { TestBed } from '@angular/core/testing';

import { SpinnerOverlayService } from './spinner-overlay.service';

describe('SpinnerOverlayServiceService', () => {
  let service: SpinnerOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
