import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { NgOtpInputModule } from 'ng-otp-input';
import { UserRegisterLoginComponent } from './user-register-login/user-register-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PhoneOtpVerificationComponent } from './phone-otp-verification/phone-otp-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';

const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'login', component: UserRegisterLoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'otp-verification', component : PhoneOtpVerificationComponent },
  { path: 'sub-categories', component : SubCategoriesComponent }

];

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMatIntlTelInputModule,
    NgOtpInputModule,
    CarouselModule,

    RouterModule.forChild(routes)
  ],

  declarations: [
    UserRegisterLoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PhoneOtpVerificationComponent,
    HomeComponent,
    SubCategoriesComponent
  ],
  providers: [NgxSpinnerService],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
