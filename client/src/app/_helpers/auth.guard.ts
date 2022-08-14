import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean | UrlTree{
      // return true;
      // const currentUser = this.authenticationService.currentUserValue;
      console.log(this.authenticationService.currentUserValue)
      if(this.authenticationService.currentUserValue){
        return true;
      }
      else{
        return this.router.parseUrl("/CE/login");
      }
      //   if(currentUser && currentUser.data[0].token){
      //     this.router.navigate(['CE/categories']);
      //     return true;
      //   }
      //     // check if route is restricted by role
      //     // if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
      //     //     this.router.navigate(['/']);
      //     //     return false;
      //     // }
      //     // return true;
      // // not logged in so redirect to login page with the return url
      // else{
      //   this.router.navigate(['/CE/login']);
      //   return false;
      // }
  }
  
}
