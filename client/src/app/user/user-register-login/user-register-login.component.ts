import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { generalConfig } from 'src/constant/general-config.constants';
import { GeneralService } from 'src/core/general.service';
import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-user-register-login',
    templateUrl: './user-register-login.component.html',
    styleUrls: ['./user-register-login.component.css'],
    providers: [NgxSpinnerService]
})

export class UserRegisterLoginComponent implements OnInit {
    userName: any;
    signUpUserForm: FormGroup;
    loginUserForm: FormGroup;
    fileData: File = null;
    imageSrc: any;
    showPassword: boolean;
    selectedFile : File = null;
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
        let pass = new FormControl('', [Validators.required, Validators.maxLength(generalConfig.pattern.PASSWORDMAXLENGTH), Validators.minLength(generalConfig.pattern.PASSWORDMINLENGTH), Validators.pattern(generalConfig.pattern.PASSWORD)]);
        let confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(pass)]);
        this.signUpUserForm = this.formbuilder.group({
            firstname: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(generalConfig.pattern.EMAIL)]],
            username: ['', Validators.required],
            phone: ['', [Validators.required]],
            password: pass,
            confirmPassword: confirmPassword,
        });
        // let passw = new FormControl('', [Validators.required, Validators.maxLength(generalConfig.pattern.PASSWORDMAXLENGTH), Validators.minLength(generalConfig.pattern.PASSWORDMINLENGTH), Validators.pattern(generalConfig.pattern.PASSWORD)]);
        let passw = new FormControl('', [Validators.required]);
        // let confirmPass = new FormControl('', [Validators.required]);
        this.loginUserForm = this.formbuilder.group({
            username: ['', Validators.required],
            password: passw,
        });
    }

    submitLoginData() {
        if (this.loginUserForm.valid) {
            this.spinner.show()
            this._generalService.userLogin(this.loginUserForm.value).subscribe(result => {
                if (result.status == 200) {
                    this.toastr.success('', result.message);
                    this.spinner.hide();
                    this.router.navigateByUrl('')
                    localStorage.setItem('userId', this.loginUserForm.value.username)
                    console.log(localStorage.setItem('userId', this.loginUserForm.value.username))
                } else{
                    if (result.otp_verification == false) {
                        this.toastr.warning('', result.message);
                        this.spinner.hide()
                        this.router.navigateByUrl('otp-verification')
                    } else{
                        this.toastr.warning('', result.message);
                        this.spinner.hide()
                    }
                }
            }, (error) => {
                this.spinner.hide()
                this.toastr.error('', 'Something went wrong');
            })
        } else{
            this._generalService.markFormGroupTouched(this.loginUserForm);
        }
    }

    submitSignupData() {
        if (this.signUpUserForm.valid) {
            this.spinner.show()
            this._generalService.userSignUp(this.signUpUserForm.value).subscribe(result => {
                if (result.status == 200){
                    this.toastr.success('', result.message);
                    this.spinner.hide();
                    localStorage.setItem("user_phone", this.signUpUserForm.value.phone)
                    localStorage.setItem("path", "signup")
                    this.router.navigateByUrl("otp-verification");
                } else{
                    this.toastr.warning('', result.message);
                    this.spinner.hide()
                }
            }, (error) => {
                this.spinner.hide()
                this.toastr.error('', 'Something went wrong');
            })
        } else{
            this._generalService.markFormGroupTouched(this.signUpUserForm);
        }
    }

    moveToForgotPass() {
        this.router.navigateByUrl('forgot-password');
    }

    public inputValidator(event: any) {
        this.userName = event.target.value.split('@')[0];
        this.signUpUserForm.get('username').setValue(this.userName);
    }

    toggleFieldTextType(){
        this.fieldTextType = !this.fieldTextType;
    }

    toggleFieldPassType(){
        this.fieldPassType = !this.fieldPassType;
    }

}
