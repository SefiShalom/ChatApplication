import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../interfaces/message';
import {ChatslistItemService} from '../../services/chatslist-item.service';
import {Friend} from '../../interfaces/friends';

@Component({
  selector: 'app-chatlist-item',
  templateUrl: './chatslist-item.component.html',
  styleUrls: ['./chatslist-item.component.css']
})
export class ChatslistItemComponent implements OnInit {

  @Input() user: Friend;
  private messages: Message[];
  private lastMessage: Message;
  private newMessageCount: number;

  constructor(private chatlistItemService: ChatslistItemService) {
    this.newMessageCount = 0;
  }

  ngOnInit() {
    console.log(this.user);
    // console.log('getting messages for: ');
    console.log(this.user.messages);
    console.log('building item');
    this.messages = this.user.messages;
    this.chatlistItemService.registerToFriendsListMap(this);
    this.setLastMessage(this.messages[this.messages.length - 1]);
  }

  setLastMessage(message: Message){
    this.lastMessage = message;
  }

  setMessages(messagesList: Message[]){
    this.messages = messagesList;
    this.setLastMessage(this.messages[this.messages.length - 1]);
  }

  incrementNewMessageCount(){
    this.newMessageCount++;
  }

  resetNewMessageCount(){
    this.newMessageCount = 0;
  }

}
