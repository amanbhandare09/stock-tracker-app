import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
   
    constructor(
    private userService: UserService,
    private jwtService: JwtService,

   ){}
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.validateAdmin(email, password);//call function to validate user
        if (user) {
          const { password, ...result } = user;
          console.log(password)
          return result;
        }
        return null;
      }

//call function to create token
    async login(user: any) {
        const payload = { email: user.email, role: user.role };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}




