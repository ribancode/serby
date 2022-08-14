import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  userId: string;

  constructor(private AuthService : AuthenticationService, private router: Router,) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId')

  }

  signOut(){
    this.AuthService.logout();
    this.router.navigateByUrl('login')
   this.userId = null;
  }

}
