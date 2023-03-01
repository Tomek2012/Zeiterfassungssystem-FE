import { TestBed } from '@angular/core/testing';

import { TimetrackingApiService } from './timetracking-api.service';

describe('TimetrackingApiService', () => {
  let service: TimetrackingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimetrackingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
