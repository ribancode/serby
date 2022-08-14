import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneOtpVerificationComponent } from './phone-otp-verification.component';

describe('PhoneOtpVerificationComponent', () => {
  let component: PhoneOtpVerificationComponent;
  let fixture: ComponentFixture<PhoneOtpVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneOtpVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneOtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
