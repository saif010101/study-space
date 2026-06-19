import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.getUser(username);

    // if user does not exist
    if (!user) {
      throw new HttpException(
        'Username or password is Invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    // if password is incorrect
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        'Username or password is Invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.jwtService.signAsync({
      username: user.username,
      user_id: user.user_id,
    },);

  }
}
