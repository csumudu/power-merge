import { TestBed } from '@angular/core/testing';

import { CompareManagerService } from './compare-manager.service';

describe('CompareManagerService', () => {
  let service: CompareManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
