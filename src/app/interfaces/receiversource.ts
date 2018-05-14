import {User} from './user';
import {Message} from './message';

export interface ReceiverSource {
  user: User;
  messages: Message[];
}
