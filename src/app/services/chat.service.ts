import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
import {Message} from '../interfaces/message';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Injectable()
export class ChatService {

  constructor(private http: Http) {}

  getFriendsList(user: User): Observable<User[]> {
    console.log('friends list of');
    console.log(user);
    return new Observable<User[]>(observer => {
      this.http.get('/user/get-user-friends-list?id=' + user.userID).subscribe(
        res => observer.next(res.json()));
    });
  }
}
