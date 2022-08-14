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
  selector: 'app-ce-reset-password',
  templateUrl: './ce-reset-password.component.html',
  styleUrls: ['./ce-reset-password.component.css']
})
export class CeResetPasswordComponent implements OnInit {

  phoneNo_fp: any;
  ceResetForm: FormGroup;
  fieldTextType: boolean;
  fieldPassType: boolean;

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
      let pass = new FormControl('', [Validators.required, Validators.maxLength(generalConfig.pattern.PASSWORDMAXLENGTH), Validators.minLength(generalConfig.pattern.PASSWORDMINLENGTH), Validators.pattern(generalConfig.pattern.PASSWORD)]);
      let confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(pass)]);
      this.ceResetForm = this.formbuilder.group({
          phone: [this.phoneNo_fp],
          password: pass,
          confirmPassword: confirmPassword,
      });
  }

  submitResetData() {
      if (this.ceResetForm.valid) {
          this.spinner.show()
          this._generalService.ceResetPassword(this.ceResetForm.value).subscribe(result => {
              if (result.status == 200) {
                  this.toastr.success('', result.message);
                  this.router.navigateByUrl('CE/login');
                  localStorage.removeItem('user_phone')
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
          this._generalService.ceMarkFormGroupTouched(this.ceResetForm);
      }
  }

 toggleFieldTextType(){
      this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldPassType(){
      this.fieldPassType = !this.fieldPassType;
  }

}
