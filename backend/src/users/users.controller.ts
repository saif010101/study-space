import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('/api/v1/auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Check if the user already exists in the database
    const user = await this.usersService.getUser(createUserDto.username);

    // If the user exists, return an error response
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // If the user does not exist, create a new user in the database
    // Hash the password before saving it to the database
    await this.usersService.createUser(createUserDto);

    return {
      message: 'User created successfully',
      status: HttpStatus.CREATED,
      user: {
        username: createUserDto.username,
      },
    };
  }

  @Post('/signin')
  @HttpCode(200)
  async signInUser(@Body() loginUserDto: LoginUserDto) {
    // Check if the user exists in the database
    const user = await this.usersService.getUser(loginUserDto.username);

    // If the user does not exist, return an error response
    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await this.usersService.validatePassword(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const accessToken = await this.usersService.generateAccessToken(
      user.username,
    );

    return {
      message: 'User signin successful',
      status: HttpStatus.OK,
      accessToken,
    };
  }
}
