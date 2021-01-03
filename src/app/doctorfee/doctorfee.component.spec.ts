import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorfeeComponent } from './doctorfee.component';

describe('DoctorfeeComponent', () => {
  let component: DoctorfeeComponent;
  let fixture: ComponentFixture<DoctorfeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorfeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
