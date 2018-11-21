import { TestBed } from '@angular/core/testing';

import { LsnModulesService } from './lsn-modules.service';

describe('LsnModulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LsnModulesService = TestBed.get(LsnModulesService);
    expect(service).toBeTruthy();
  });
});
