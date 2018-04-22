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

  constructor(private loginService: LoginService, private chatService: ChatService) {}

  ngOnInit() {
    this.loginService.user.subscribe(user => {
      if(user) {
        this.chatService.getFriendsList(user).subscribe(res => {
          console.log(res);
          this.user = user;
          this.friendsList = res;
        });
      }
    });
  }


}
