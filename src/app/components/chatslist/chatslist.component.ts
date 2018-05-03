import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {ChatService} from '../../services/chat.service';
import {ChatlistitemComponent} from '../chatlistitem/chatlistitem.component';



@Component({
  selector: 'app-chatslist',
  templateUrl: './chatslist.component.html',
  styleUrls: ['./chatslist.component.css']
})
export class ChatslistComponent implements OnInit {

  user: User;
  friendsList: User[];
  friendsListMap: ChatlistitemComponent[];
  tabNavigationIndex: number;

  constructor(private chatService: ChatService) {
      this.friendsList = [];
      this.tabNavigationIndex = 0;
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
