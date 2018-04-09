import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chatservice.service'


@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.css'],
  providers: [ChatService]
})

export class ChatwindowComponent implements OnInit {

  messages: string[];
  message: string;
  constructor(private chatService: ChatService) {
    this.messages = [];
  }

  ngOnInit() {
    this.chatService.onNewMessage().subscribe(msg => {
      this.messages.push(msg);
    });
  }

  sendButtonClick() {
    if(this.message) {
      this.chatService.sendMessage(this.message);
      // this.message = "";
    }
  }

}
