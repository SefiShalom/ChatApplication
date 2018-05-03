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

  // friendsListSource: BehaviorSubject<User[]>;
  // friendsList = this.friendsListSource.asObservable();

  userSource = new BehaviorSubject<User>(null);
  receiverSource = new BehaviorSubject<User>(null);
  isReady = new BehaviorSubject<boolean>(false);


  constructor(private http: Http, private eventEmitter: EventEmitter) {

    this.eventEmitter.isReady.subscribe(ready => {
      if (ready) {
        this.eventEmitter.user.subscribe(user => {
          if(user){
            console.log('ChatService user is ready');
            this.userSource.next(user);
            this.isReady.next(true);
          }
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

  receiveMessage(): Observable<Message>{
    return new Observable<Message>(observable => {
      this.eventEmitter.handleEmittedEvent('newMessage').subscribe(message => {
        return message
      });
    });
  }

  setCurrentReceiver(receiver) {
    this.receiverSource.next(receiver);
  }
}
