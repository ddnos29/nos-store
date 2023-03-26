import { IUser } from '../models/user.model';

export type UserLogin = Pick<IUser, 'email' | 'password'>;
export type UserRegister = Pick<IUser, 'name' | 'email' | 'password' | 'phone' | 'address'>;
