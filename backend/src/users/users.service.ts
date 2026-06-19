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
      display_name: createUserDto.display_name,
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

}
