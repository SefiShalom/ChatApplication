import { Injectable } from '@angular/core';
import {ServerEventEmitter} from './ServerEventEmitter';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Request} from '../interfaces/request';
import {User} from '../interfaces/user';

@Injectable()
export class RequestsService {

  isReady = new BehaviorSubject<Boolean>(false);
  newRequestSource = new BehaviorSubject<Request>(null);
  requestsList= new BehaviorSubject<Request[]>(null);
  user: User;

  constructor(private serverEventEmitter: ServerEventEmitter) {
    this.serverEventEmitter.isReady.subscribe(ready => {
      if(ready){
        this.serverEventEmitter.handleEmittedEvent('receiveRequestsList').subscribe(list => {
          if(list[0] != null){
            this.requestsList.next(list);
          }
        });

        this.serverEventEmitter.handleEmittedEvent('newRequest').subscribe(request => {
          if(request){
            console.log('new request')
            this.newRequestSource.next(request);
          }
        });
        this.isReady.next(true);
      }
    });
  }

  acceptRequest(request_id){

  }

}
