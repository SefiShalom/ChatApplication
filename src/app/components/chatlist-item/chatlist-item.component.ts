import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {Message} from '../../interfaces/message';
import {ChatlistItemService} from '../../services/chatlist-item.service';

@Component({
  selector: 'app-chatlist-item',
  templateUrl: './chatlist-item.component.html',
  styleUrls: ['./chatlist-item.component.css']
})
export class ChatlistItemComponent implements OnInit {

  @Input() user: User;
  private lastMessage: Message;
  private newMessageCount: number;

  constructor(private chatlistItemService: ChatlistItemService) {
    this.lastMessage = null;
    this.newMessageCount = 0;
  }

  ngOnInit() {
    this.chatlistItemService.registerToFriendsListMap(this);
  }

  setLastMessage(message: Message){
    this.lastMessage = message;
  }

  incrementNewMessageCount(){
    this.newMessageCount++;
  }

  resetNewMessageCount(){
    this.newMessageCount = 0;
  }

}
