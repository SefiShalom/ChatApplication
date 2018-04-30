import {Component, OnInit} from '@angular/core';
import {Message} from '../../interfaces/message';
import {EventEmitter} from '../../services/EventEmitter';
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

  constructor(private chatService: ChatService, private eventEmitter: EventEmitter) {
    this.messages = [];
    // console.log('chat window chat service ID: ' + this.chatService.id);
  }

  ngOnInit() {
    this.chatService.userSource.subscribe(user => {
      if (user) {
        this.user = user;
        this.initialEvents();
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
      console.log('chatwindow receiver: ');
      if(receiver){
        this.receiver = receiver;
        this.eventEmitter.emitEvent({
          name:'getConversation',
       arguments: {user1: this.user._id, user2: this.receiver._id}});
      }
    });
  }

  initialEvents(){

    this.eventEmitter.isReady.subscribe(isReady => {

      if (isReady) {

        console.log('6. ChatwindowComponent: server emmiter is ready. initializing events.');

        this.eventEmitter.handleEmittedEvent('newMessage').subscribe(msg => {
          console.log(msg.senderID + ": " + msg.content);
          msg.class = 'received';
          console.log(msg);
          this.messages.push(msg);
        });

        this.eventEmitter.handleEmittedEvent('receiveSocketID').subscribe(sockID => {
          console.log("socketID received from the server: " + sockID);
          this.socketID = sockID;
        });

        // console.log('7. ChatwindowComponent: About to crash');
        // this.eventEmitter.emitEvent({name: 'getSocketID', arguments: {id: this.receiver.userID}});
      }

    });
  }


  sendButtonClick() {
    if (this.message) {
      var messageObject = {
        senderID: this.user._id,
        receiverID: this.receiver._id,
        conversationID: "",
        // date: null,
        // time: null,
        class: 'sent',
        content: this.message
      };

      console.log(this.user._id +": " + messageObject.content);
      this.eventEmitter.emitEvent({name: 'sendMessage', arguments: messageObject});
      this.messages.push(messageObject);
      this.message = '';
    }
  }
}
