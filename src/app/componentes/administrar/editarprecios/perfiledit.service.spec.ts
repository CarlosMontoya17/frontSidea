import { TestBed } from '@angular/core/testing';

import { PerfileditService } from './perfiledit.service';

describe('PerfileditService', () => {
  let service: PerfileditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfileditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
