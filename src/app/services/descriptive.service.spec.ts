import { TestBed } from '@angular/core/testing';

import { DescriptiveService } from './descriptive.service';

describe('DescriptiveService', () => {
  let service: DescriptiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescriptiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
