import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgOtpInputModule } from 'ng-otp-input';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { CountdownModule } from 'ngx-countdown';
// import { CEComponent } from './layouts/ce/ce.component';
import { UserComponent } from './layouts/user/user.component';
import { HeaderComponent } from './layouts/CE/header/header.component';
import { FooterComponent } from './layouts/CE/footer/footer.component';
import { SidebarComponent } from './layouts/CE/sidebar/sidebar.component';
import { UserFooterComponent } from './layouts/user/user-footer/user-footer.component';
import { UserHeaderComponent } from './layouts/user/user-header/user-header.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    // CEComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UserFooterComponent,
    UserHeaderComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    NgOtpInputModule,
    CarouselModule,
    NgxMatIntlTelInputModule,
    CountdownModule,
    SharedModule
  ],
  exports : [],
  providers: [NgxSpinnerService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
