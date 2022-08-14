import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { GeneralService } from 'src/core/general.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private _generalService: GeneralService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private router: Router,
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        console.log(this.currentUserSubject)
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        console.log(this.currentUserSubject, this.currentUserSubject.value)
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this._generalService.ceLogin({username, password})
            .pipe(map(user => {
                console.log(user)
                // login successful if there's a jwt token in the response
                if (user) {
                    console.log(user)
                   localStorage.setItem('ceToken', user.data[0].token)
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    celogin(data: any) {
        return this._generalService.ceLogin(data).subscribe(result => {
            if (result.status == 200) {
                if(result.otp_verification == false && result.step == 'otp'){
                    this.toastr.warning('', result.message);
                    this.spinner.hide()
                    this.router.navigateByUrl('CE/ce-otp-verification');
                } else if(result.is_approved == false && result.step == 'categories'){
                    this.spinner.hide()
                    this.router.navigateByUrl('CE/categories');
                } else if(result.is_approved == false && result.step == 'thanks'){
                    this.toastr.warning('', result.message);
                    this.spinner.hide()
                    this.router.navigateByUrl('CE/approve');
                } else if(result.account_active == false && result.step == 'login'){
                    this.toastr.warning('', result.message);
                    this.spinner.hide()
                } else{
                    this.toastr.success('', result.message);
                    // this.spinner.hide();
                    this.router.navigateByUrl('CE/dashboard');
                    const user = result.data;
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                    }
                    return user;
                }
            } else{
                this.toastr.warning('', result.message);
                this.spinner.hide()
            }
        }, (error) => {
            this.spinner.hide()
            this.toastr.error('', 'Something went wrong');
        })
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userId');
        this.currentUserSubject.next(null);
    }
}