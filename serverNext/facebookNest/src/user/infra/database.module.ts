
import {Module} from "@nestjs/common"
import { IUsersRepository } from "./implements/IUsersRepository";
import { PrismaService } from './prisma/prisma.service';
import { UsersRepositoryPrisma } from './prisma/repositories/UsersRepositoryPrisma';

@Module({
  providers: [PrismaService,
    {
      provide: IUsersRepository,
      useClass: UsersRepositoryPrisma
    }
  ],
  exports: [IUsersRepository]
})
export class DatabaseModule {}