import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private _http: Http) {

  }

  getUserByID(){
    return this._http.get('/user').map(res => res.json());
  }

}
