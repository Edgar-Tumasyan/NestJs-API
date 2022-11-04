/* eslint-disable prettier/prettier */
import { UserType } from './user.type';

export interface UserResonseInterface {
  user: UserType & { token: string };
}
