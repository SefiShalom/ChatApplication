import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Event} from '../interfaces/event';
import * as io from 'socket.io-client';
import {LoginService} from './login.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../interfaces/user';
import {Router} from '@angular/router';

@Injectable()
export class EventEmitter implements OnInit {

  private socket: SocketIOClient.Socket;
  public isReady = new BehaviorSubject<Boolean>(false);
  user = new BehaviorSubject<User>(null);

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.isLoggedIn.subscribe(login => {
      if (login) {

        console.log('5. ServerEventEmmiter: initializing server event emitter');

        this.loginService.user.subscribe(user => {
          if (user) {

            this.initServerEventsEmitter();

            console.log('registering client to Clients');

            this.handleEmittedEvent('clientRegistrationResponse').subscribe(res => {
              if (res.isRegistered) {
                console.log('user received socketID:');
                console.log(res.socketID);
                user.socketID = res.socketID;
                this.user.next(user);
                this.isReady.next(true);
              }
            });

            this.emitEvent({name: 'registerClientToClients', arguments: {userID: user.userID}});
          }
        });
      }
    });
  }

  ngOnInit() {
  }

  initServerEventsEmitter() {
    console.log('Server emitter on init');
    this.socket = io('http://192.168.1.10:3000');
    this.socket.on('connect', () => {
      console.log('connected to the server');
    });
    this.socket.on('disconnect', () => {
      console.log('disconnected from the server');
      this.router.navigate(['/']);
      this.socket.close();
    });
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

