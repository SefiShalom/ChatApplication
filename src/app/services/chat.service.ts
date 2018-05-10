import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {Message} from '../interfaces/message';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ServerEventEmitter} from './ServerEventEmitter';

@Injectable()
export class ChatService {

  userSource = new BehaviorSubject<User>(null);
  receiverSource = new BehaviorSubject<User>(null);
  newMessageSource = new BehaviorSubject<Message>(null);
  isReady = new BehaviorSubject<boolean>(false);
  conversationSource = new BehaviorSubject<Message[]>(null);

  constructor(private http: Http, private eventEmitter: ServerEventEmitter) {

    this.eventEmitter.isReady.subscribe(ready => {
      if (ready) {
        this.eventEmitter.user.subscribe(user => {
          if(user){
            this.userSource.next(user);
            this.isReady.next(true);
          }
        });
        this.eventEmitter.handleEmittedEvent('newMessage').subscribe(message => {
          message.class = 'received';
          this.newMessageSource.next(message);
        });
      }
    });
  }

  getFriendsList(id: string): Observable<User[]> {
    return new Observable<User[]>(observer => {
      this.http.get('/user/get-user-friends-list?id=' + id).subscribe(
        res => observer.next(res.json()));
    });
  }

  sendMessage(message: Message){
    this.eventEmitter.emitEvent({name: 'sendMessage', arguments: message});
    this.newMessageSource.next(message);
  }

  setCurrentReceiver(receiver) {
    this.receiverSource.next(receiver);
  }
}
