import { TestBed } from '@angular/core/testing';

import { SparePartsService } from './spare-parts.service';

describe('SparePartsService', () => {
  let service: SparePartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SparePartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
