import { CreateUserController } from './useCases/createUser/CreateUserController';
import { DatabaseModule } from './infra/database.module';
import { CreateUserUseCase } from './useCases/createUser/CreateUserUseCase';
import { Module } from '@nestjs/common'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers: [
    CreateUserUseCase
  ]
  
})

export class HttpModule {}
