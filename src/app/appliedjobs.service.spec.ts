import { TestBed } from '@angular/core/testing';

import { AppliedjobsService } from './appliedjobs.service';

describe('AppliedjobsService', () => {
  let service: AppliedjobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppliedjobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
