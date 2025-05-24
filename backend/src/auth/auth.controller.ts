import { Controller, Post, Body,HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get, UseGuards } from '@nestjs/common';
import { AdminRoleGuard } from './roles.guard'; // Import your guard
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);//check if user is valid
    if (!user || !body.email) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user);
  }

  @Get('test')
  @UseGuards(AdminRoleGuard) // Ensure that the guard is applied properly
  async test(): Promise<string> {
    return 'Test route';
  }

  

  // @Post('signup')
  // async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
  //  if (!createUserDto.email) {
  //     throw new HttpException('Invalid body credentials', HttpStatus.UNAUTHORIZED);
  //   }
  //   return this.userService.createUser(createUserDto);
  // }
}



