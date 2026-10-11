import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from "@nestjs/jwt"
import { User } from 'src/users/entities/user.entity';
import { ITokenUser } from '../interfaces/user-tokengen-interface';

@Injectable()
export class JwtProvider {
    constructor(
        private readonly configService:ConfigService,
        private readonly jwtService:JwtService
    ){}

    public async signToken<T>(userId:string,exp:string,payload?:T){

        const token = this.jwtService.sign({
            sub:userId,
            ...payload
        },{
            secret:this.configService.get<string>("JWT_SECRET"),
            expiresIn:Number(exp)
        })

        return token;

    }

    public async generateTokens(user:User|ITokenUser){
        const [acessToken,refreshToken] =await  Promise.all(
            [
                 this.signToken(user.id,this.configService.getOrThrow("JWT_ACCESS_TOKEN_TTL"),{email:user.email}),
                 this.signToken(user.id,this.configService.getOrThrow("JWT_REFRESH_TOKEN_TTL")),
            ]
        )

        return {acessToken,refreshToken};
    }
}
