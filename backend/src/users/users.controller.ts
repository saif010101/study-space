import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';


@Controller('/api/v1/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  private delay(ms : number) {
    return new Promise((resolve) => setTimeout(resolve,ms));
  }

  @Post('/register')
  async createUser(@Body() createUserDto: CreateUserDto) {

    // validate data with zod schema
    const { error } = this.usersService.validateUserInput(createUserDto)

    if (error) {
      throw new HttpException('Input is in invalid format.', HttpStatus.BAD_REQUEST);
    }

    // check if email is already in use
    const emailExists = await this.usersService.emailExists(createUserDto.email);

    if (emailExists) {
      throw new HttpException('Email already in use.', HttpStatus.BAD_REQUEST);
    }

    // Check if the user already exists in the database
    const usernameExists = await this.usersService.getUser(createUserDto.username);

    // If the user exists, return an error response
    if (usernameExists) {
      throw new HttpException('Username already taken.', HttpStatus.BAD_REQUEST);
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

  @Post('/get-user')
  async getUser(@Body('username') username: string) {

    await this.delay(2000);
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { user };
  }

}
