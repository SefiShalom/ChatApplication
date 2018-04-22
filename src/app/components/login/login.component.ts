import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {LoginService} from '../../services/login.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: string;
  password: string;
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {}

  onLoginClick(){
      let loginForm = {
        email: this.email.toLowerCase(),
        password: this.password
      }

      this.loginService.login(loginForm).subscribe(res => {
        if(res.login) {
          this.loginService.user.next(res.user);
          this.router.navigate(['./chat']);
          console.log('setting login service isLoggedIn to true');
          this.loginService.isLoggedIn.next(true);
        }
      } );
  }

  onRegisterClick(){
    this.router.navigate(['./login/register']);
  }

}
