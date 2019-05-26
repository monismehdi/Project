import { TestBed } from '@angular/core/testing';

import { BlatterService } from './blatter.service';

describe('BlatterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlatterService = TestBed.get(BlatterService);
    expect(service).toBeTruthy();
  });
});
