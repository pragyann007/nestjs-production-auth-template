import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FinUserProvider } from './provider/find-user.provider';
import { JwProvider } from './provider/jw.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FinUserProvider, JwProvider],
})
export class UsersModule { }
