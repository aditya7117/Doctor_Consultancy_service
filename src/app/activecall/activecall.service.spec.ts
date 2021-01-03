import { TestBed } from '@angular/core/testing';

import { ActivecallService } from './activecall.service';

describe('ActivecallService', () => {
  let service: ActivecallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivecallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
