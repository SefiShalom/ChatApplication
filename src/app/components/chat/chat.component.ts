import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';
// import {ChatwindowComponent} from '../chatwindow/chatwindow.component';
// import {ChatslistComponent} from '../chatslist/chatslist.component';
import {ServerEventEmitter} from '../../services/ServerEventEmitter';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }

}
