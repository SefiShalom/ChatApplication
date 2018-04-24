import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
import {Message} from '../interfaces/message';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ChatService {

  private user = new BehaviorSubject<User>(null);
  receiverSource = new BehaviorSubject<User>(null);
  // currentReceiver = this.receiverSource.asObservable();
  currentReceiver: User;
  isLoggedIn = new BehaviorSubject<boolean>(false);



  id = Math.random();

  constructor(private http: Http) {}

  getFriendsList(user: User): Observable<User[]> {
    return new Observable<User[]>(observer => {
      this.http.get('/user/get-user-friends-list?id=' + user.userID).subscribe(
        res => observer.next(res.json()));
    });
  }

  setCurrentReceiver(receiver){
    console.log('chat service receiver: ');
    this.currentReceiver = receiver;
    this.receiverSource.next(receiver);
  }
}
