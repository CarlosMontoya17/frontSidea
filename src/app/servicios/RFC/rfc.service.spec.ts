import { TestBed } from '@angular/core/testing';

import { RfcService } from './rfc.service';

describe('RfcService', () => {
  let service: RfcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RfcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
