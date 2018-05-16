import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../interfaces/message';
import {ChatslistItemService} from '../../services/chatslist-item.service';
import {Friend} from '../../interfaces/friends';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-chatlist-item',
  templateUrl: './chatslist-item.component.html',
  styleUrls: ['./chatslist-item.component.css']
})
export class ChatslistItemComponent implements OnInit {

  @Input() friend: Friend;
  // user: User;
  private messages: Message[];
  private lastMessage: Message;
  private newMessageCount: number;

  constructor(private chatlistItemService: ChatslistItemService) {
    this.newMessageCount = 0;
    // this.user = this.chatlistItemService.user;
  }

  ngOnInit() {
    this.messages = this.friend.messages;
    this.chatlistItemService.registerToFriendsListMap(this);
    this.setLastMessage(this.messages[this.messages.length - 1]);
  }

  setLastMessage(message: Message){
    if(message){
      if(message.senderID !== this.friend._id){
        message.sender_name = 'You: ';
      }
    }
    this.lastMessage = message;
  }
  setMessages(messagesList: Message[]){
    this.messages = messagesList;
    this.setLastMessage(this.messages[this.messages.length - 1]);
  }

  pushMessage(message: Message){
    this.messages.push(message);
    this.setLastMessage(message);
  }

  incrementNewMessageCount(){
    this.newMessageCount++;
  }

  resetNewMessageCount(){
    this.newMessageCount = 0;
  }

}
