import { Injectable } from '@angular/core';
import {ServerEventEmitter} from './ServerEventEmitter';

@Injectable()
export class SearchService {

  constructor(private serverEventEmitter: ServerEventEmitter) {

    // this.serverEventEmitter.isReady.subscribe()

  }

}
