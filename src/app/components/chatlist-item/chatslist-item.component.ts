import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {Message} from '../../interfaces/message';
import {ChatslistItemService} from '../../services/chatslist-item.service';

@Component({
  selector: 'app-chatlist-item',
  templateUrl: './chatslist-item.component.html',
  styleUrls: ['./chatslist-item.component.css']
})
export class ChatslistItemComponent implements OnInit {

  @Input() user: User;
  private lastMessage: Message;
  private newMessageCount: number;

  constructor(private chatlistItemService: ChatslistItemService) {
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
