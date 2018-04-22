import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login.service';
import {ServerEventsEmitter} from './services/serverEventsEmitter';
import {User} from './interfaces/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(){
  }

  ngOnInit() {

  }

}
