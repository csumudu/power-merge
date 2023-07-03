import { TestBed } from '@angular/core/testing';

import { OpenFileManagerService } from './open-file-manager.service';

describe('OpenFileManagerService', () => {
  let service: OpenFileManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenFileManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
