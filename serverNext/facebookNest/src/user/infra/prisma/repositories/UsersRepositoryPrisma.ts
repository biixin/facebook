
import { ICreateUserDTO } from 'src/user/DTOs/ICreateUserDTO';
import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './../../implements/IUsersRepository';
import { PrismaService } from './../prisma.service';
import { User } from './../../../entities/User';
import { PrismaUserMapper } from './../mappers/UserMapperPrisma';

@Injectable()
export class UsersRepositoryPrisma implements IUsersRepository {
  constructor(
    private prisma: PrismaService
  ) {}
  
  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)
    
    await this.prisma.user.create({
      data: raw
    })
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }
  
}