import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterLoginComponent } from './user-register-login.component';

describe('UserRegisterLoginComponent', () => {
  let component: UserRegisterLoginComponent;
  let fixture: ComponentFixture<UserRegisterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegisterLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
