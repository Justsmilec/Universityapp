import { TestBed } from '@angular/core/testing';

import { SubjectpostService } from './subjectpost.service';

describe('SubjectpostService', () => {
  let service: SubjectpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
