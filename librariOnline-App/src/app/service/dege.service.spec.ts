import { TestBed } from '@angular/core/testing';

import { DegeService } from './dege.service';

describe('DegeService', () => {
  let service: DegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
