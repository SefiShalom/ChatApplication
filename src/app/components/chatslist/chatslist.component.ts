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

  constructor(private loginService: LoginService, private chatService: ChatService) {
    console.log('chat list chat service ID: ' + this.chatService.id);
    console.log('chat list login service ID: ' + this.loginService.id);
  }

  ngOnInit() {
    this.loginService.user.subscribe(user => {
      if(user) {
        this.user = user;
        console.log('4. ChatlistComponent: getting friends list from chatService');
        this.chatService.getFriendsList(user).subscribe(res => {
          this.friendsList = res;
          console.log(this.friendsList);
        });
      }
    });
  }

  setCurrentReceiver(receiver){
    console.log(this.chatService);
    // console.log(receiver);
    this.chatService.setCurrentReceiver(receiver);
  }

}
