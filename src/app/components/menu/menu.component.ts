import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  user: User;
  tabNavigationIndex: number;

  constructor(private chatService: ChatService) {
    this.tabNavigationIndex = 0;
  }

  ngOnInit() {
    this.chatService.isReady.subscribe(ready => {
      if (ready) {
        this.chatService.userSource.subscribe(user => {
          if (user) {
            this.user = user;
          }
        });
      }
    });
  }

  setTabNavigationView(number: number) {
    this.tabNavigationIndex = number;
  }

}
