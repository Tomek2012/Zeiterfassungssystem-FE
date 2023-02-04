import { TestBed } from '@angular/core/testing';

import { TimetrackingFormService } from './timetracking-form.service';

describe('TimetrackingFormService', () => {
  let service: TimetrackingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimetrackingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
