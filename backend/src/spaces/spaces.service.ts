import { Injectable } from '@nestjs/common';
import { Spaces } from './spaces.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaceDto } from './dtos/create-space.dto';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Spaces) private spacesRepository: Repository<Spaces>,
  ) {}

  async createSpace(user_id : number, createSpaceDto : CreateSpaceDto)  {
    return this.spacesRepository.save({
      name: createSpaceDto.name,
      user: {
        user_id: user_id
      }
    });
  }
  async getSpaces(user_id : number) {
    return this.spacesRepository.find({
      select: {
        space_id: true,
        name: true
      },
      where: {
        user: {
          user_id: user_id
        }
      }
    });
  }
}
