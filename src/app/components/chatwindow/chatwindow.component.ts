import {Component, OnInit} from '@angular/core';
import {Message} from '../../interfaces/message';
import {ServerEventsEmitter} from '../../services/serverEventsEmitter';
import {User} from '../../interfaces/user';
import {ChatService} from '../../services/chat.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.css'],
})

export class ChatwindowComponent implements OnInit {

  messages: string[];
  message: string;
  user: User;
  receiver: User;
  conversationID: string;
  socketID: string;

  constructor(private chatService: ChatService, private loginService: LoginService, private eventEmitter: ServerEventsEmitter) {
    this.messages = [];
    console.log('chat window chat service ID: ' + this.chatService.id);
  }

  ngOnInit() {
    this.loginService.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.initialEvents();
      }
    });

    this.chatService.receiverSource.subscribe(receiver => {
      console.log('chatwindow receiver: ');
      if(receiver){
        this.receiver = receiver;
      }
    });
  }


  initialEvents(){

    this.eventEmitter.isReady.subscribe(isReady => {

      if (isReady) {

        console.log('6. ChatwindowComponent: server emmiter is ready. initializing events.');

        this.eventEmitter.handleEmittedEvent('newMessage').subscribe(msg => {
          this.messages.push(msg);
        });

        this.eventEmitter.handleEmittedEvent('receiveSocketID').subscribe(sockID => {
          console.log(sockID);
          this.socketID = sockID;
        });

        console.log('7. ChatwindowComponent: About to crash');
        this.eventEmitter.emitEvent({name: 'getSocketID', arguments: {id: this.user.userID}});
      }

    });
  }


  sendButtonClick() {
    console.log(this.chatService);
    // console.log(this.receiver);
    if (this.message) {
      var messageObject = {
        senderID: this.user.userID,
        receiverID: this.receiver.userID,
        content: this.message
      };

      console.log('emitting message to :');
      console.log(this.receiver);
      this.eventEmitter.emitEvent({name: 'sendMessage', arguments: messageObject});
      this.message = '';
    }
  }
}
