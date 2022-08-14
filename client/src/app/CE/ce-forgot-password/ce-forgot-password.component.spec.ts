import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeForgotPasswordComponent } from './ce-forgot-password.component';

describe('CeForgotPasswordComponent', () => {
  let component: CeForgotPasswordComponent;
  let fixture: ComponentFixture<CeForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
