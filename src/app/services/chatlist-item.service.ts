import { Injectable } from '@angular/core';
import {ChatlistItemComponent} from '../components/chatlist-item/chatlist-item.component';
import {Message} from '../interfaces/message';

@Injectable()
export class ChatlistItemService {

  friendsListMap: Map<string, ChatlistItemComponent>;

  constructor() {
    this.friendsListMap = new Map<string, ChatlistItemComponent>();
  }

  registerToFriendsListMap(component: ChatlistItemComponent) {
    this.friendsListMap.set(component.user._id, component);
  }

  setChatlistItemNewMessage(message: Message){
    this.friendsListMap.get(message.senderID).setLastMessage(message);
  }

}
