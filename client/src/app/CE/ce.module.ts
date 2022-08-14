import { Routes } from '@angular/router';
import { RouterModule } from  '@angular/router';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { NgOtpInputModule } from 'ng-otp-input';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CEComponent } from '../layouts/ce/ce.component';
import{SharedModule} from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { CeTableComponent } from './ce-table/ce-table.component';
// import {MATERIAL_CONTROLS} from '../material-controls';

import {MatTableModule} from '@angular/material/table';
import { CeSubcategoriesComponent } from './ce-subcategories/ce-subcategories.component';
import { AddCeProductComponent } from './add-ce-product/add-ce-product.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  { path: 'dashboard', component : DashboardComponent }
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
    SharedModule,
    MaterialModule,
    // MATERIAL_CONTROLS,
    // MatTableModule,
    RouterModule.forChild(routes)
  ],
  
  declarations: [
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

export class CeModule { }
