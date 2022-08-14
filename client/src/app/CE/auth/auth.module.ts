import { CeRegisterLoginComponent } from '../ce-register-login/ce-register-login.component';
import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { NgOtpInputModule } from 'ng-otp-input';
import { CeForgotPasswordComponent } from '../ce-forgot-password/ce-forgot-password.component';
import { CeResetPasswordComponent } from '../ce-reset-password/ce-reset-password.component';
import { CeOtpVerificationComponent } from '../ce-otp-verification/ce-otp-verification.component';
import { CategoriesComponent } from '../categories/categories.component';
import { SubCategoriesComponent } from '../sub-categories/sub-categories.component';
import { AdminApproveComponent } from '../admin-approve/admin-approve.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { CEComponent } from 'src/app/layouts/ce/ce.component';
import {CeTableComponent} from '../ce-table/ce-table.component';
import { CeSubcategoriesComponent } from '../ce-subcategories/ce-subcategories.component';
import { MaterialModule } from '../../shared/material.module';
import { AddCeProductComponent } from '../add-ce-product/add-ce-product.component';
import { AddProductComponent } from '../add-product/add-product.component';

const routes: Routes = [
  { path: 'login', component: CeRegisterLoginComponent },
  { path: 'ce-forgot-password', component: CeForgotPasswordComponent },
  { path: 'ce-reset-password', component: CeResetPasswordComponent },
  { path: 'ce-otp-verification', component : CeOtpVerificationComponent },
  { path: 'categories', component : CategoriesComponent },
  { path: 'sub-categories', component : SubCategoriesComponent },
  { path: 'approve', component : AdminApproveComponent },
  { path: 'add-product', component : AddProductComponent },
  { path: 'dashboard', canActivate : [AuthGuard], component : CEComponent,
  }
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
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  
  declarations: [
    CeRegisterLoginComponent, 
    CeForgotPasswordComponent, 
    CeResetPasswordComponent,
    CeOtpVerificationComponent,
    CategoriesComponent, 
    SubCategoriesComponent, 
    AdminApproveComponent,
    DashboardComponent,
    CEComponent,
    CeTableComponent,
    CeSubcategoriesComponent,
    AddCeProductComponent,
    AddProductComponent
    
  ],
  entryComponents : [AddCeProductComponent],

  providers: [NgxSpinnerService],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }

