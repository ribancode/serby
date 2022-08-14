import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { generalConfig } from 'src/constant/general-config.constants';
import { GeneralService } from 'src/core/general.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-ce-otp-verification',
  templateUrl: './ce-otp-verification.component.html',
  styleUrls: ['./ce-otp-verification.component.css']
})
export class CeOtpVerificationComponent implements OnInit {
  finalOtp: any;
  phoneNo_fp: any;
  otp: string;
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
      allowNumbersOnly: false,
      length: 4,
      isPasswordInput: false,
      disableAutoFocus: false,
  };

  constructor(
      private formbuilder: FormBuilder,
      private _generalService: GeneralService,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService,
      private router: Router,
      private http: HttpClient
  ) { }

  ngOnInit() {
      this.phoneNo_fp = localStorage.getItem("user_phone");
  }

  onOtpChange(otp) {
      this.otp = otp;
      if (this.otp.length == 4) {
          this.finalOtp = this.otp;
      }
  }

  sendOtp() {
      if (this.otp && this.otp.length == 4) {
          this.spinner.show()
          let data =
          {
              phone: this.phoneNo_fp,
              otp: this.finalOtp
          }
          this._generalService.otpVerify(data).subscribe(result => {
              if (result.status == 200) {
                  this.toastr.success('', result.message);
                  if (localStorage.getItem("path") === "signup") {
                    this.router.navigateByUrl('CE/categories');
                  } else if (localStorage.getItem("path") === "forgotPassword") {
                      this.router.navigateByUrl('CE/ce-reset-password');
                  }
                  this.spinner.hide();
              } else{
                  this.toastr.warning('', result.message);
                  this.spinner.hide()
              }
          }, (error) => {
              this.spinner.hide()
              this.toastr.error('', 'Something went wrong');
          })
      } else{
          // this._generalService.ceMarkFormGroupTouched(this.forgotForm);
      }
  }

  setVal(val) {
      this.ngOtpInput.setValue(val);
  }

  resendOtp() {
      if (this.phoneNo_fp != null) {
          this.spinner.show()
          let phoneNo = {
              phone: this.phoneNo_fp
          }
          this._generalService.forgotPassword(phoneNo).subscribe(result => {
              if (result.status == 200) {
                  this.toastr.success('', result.message);
                  this.spinner.hide();
              } else{
                  this.toastr.warning('', result.message);
                  this.spinner.hide()
              }
          }, (error) => {
              this.spinner.hide()
              this.toastr.error('', 'Something went wrong');
          })
      } else {
          // this._generalService.markFormGroupTouched(this.forgotForm);
      }
  }

}
