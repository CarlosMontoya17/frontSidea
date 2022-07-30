import { TestBed } from '@angular/core/testing';

import { RobotsService } from './robots.service';

describe('RobotsService', () => {
  let service: RobotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RobotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
