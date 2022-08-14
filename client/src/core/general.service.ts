import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiUrlConstant } from 'src/constant/api-url.constants';
import {categoryResonse, subCategoryResonse} from '../app/_models/user';

const headers = new HttpHeaders({
  'Accept': 'image/png,application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'access-control-allow-headers': 'access-control-allow-methods,access-control-allow-origin,allow,content-type',
  'content-Type': 'image/png',
  'access-control-allow-methods': 'POST, GET, OPTIONS, PUT, DELETE',
  'access-control-allow-origin': '*',
  'allow': 'POST, GET, OPTIONS, PUT, DELETE'
});

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Access-Control-Expose-Headers': '*' })
};



@Injectable({
  providedIn: 'root'
})



export class GeneralService {

  constructor(
    private http: HttpClient,
  ) { }




  /* Common Api's url */
  otpVerify(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.VERIFYOTP, data);
  }

  /* CE APi's */
  ceLogin(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.CELOGIN, data);
  }

  ceSignUp(data: any,http): Observable<any> {
    return this.http.post(ApiUrlConstant.CESIGNUP, data,http);
  }

  ceForgotPassword(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.CEFORGOTPASSWORD, data);
  }

  ceResetPassword(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.CERESETPASSWORD, data);
  }

  categories(): Observable<any> {
    return this.http.get(ApiUrlConstant.CATEGORIES);
  }

  ceCategories(): Observable<categoryResonse> {
    let header = new HttpHeaders().set(
      "Authorization",
       `Bearer ${localStorage.getItem("ceToken")}`
    );
    return this.http.get<categoryResonse>(ApiUrlConstant.CECATEGORIES, {headers:header});
   }

   ceSubCategories(id : any): Observable<subCategoryResonse>{
    let header = new HttpHeaders().set(
      "Authorization",
       `Bearer ${localStorage.getItem("ceToken")}`
    );
    const catId = { category_id : id}
    return this.http.post<subCategoryResonse>(ApiUrlConstant.CESUBCATEGORIES, catId, {headers:header});
   }

  subCategories(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.SUBCATEGORIES, data);
  }

  submitCategories(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.SUBMITCATEGORIES, data);
  }

  ceMarkFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.ceMarkFormGroupTouched(control);
      }
    });
  }


  /* User Api's */  
  userLogin(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.LOGIN, data);
  }

  userSignUp(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.SIGNUP, data);
  }
  
  forgotPassword(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.FORGOTPASSWORD, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.RESETPASSWORD, data);
  }

  getCategories(): Observable<any> {
    return this.http.get(ApiUrlConstant.GETCATEGORIES);
  }

  getSubCategories(id : number): Observable<any>{
    const categoryId = {id: id}
    return this.http.post(ApiUrlConstant.GETSUBCATEGORIES, categoryId);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
