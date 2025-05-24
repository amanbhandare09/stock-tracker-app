import { Injectable, ExecutionContext, CanActivate,ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!requiredRoles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     return requiredRoles.includes(user.role);
//   }
// }


@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new ForbiddenException('No token provided');
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new ForbiddenException('Invalid token format');
    }

    try {
      const payload = this.jwtService.verify(token, { secret: process.env.SECRET_KEY }); // Replace with your actual secret
      if (payload.role !== 'admin') {
        throw new ForbiddenException('Insufficient permissions');
      }

      request.user = payload; // Attach payload to the request for further use
      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}

