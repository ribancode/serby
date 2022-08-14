import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeOtpVerificationComponent } from './ce-otp-verification.component';

describe('CeOtpVerificationComponent', () => {
  let component: CeOtpVerificationComponent;
  let fixture: ComponentFixture<CeOtpVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeOtpVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeOtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
