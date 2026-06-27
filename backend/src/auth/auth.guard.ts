import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {Request} from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['token'];

    if (!token) {
      return false;
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      request['user_id'] = decoded.user_id;
      return true;
    } catch (error) {
        console.log(error);
      return false;
    }
  }
}