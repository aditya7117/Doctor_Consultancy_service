import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivecallComponent } from './activecall.component';

describe('ActivecallComponent', () => {
  let component: ActivecallComponent;
  let fixture: ComponentFixture<ActivecallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivecallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivecallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
