import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {User} from '../interfaces/user';
import {LoginForm} from '../interfaces/loginForm';
import {LoginResponse} from '../interfaces/loginresponse';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ServerEventEmitter} from './ServerEventEmitter';

@Injectable()
export class LoginService {

  user = new BehaviorSubject<User>(null);
  isLoggedIn = new BehaviorSubject<Boolean>(false);

  constructor(private _http: Http) {

  }

  login(loginForm: LoginForm) {
    return new Observable<LoginResponse>(observer => {
      this._http.post('/login', loginForm).subscribe(res => {
        observer.next(res.json());
      });
    });
  }
}
