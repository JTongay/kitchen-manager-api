import { IUser } from '@/models/User.model';
import { UserRequest } from '@/builders/request';

export interface IUsersController {
  addUser(userRequest: UserRequest): Promise<void>;
  getUsers(recipes?: boolean): Promise<IUser[]>;
  getUserByUsername(username: string): Promise<IUser>;
  getUserById(id: string): Promise<IUser>;
}
