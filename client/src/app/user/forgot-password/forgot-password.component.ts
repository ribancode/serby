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
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
    providers: [NgxSpinnerService]

})

export class ForgotPasswordComponent implements OnInit {
    forgotForm: FormGroup;

    constructor(
        private formbuilder: FormBuilder,
        private _generalService: GeneralService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private router: Router,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.forgotForm = this.formbuilder.group({
            phone: ['', Validators.required],
        });
    }

    submitForgotData() {
        if (this.forgotForm.valid) {
            this.spinner.show()
            this._generalService.forgotPassword(this.forgotForm.value).subscribe(result => {
                if (result.status == 200) {
                    this.toastr.success('', result.message);
                    localStorage.setItem("path", "forgotPassword")
                    localStorage.setItem("user_phone", this.forgotForm.value.phone)
                    this.router.navigateByUrl("otp-verification")
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
            this._generalService.markFormGroupTouched(this.forgotForm);
        }
    }

}
