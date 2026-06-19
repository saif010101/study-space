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

@Controller('/api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
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


}
