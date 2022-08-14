import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeRegisterLoginComponent } from './ce-register-login.component';

describe('CeRegisterLoginComponent', () => {
  let component: CeRegisterLoginComponent;
  let fixture: ComponentFixture<CeRegisterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeRegisterLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeRegisterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
