import {Component, OnInit} from '@angular/core';
import {Message} from '../../interfaces/message';
import {ServerEventEmitter} from '../../services/ServerEventEmitter';
import {User} from '../../interfaces/user';
import {ChatService} from '../../services/chat.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.css'],
})

export class ChatwindowComponent implements OnInit {

  messages: Message[];
  message: string;
  user: User;
  receiver: User;
  conversationID: string;
  socketID: string;

  constructor(private chatService: ChatService, private eventEmitter: ServerEventEmitter) {
    this.messages = [];
  }

  ngOnInit() {
    this.chatService.userSource.subscribe(user => {
      if (user) {
        this.user = user;
        this.initialEvents();

        this.chatService.newMessageSource.subscribe(message => {
          if(message && this.receiver){
            if(message.senderID === this.receiver._id){
              this.messages.push(message);
            }
          }
        });
      }
    });

    this.eventEmitter.handleEmittedEvent('receiveConversation').subscribe(messages => {
      if(messages.length == 0){
        this.messages = [];
      }else {
        messages.forEach(message => {
          if (message.receiverID == this.user._id) {
            message.class = 'received';
          }
          this.messages = messages;
        });
      }
    });


    this.chatService.receiverSource.subscribe(receiver => {
      if(receiver){
        this.receiver = receiver;
        this.eventEmitter.emitEvent({
          name:'getConversation',
       arguments: {user1: this.user._id, user2: this.receiver._id}
        });
      }
    });
  }

  initialEvents(){
    this.eventEmitter.isReady.subscribe(isReady => {

      if (isReady) {
        this.eventEmitter.handleEmittedEvent('receiveSocketID').subscribe(sockID => {
          this.socketID = sockID;
        });
      }

    });
  }

  sendButtonClick() {

    if (this.message) {
      var messageObject = {
        senderID: this.user._id,
        receiverID: this.receiver._id,
        conversationID: "",
        date: Date.now(),
        time: "",
        class: 'sent',
        read: false,
        content: this.message
      };

      this.chatService.sendMessage(messageObject);
      this.messages.push(messageObject);
      this.message = '';
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    // let window = document.getElementById('messaging-window');
  }
}
