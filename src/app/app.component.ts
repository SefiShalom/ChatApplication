import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login.service';
import {ServerEventEmitter} from './services/ServerEventEmitter';
import {User} from './interfaces/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(){
    console.log('app component');
  }

  ngOnInit() {

  }

}
