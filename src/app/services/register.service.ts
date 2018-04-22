import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../interfaces/user';
import {RegistrationForm} from '../interfaces/registrationForm';


@Injectable()
export class RegisterService {

  constructor(private _http: Http) { }

  postRegistration(registration: RegistrationForm): Observable<User> {
    return new Observable<User>(observer => {
      this._http.post('/login/register',registration).subscribe(res => observer.next(res.json()));
    });
  }
}
