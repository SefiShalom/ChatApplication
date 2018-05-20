import { Injectable } from '@angular/core';
import {ServerEventEmitter} from './ServerEventEmitter';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../interfaces/user';
import {SearchResult} from '../interfaces/searchresult';

@Injectable()
export class SearchService {

  resultsList = new BehaviorSubject<SearchResult[]>(null);
  user_id: string;
  isReady = new BehaviorSubject<boolean>(false);

  constructor(private serverEventEmitter: ServerEventEmitter) {
    this.serverEventEmitter.user.subscribe(user => {
      if(user){
        this.user_id = user._id;

        this.serverEventEmitter.handleEmittedEvent('receiveSearchResults').subscribe(list => {
          if(list){
            this.resultsList.next(list);
          }
        });
        this.isReady.next(true);
      }
    });
  }

  searchFriends(searchTerm){
    searchTerm.user_id = this.user_id;
    this.serverEventEmitter.emitEvent({name: 'searchFriends', arguments: searchTerm});
  }


  addFriend(subject_id: string) {

    let requestObject = {
      requester_id: this.user_id,
      subject_id: subject_id
    }
    console.log('sending request');
    this.serverEventEmitter.emitEvent({name: 'sendRequest', arguments: requestObject});
  }
}
