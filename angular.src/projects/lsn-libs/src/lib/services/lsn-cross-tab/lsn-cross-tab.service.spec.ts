import { TestBed } from '@angular/core/testing';

import { LsnCrossTabService } from './lsn-cross-tab.service';

describe('LsnCrossTabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LsnCrossTabService = TestBed.get(LsnCrossTabService);
    expect(service).toBeTruthy();
  });
});
