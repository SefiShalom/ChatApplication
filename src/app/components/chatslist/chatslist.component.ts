import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {ChatService} from '../../services/chat.service';
import {ChatslistItemService} from '../../services/chatslist-item.service';

@Component({
  selector: 'app-chatslist',
  templateUrl: './chatslist.component.html',
  styleUrls: ['./chatslist.component.css']
})
export class ChatslistComponent implements OnInit {

  user: User;
  friendsList: User[];
  tabNavigationIndex: number;
  serachResults: User[];
  keyword: string;

  constructor(private chatService: ChatService, private chatlistItemService: ChatslistItemService) {
      this.tabNavigationIndex = 0;
      this.friendsList = [];
  }

  ngOnInit() {
    this.chatService.isReady.subscribe(ready => {
      if (ready) {
        this.chatService.userSource.subscribe(user => {
          if (user) {
            this.user = user;
            this.chatService.getFriendsList(this.user._id).subscribe(list => {
              this.friendsList = list;
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
  }

  setCurrentReceiver(receiver) {
    this.chatService.setCurrentReceiver(receiver);
  }

  setTabNavigationView(number: number) {
    this.tabNavigationIndex = number;
  }

}
