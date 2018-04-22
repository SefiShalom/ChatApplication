import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';
import {ChatwindowComponent} from '../chatwindow/chatwindow.component';
import {ChatslistComponent} from '../chatslist/chatslist.component';
import {ServerEventsEmitter} from '../../services/serverEventsEmitter';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private user: User;
  private friendsList: User[];

  constructor(private eventEmitter: ServerEventsEmitter) {}

  ngOnInit() {
  }
}
