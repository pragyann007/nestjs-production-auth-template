import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDTO } from './dto/register.dto';
import type { Response } from 'express';
import { LoginDTO } from './dto/login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post("register")
  async register(@Res({passthrough:true}) response:Response,@Body() registerDTO:RegisterDTO) {
    const tokens =  await this.authenticationService.register(registerDTO);
    response.cookie("refresh-token",tokens.refreshToken);

    return {accessToken:tokens.acessToken}
  }

  @Post("login")
  async login(@Res({passthrough:true

  }) response:Response,@Body() loginDTO:LoginDTO){
    const tokens =  await this.authenticationService.login(loginDTO);
    response.cookie("refresh-token",tokens.refreshToken,{httpOnly:true,sameSite:"strict"});

    return {accessToken:tokens.acessToken}

  }
}
