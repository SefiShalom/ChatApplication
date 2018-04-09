import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/loginservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  private user;

  constructor(private _login: LoginService){
    this._login.getUserByID().subscribe(user =>
    console.log(user));
  }
  ngOnInit() {
  }

}
