import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {ChatService} from '../../services/chat.service';
import {ChatslistItemService} from '../../services/chatslist-item.service';
import {ReceiverSource} from '../../interfaces/receiversource';
import {ChatslistItemComponent} from '../chatlist-item/chatslist-item.component';
import {Friend} from '../../interfaces/friends';

@Component({
  selector: 'app-chatslist',
  templateUrl: './chatslist.component.html',
  styleUrls: ['./chatslist.component.css']
})
export class ChatslistComponent implements OnInit {

  user: User;
  friendsList: Friend[];
  loadingList: boolean;


  constructor(private chatService: ChatService, private chatlistItemService: ChatslistItemService) {
      this.friendsList = [];
      this.loadingList = true;
  }

  ngOnInit() {
    this.chatService.isReady.subscribe(ready => {
      if (ready) {
        this.chatService.userSource.subscribe(user => {
          if (user) {
            this.user = user;
            this.chatService.friendsListSource.subscribe(list => {
              if(list){
                this.friendsList = list;
                this.loadingList = false;
              }
            });
            this.chatService.newMessageSource.subscribe(message => {
              if(message){
                this.chatlistItemService.setChatlistItemNewMessage(message);
              }
            });
          }
        });
      }
    });

    this.chatService.getFriendsList(this.user._id);
  }

  setCurrentReceiver(receiver) {
    this.chatService.setCurrentReceiver(receiver);
  }

}
