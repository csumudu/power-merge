import { TestBed } from '@angular/core/testing';

import { MergeManagerService } from './merge-manager.service';

describe('MergeManagerService', () => {
  let service: MergeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MergeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
