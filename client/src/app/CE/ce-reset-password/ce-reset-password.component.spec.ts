import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeResetPasswordComponent } from './ce-reset-password.component';

describe('CeResetPasswordComponent', () => {
  let component: CeResetPasswordComponent;
  let fixture: ComponentFixture<CeResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
