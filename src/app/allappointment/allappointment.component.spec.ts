import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllappointmentComponent } from './allappointment.component';

describe('AllappointmentComponent', () => {
  let component: AllappointmentComponent;
  let fixture: ComponentFixture<AllappointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllappointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
