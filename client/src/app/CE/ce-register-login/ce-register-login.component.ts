import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { generalConfig } from 'src/constant/general-config.constants';
import { GeneralService } from 'src/core/general.service';
import { CustomValidators } from 'ng2-validation';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { first } from 'rxjs/operators';



@Component({
    selector: 'app-ce-register-login',
    templateUrl: './ce-register-login.component.html',
    styleUrls: ['./ce-register-login.component.css'],
    providers: [NgxSpinnerService]
})

export class CeRegisterLoginComponent implements OnInit {
    userName: any;
    signUpCeForm: FormGroup;
    loginCeForm: FormGroup;
    fileData: File = null;
    imageSrc: any;
    showPassword: boolean;
    fieldTextType: boolean;
    selectedFile : File = null;
    fieldpassType: boolean;

    constructor(
    private formbuilder: FormBuilder,
    private _generalService: GeneralService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    ) { }


    

    ngOnInit() {
        let pass = new FormControl('', [Validators.required, Validators.maxLength(generalConfig.pattern.PASSWORDMAXLENGTH), Validators.minLength(generalConfig.pattern.PASSWORDMINLENGTH), Validators.pattern(generalConfig.pattern.PASSWORD)]);
        let confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(pass)]);
        this.signUpCeForm = this.formbuilder.group({
            firstname: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern(generalConfig.pattern.EMAIL)]],
            username: ['', Validators.required],
            // phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(generalConfig.pattern.MOB_NO)]],
            phone: ['', [Validators.required]],
            password: pass,
            confirmPassword: confirmPassword,
            store_name: ['', [Validators.required]],
            pimage: ['',Validators.required],
            // longitude: [''],
            // latitide: [''],
        });
        // let passw = new FormControl('', [Validators.required, Validators.maxLength(generalConfig.pattern.PASSWORDMAXLENGTH), Validators.minLength(generalConfig.pattern.PASSWORDMINLENGTH), Validators.pattern(generalConfig.pattern.PASSWORD)]);
        let passw = new FormControl('', [Validators.required]);
        // let confirmPass = new FormControl('', [Validators.required]);
        this.loginCeForm = this.formbuilder.group({
            username: ['', Validators.required],
            password: passw,
        });
    }

    onFileChange(event){
        this.selectedFile = <File>event.target.files[0];
        if (event.target.files && event.target.files.length) {
            const file = (event.target.files[0] as File);
            this.signUpCeForm.get('pimage').setValue(file.name);
        }
    }

    submitLoginData() {
        // if (this.loginCeForm.valid) {
        //     console.log(this.loginCeForm.value, this.loginCeForm.value.username)
        //     localStorage.setItem('CeUser-id', this.loginCeForm.value.username)
        //     this.authenticationService.celogin(this.loginCeForm.value);
        // } else{
        //     this._generalService.ceMarkFormGroupTouched(this.loginCeForm);
        // }
        if (this.loginCeForm.invalid) {
            return;
        }
        this.authenticationService.login(this.loginCeForm.value.username, this.loginCeForm.value.password)
        .pipe(first())
            .subscribe({
                next: () => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl('CE/dashboard');
                },
            });
    }

    submitSignupData() {
        if (this.signUpCeForm.valid) {
            
        const httpHeaderOptn = {
            headers: new HttpHeaders(
              {
                 'Access-Control-Allow-Origin': '*',
               'Content-Type': 'application/json'
              })
          };
                      //    'Authorization' : token

            this.spinner.show()
            this._generalService.ceSignUp(this.signUpCeForm.value,httpHeaderOptn).subscribe(result => {
                if (result.status == 200) {
                    this.toastr.success('', result.message);
                    this.spinner.hide();
                    localStorage.setItem("user_phone", this.signUpCeForm.value.phone)
                    localStorage.setItem("path", "signup")
                    this.router.navigateByUrl('CE/ce-otp-verification');
                } else {
                    this.toastr.warning('', result.message);
                    this.spinner.hide()
                }
            }, (error) => {
                this.spinner.hide()
                this.toastr.error('', 'Something went wrong');
            })
        } else {
            this._generalService.ceMarkFormGroupTouched(this.signUpCeForm);
        }
    }

    moveToForgotPass() {
        this.router.navigateByUrl('CE/ce-forgot-password');
    }

    public inputValidator(event: any) {
        this.userName = event.target.value.split('@')[0];
        this.signUpCeForm.get('username').setValue(this.userName);
    }

    toggleFieldTextType(){
        this.fieldTextType = !this.fieldTextType;
    }

    toggleFieldPassType(){
        this.fieldpassType = !this.fieldpassType;
    }

}
