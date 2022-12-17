import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { CreateUserUseCase } from './CreateUserUseCase';
import { ICreateUserDTO } from './../../DTOs/ICreateUserDTO';

@Controller("users")
export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}
  
  @Post("")
  async create(@Body() body: ICreateUserDTO) {
    const {name, email, password, gender} = body

    const user = await this.createUserUseCase.execute({
      name, email, password, gender
    })

    return user
    
  }

}