import { Injectable } from '@angular/core';
import {ServerEventEmitter} from './ServerEventEmitter';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../interfaces/user';

@Injectable()
export class SearchService {

  resultsList = new BehaviorSubject<User[]>(null);
  keywords: string;

  constructor(private serverEventEmitter: ServerEventEmitter) {
    // this.serverEventEmitter.handleEmittedEvent()
  }

  searchFriends(keywords){
    this.serverEventEmitter.emitEvent({name: 'searchFriends', arguments:{keywords: keywords}});
  }


}
