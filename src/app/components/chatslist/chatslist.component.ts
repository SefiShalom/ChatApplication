import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {User} from '../../interfaces/user';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import {ChatService} from '../../services/chat.service';
@Component({
  selector: 'app-chatslist',
  templateUrl: './chatslist.component.html',
  styleUrls: ['./chatslist.component.css']
})
export class ChatslistComponent implements OnInit{

  // private headerNickname: string;
  // private headerProfileImage: string;

  user: User;
  friendsList: User[];

  constructor(private chatService: ChatService) {

  }

  ngOnInit() {
    this.chatService.isReady.subscribe(ready => {
      if(ready){
        this.chatService.userSource.subscribe(user => {
          if(user){
            this.user = user;
            this.chatService.getFriendsList(this.user.userID).subscribe(list => {
              this.friendsList = list;
            });
          }
        });
      }
    });
  }

  setCurrentReceiver(receiver){
    this.chatService.setCurrentReceiver(receiver);
  }

}
