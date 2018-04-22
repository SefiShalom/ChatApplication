import {Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Event} from '../interfaces/event';
import * as io from 'socket.io-client';
import {LoginService} from './login.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ServerEventsEmitter implements OnInit{

  private socket: SocketIOClient.Socket;
  isReady = new BehaviorSubject<Boolean>(false);


  constructor(private loginService: LoginService) {
    this.loginService.isLoggedIn.subscribe( login => {
      if(login){
        this.initServerEventsEmitter();
      }
    });
  }


  ngOnInit(){
  }


  initServerEventsEmitter(){
    console.log('Server emitter on init');
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () =>{
      console.log('connected to the server');
    });
    this.socket.on('disconnect', ()=>{
      console.log('disconnected from the server');
    });
    this.isReady.next(true);
  }



  // EMITTER
  emitEvent(event: Event) {
    this.socket.emit(event.name, event.arguments);
  }

  // HANDLER
  handleEmittedEvent(eventName: string) {
    return Observable.create(observer => {
      this.socket.on(eventName, msg => {
        observer.next(msg);
      });
    });
  }
}

