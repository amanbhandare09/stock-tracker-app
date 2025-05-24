import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
dotenv.config();
//mainly to convert params to token and vice versa
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY , // Replace with your secret
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findUser(payload.email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
