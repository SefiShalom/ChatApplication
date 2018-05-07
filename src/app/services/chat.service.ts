import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {Message} from '../interfaces/message';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {EventEmitter} from './EventEmitter';
import {observable} from 'rxjs/symbol/observable';

@Injectable()
export class ChatService {

  userSource = new BehaviorSubject<User>(null);
  receiverSource = new BehaviorSubject<User>(null);
  isReady = new BehaviorSubject<boolean>(false);
  newMessageSource = new BehaviorSubject<Message>(null);

  constructor(private http: Http, private eventEmitter: EventEmitter) {

    this.eventEmitter.isReady.subscribe(ready => {
      if (ready) {
        this.eventEmitter.user.subscribe(user => {
          if(user){
            this.userSource.next(user);
            this.isReady.next(true);
          }
        });
        this.eventEmitter.handleEmittedEvent('newMessage').subscribe(message => {
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

  // getFriendsList(user:User){
  //         this.eventEmitter.emitEvent({name: 'getFriendsList',arguments: user});
  // }

  sendMessage(message: Message){
    this.eventEmitter.emitEvent({name: 'sendMessage', arguments: message});
  }

  // receiveMessage(): Observable<Message>{
  //   return new Observable<Message>(observable => {
  //     console.log('receive message from chatservice');
  //     this.eventEmitter.handleEmittedEvent('newMessage').subscribe(message => {
  //       return message
  //     });
  //   });
  // }

  setCurrentReceiver(receiver) {
    this.receiverSource.next(receiver);
  }

}
