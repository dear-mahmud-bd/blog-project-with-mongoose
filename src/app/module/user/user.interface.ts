import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export enum UserType {
  admin = 'admin',
  user = 'user',
}

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: UserType;
  isBlocked: boolean;
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isEmailExist(email: string): Promise<TUser>;
}

export type TUserRole = keyof typeof USER_ROLE;
