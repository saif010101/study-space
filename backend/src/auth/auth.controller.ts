import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import type {Response} from 'express';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto, @Res({passthrough: true}) res: Response) {
    const token = await this.authService.login(
      loginUserDto.username,
      loginUserDto.password,
    );

    res.cookie('token', token,{
      httpOnly: true,
      secure: false,
    });

    return {
      message: 'User logged in successfully',
      status: HttpStatus.OK,
    }
  }
}
