import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () =>{
      console.log('connected to the server');
    });
    this.socket.on('disconnect', ()=>{
      console.log('disconnected from the server');
    });
  }

  // EMITTER
  sendMessage(msg: string) {
    this.socket.emit('sendMessage',msg);
  }

  // HANDLER
  onNewMessage() {
    return Observable.create(observer => {
      this.socket.on('newMessage', msg => {
        observer.next(msg);
      });
    });
  }
}
