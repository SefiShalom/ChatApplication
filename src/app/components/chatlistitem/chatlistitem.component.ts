import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {ChatService} from '../../services/chat.service';
import {Message} from '../../interfaces/message';
import {ChatlistItemService} from '../../services/chatlistitem.service';
import {ChatlistItemDirective} from '../../chatlist-item-directive.directive';
import {EventEmitter} from '../../services/EventEmitter';

@Component({
  selector: 'app-chatlistitem',
  templateUrl: './chatlistitem.component.html',
  styleUrls: ['./chatlistitem.component.css']
})
export class ChatlistitemComponent implements OnInit {

  @Input() friend: User;
  lastMessage: Message;
  newMessagesCount: number;

  constructor(private eventEmitter: EventEmitter) {
    this.newMessagesCount = 1;
    this.lastMessage = {
      conversationID: "",
      senderID: "",
      receiverID: "",
      date: "02/05/2018",
      time: "",
      class: 'sent',
    content: "Hi whats up?"
    }
  }

  ngOnInit() {
    this.eventEmitter.handleEmittedEvent('newMessage').subscribe(message => {
      if(message.receiverID == this.friend._id){
        console.log('new message received');
        this.setLastMessage(message);
      }
    });
  }

  setLastMessage(message: Message){
    console.log('set last message was called');
    console.log(message);
    this.lastMessage = message;
    this.setNewMessageCounter(1);
  }

  setNewMessageCounter(counter: number){
    this.newMessagesCount = counter;
  }

}
