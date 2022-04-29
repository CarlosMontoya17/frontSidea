import { TestBed } from '@angular/core/testing';

import { BuscarciberService } from './buscarciber.service';

describe('BuscarciberService', () => {
  let service: BuscarciberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarciberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
