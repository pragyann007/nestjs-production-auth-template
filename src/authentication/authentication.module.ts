import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import { JwtProvider } from './provider/jwt.provider';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, HashingProvider, BcryptProvider, JwtProvider],
})
export class AuthenticationModule {}
