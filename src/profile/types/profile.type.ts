/* eslint-disable prettier/prettier */
import { UserType } from 'src/types/user.type';

export type ProfileType = UserType & { following: boolean };
