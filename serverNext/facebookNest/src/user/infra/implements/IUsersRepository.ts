import { ICreateUserDTO } from './../../DTOs/ICreateUserDTO';
import { User } from './../../entities/User';



export abstract class IUsersRepository {
  abstract create(data: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User>;
}