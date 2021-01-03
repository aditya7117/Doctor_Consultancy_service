import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayappointmentComponent } from './todayappointment.component';

describe('TodayappointmentComponent', () => {
  let component: TodayappointmentComponent;
  let fixture: ComponentFixture<TodayappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
