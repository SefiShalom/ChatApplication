import {Message} from './message';

export interface Friend {
  _id: string;
  name: string;
  lastName: string;
  nickname: string;
  profile_picture: string;
  messages: Message[];
}
