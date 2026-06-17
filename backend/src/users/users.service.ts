import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    await this.userRepository.save({
      username: createUserDto.username,
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      email: createUserDto.email,
      password: hashedPassword,
      profile_url: createUserDto.profile_url,
    });
  }

  async getUser(username: string) {
    return await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async validatePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async generateAccessToken(username: string) {
    // Generate a JWT access token for the user
    // You can use a library like jsonwebtoken to generate the token
    return this.jwtService.sign({ username });
  }
}
