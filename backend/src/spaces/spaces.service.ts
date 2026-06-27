import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      },
      order: {
        space_id: 'ASC'
      }
    });
  }


  async findSpaceById(space_id : number) {
    return this.spacesRepository.findOne({
      where: {
        space_id: space_id
      }
    });
  }

  async editSpace(space_id : number, createSpaceDto : CreateSpaceDto) {
    const space = await this.findSpaceById(space_id);
    if (!space) {
      throw new HttpException('Space not found', HttpStatus.NOT_FOUND);
    }
    space.name = createSpaceDto.name;
    return this.spacesRepository.save(space);
  }
}
