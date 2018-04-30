import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-chatlistitem',
  templateUrl: './chatlistitem.component.html',
  styleUrls: ['./chatlistitem.component.css']
})
export class ChatlistitemComponent implements OnInit {

  friend: User;

  constructor() {
    // this.friend = friend;
  }

  ngOnInit() {}

  setFriend(friend: User){
    this.friend = friend;
  }

}
