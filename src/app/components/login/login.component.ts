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

  constructor(private router: Router, private loginService: LoginService) {
    console.log('login login service ID: ' + this.loginService.id);
  }

  ngOnInit() {}

  onLoginClick(){
      let loginForm = {
        email: this.email.toLowerCase(),
        password: this.password
      }

      this.loginService.login(loginForm).subscribe(res => {
        if(res.login) {
          console.log('2. LoginComponent: received user from DB. setting user.');
          this.loginService.user.next(res.user);
          this.router.navigate(['./chat']);
          console.log('3. LoginComponent: setting login service isLoggedIn to true');
          this.loginService.isLoggedIn.next(true);
          this.loginService.isLoggedIn.complete();
        }
      } );
  }

  onRegisterClick(){
    this.router.navigate(['./login/register']);
  }

}
