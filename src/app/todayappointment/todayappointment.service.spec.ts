import { TestBed } from '@angular/core/testing';

import { TodayappointmentService } from './todayappointment.service';

describe('TodayappointmentService', () => {
  let service: TodayappointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodayappointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
