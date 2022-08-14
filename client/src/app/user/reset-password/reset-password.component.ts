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
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    providers: [NgxSpinnerService]

})
export class ResetPasswordComponent implements OnInit {
    phoneNo_fp: any;
    resetForm: FormGroup;
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
        this.resetForm = this.formbuilder.group({
            phone: [this.phoneNo_fp],
            password: pass,
            confirmPassword: confirmPassword,
        });
    }

    submitResetData() {
        if (this.resetForm.valid) {
            this.spinner.show()
            this._generalService.resetPassword(this.resetForm.value).subscribe(result => {
                if (result.status == 200) {
                    this.toastr.success('', result.message);
                    this.router.navigateByUrl('login')
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
            this._generalService.markFormGroupTouched(this.resetForm);
        }
    }

    toggleFieldTextType(){
        this.fieldTextType = !this.fieldTextType;
    }

    toggleFieldPassType(){
        this.fieldPassType = !this.fieldPassType;
    }
    
}


