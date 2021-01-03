import { TestBed } from '@angular/core/testing';

import { DoctorlistService } from './doctorlist.service';

describe('DoctorlistService', () => {
  let service: DoctorlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
