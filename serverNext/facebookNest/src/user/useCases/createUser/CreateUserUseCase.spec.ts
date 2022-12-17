import { UsersRepositoryInMemory } from './../../infra/prisma/repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';
import { makeUser } from './../../../../test/factories/CreateUser-factory';
import { AppError } from './../../../errors/AppError';
import { rejects } from 'assert';


let userRepository: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Create User", () => {
  beforeEach(() => {
    userRepository = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(
      userRepository
    )
  })

  it("should be able to create a user", async () => {
    await createUserUseCase.execute(makeUser())

    expect(userRepository.users).toHaveLength(1)
  })

  it("should not be able to create a user with exists email", async () => {
    
    const user = await createUserUseCase.execute({
      name: 'test',
      email: 'test@gmail.com',
      password: 'test',
    })

    expect(user).toBe(user)


    // const users = userRepository.users
    // const email = userRepository.findByEmail('test@gmail.com')
    // console.log('testeEEEEEEEEEEEEEEEEEEEEEEEEEE', email)

    // expect(async () => {
    //   return await createUserUseCase.execute({
    //     name: 'test',
    //     email: 'test@gmail.com',
    //     password: 'test',
    //   })
    // }).rejects.toBeInstanceOf(AppError)

  })

})