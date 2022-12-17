import { Module } from '@nestjs/common';
import { DatabaseModule } from './user/infra/database.module';
import { HttpModule } from './user/http.module';

@Module({
  imports: [
    HttpModule, DatabaseModule
  ]
})
export class AppModule {}
