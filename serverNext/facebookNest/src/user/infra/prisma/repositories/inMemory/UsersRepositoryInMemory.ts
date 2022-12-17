
import { ICreateUserDTO } from 'src/user/DTOs/ICreateUserDTO';
import { IUsersRepository } from '../../../implements/IUsersRepository';
import { User } from './../../../../entities/User';


export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create(data: ICreateUserDTO): Promise<void> {
    this.users.push(data)
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }

}