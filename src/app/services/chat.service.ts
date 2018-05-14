import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {Message} from '../interfaces/message';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ServerEventEmitter} from './ServerEventEmitter';
import {ReceiverSource} from '../interfaces/receiversource';
import {Friend} from '../interfaces/friends';

@Injectable()
export class ChatService {

  userSource = new BehaviorSubject<User>(null);
  receiverSource = new BehaviorSubject<Friend>(null);
  newMessageSource = new BehaviorSubject<Message>(null);
  isReady = new BehaviorSubject<boolean>(false);
  friendsListSource = new BehaviorSubject<Friend[]>(null);

  constructor(private http: Http, private eventEmitter: ServerEventEmitter) {

    this.eventEmitter.isReady.subscribe(ready => {
      if (ready) {
        this.eventEmitter.user.subscribe(user => {
          if(user){

            this.eventEmitter.handleEmittedEvent('receiveFriendsList').subscribe(list => {
              if(list){
                this.friendsListSource.next(list);
              }
            });

            this.eventEmitter.handleEmittedEvent('newMessage').subscribe(message => {
              message.class = 'received';
              this.newMessageSource.next(message);
            });

            this.userSource.next(user);
            this.isReady.next(true);
          }
        });
      }
    });
  }

  getConversation(friend_id: string ,user_id: string){
    this.eventEmitter.emitEvent({name: 'getConversation', arguments:{user1: friend_id, user2: user_id}});
  }

  getFriendsList(id: string) {
    this.eventEmitter.emitEvent({name: 'getFriendsList', arguments: {user_id: id}});
  }

  sendMessage(message: Message){
    this.eventEmitter.emitEvent({name: 'sendMessage', arguments: message});
    this.newMessageSource.next(message);
  }

  setCurrentReceiver(receiver) {
    this.receiverSource.next(receiver);
  }
}


export interface ConversationMessages {
  user_id: string;
  messages: Message[];
}
