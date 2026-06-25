import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [name, token] = request.headers['cookie']?.split('=') ?? undefined;
    return token;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

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