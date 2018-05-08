import {User} from './user';
import {Message} from './message';

export interface ChatslistItemObject {
  user: User;
  messages: Message[];
}
