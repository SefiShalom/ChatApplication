import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {User} from '../../interfaces/user';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {ChatService} from '../../services/chat.service';
import {ChatlistitemComponent} from '../chatlistitem/chatlistitem.component';

@Component({
  selector: 'app-chatslist',
  templateUrl: './chatslist.component.html',
  styleUrls: ['./chatslist.component.css']
})
export class ChatslistComponent implements OnInit {

  user: User;
  // friendsList: ChatlistitemComponent[];
  friendsList: User[];

  constructor(private chatService: ChatService) {
      this.friendsList = [];
  }

  ngOnInit() {
    this.chatService.isReady.subscribe(ready => {
      console.log('Chatlist OnInit');
      if (ready) {
        console.log('Chat service is ready');
        this.chatService.userSource.subscribe(user => {
          if (user) {
            this.user = user;
            this.chatService.getFriendsList(this.user._id).subscribe(list => {
              console.log('From chatlist get friends list');
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

}
