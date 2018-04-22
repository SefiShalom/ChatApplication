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
  providers: [ChatService]
})

export class ChatwindowComponent implements OnInit {

  messages: string[];
  message: string;
  user: User;
  receiver: User;
  conversationID: string;

  constructor(private chatService: ChatService, private loginService: LoginService, private eventEmitter: ServerEventsEmitter) {
    this.messages = [];
  }

  ngOnInit() {

    this.loginService.user.subscribe(user => {
      if (user) {
        console.log('chatwindow user');
        console.log(user);
        this.user = user;
      }
    });

    this.eventEmitter.isReady.subscribe(isReady => {
      if (isReady) {
        this.eventEmitter.handleEmittedEvent('newMessage').subscribe(msg => {
          this.messages.push(msg);
        });
      }
    });

  }

  sendButtonClick() {
    if (this.message) {
      var messageObject = {
        senderID: this.user.userID,
        // receiverID: this.receiver.userID,
        content: this.message
      };
      this.eventEmitter.emitEvent({name: 'sendMessage', arguments: messageObject});
      this.message = '';
    }
  }
}
