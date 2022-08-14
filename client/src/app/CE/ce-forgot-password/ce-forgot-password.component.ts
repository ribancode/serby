import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { generalConfig } from 'src/constant/general-config.constants';
import { GeneralService } from 'src/core/general.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-ce-forgot-password',
  templateUrl: './ce-forgot-password.component.html',
  styleUrls: ['./ce-forgot-password.component.css']
})
export class CeForgotPasswordComponent implements OnInit {
  ceForgotForm: FormGroup;

  constructor(
      private formbuilder: FormBuilder,
      private _generalService: GeneralService,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService,
      private router: Router,
      private http: HttpClient
  ) { }

  ngOnInit() {
      this.ceForgotForm = this.formbuilder.group({
          phone: ['', Validators.required],
      });
  }

  submitForgotData() {
      if (this.ceForgotForm.valid) {
          this.spinner.show()
          this._generalService.ceForgotPassword(this.ceForgotForm.value).subscribe(result => {
              if (result.status == 200) {
                  this.toastr.success('', result.message);
                  localStorage.setItem("path", "forgotPassword")
                  localStorage.setItem("user_phone", this.ceForgotForm.value.phone)
                  this.router.navigateByUrl("CE/ce-otp-verification")
                  this.spinner.hide();
              } else {
                  this.toastr.warning('', result.message);
                  this.spinner.hide()
              }
          }, (error) => {
              this.spinner.hide()
              this.toastr.error('', 'Something went wrong');
          })
      } else {
          this._generalService.ceMarkFormGroupTouched(this.ceForgotForm);
      }
  }


}
