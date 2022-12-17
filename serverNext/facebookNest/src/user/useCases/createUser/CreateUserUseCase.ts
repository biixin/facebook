import { ICreateUserDTO } from '../../DTOs/ICreateUserDTO';
import { User } from './../../entities/User';
import {hash} from 'bcrypt'
import { AppError } from './../../../errors/AppError';
import { Injectable } from '@nestjs/common';
import { UsersRepositoryPrisma } from './../../infra/prisma/repositories/UsersRepositoryPrisma';
import { IUsersRepository } from '../../../user/infra/implements/IUsersRepository';


@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute({name, email, password, gender}: ICreateUserDTO): Promise<User> {
    const passwordHash = await hash(password, 10)

    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if(userAlreadyExists) {
      throw new AppError("User Already Exists")
    }

    const user = new User()
    Object.assign(user, {
      name,
      email,
      password: passwordHash,
      gender: gender ? gender : 'male'
    })

    await this.usersRepository.create(user)

    return user
  }
}