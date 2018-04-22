import {User} from './user';

export interface LoginResponse{
  login: boolean,
  user: User;
}
