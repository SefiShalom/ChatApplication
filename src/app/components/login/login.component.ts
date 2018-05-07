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
  errorMessage: string;

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {}

  onLoginClick(){

      let loginForm = {
        email: this.email.toLowerCase(),
        password: this.password
      }

      this.loginService.login(loginForm).subscribe(res => {
        if(res.login) {
          console.log('login user:');
          console.log(res);
          this.appendErrorMessage("");
          this.loginService.user.next(res.user);
          this.loginService.isLoggedIn.next(true);
          this.loginService.isLoggedIn.complete();
          this.router.navigate(['./chat']);
        }else{
          this.appendErrorMessage("Invalid credentials");
          console.log(this.errorMessage);
          console.log(loginForm);
        }
      });
  }

  appendErrorMessage(error: string){
    this.errorMessage = error;
  }

  onRegisterClick(){
    this.router.navigate(['./login/register']);
  }

}
