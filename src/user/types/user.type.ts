/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/user/user.entity';

export type UserType = Omit<UserEntity, 'hashPassword'>;
