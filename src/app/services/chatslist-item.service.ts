import { Injectable } from '@angular/core';
import {ChatslistItemComponent} from '../components/chatlist-item/chatslist-item.component';
import {Message} from '../interfaces/message';
import {ChatService} from './chat.service';
import {User} from '../interfaces/user';

@Injectable()
export class ChatslistItemService {

  friendsListMap: Map<string, ChatslistItemComponent>;
  user: User;

  constructor(private chatService: ChatService) {
    this.friendsListMap = new Map<string, ChatslistItemComponent>();
    this.chatService.isReady.subscribe(ready =>{
      if(ready){
        this.chatService.userSource.subscribe(user =>{
          if(user){
            this.user = user;
          }
        });
      }
    });
  }

  registerToFriendsListMap(component: ChatslistItemComponent) {
    this.friendsListMap.set(component.user._id, component);
  }

  setChatlistItemNewMessage(message: Message){
    if(message.senderID == this.user._id){
        this.friendsListMap.get(message.receiverID).pushMessage(message);
      }else{
        this.friendsListMap.get(message.senderID).pushMessage(message);
      }
    }
}
