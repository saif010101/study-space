import { Injectable } from '@nestjs/common';
import { Rooms } from './rooms.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Rooms) private roomsRepository: Repository<Rooms>) {}

  async getRooms() {
    return await this.roomsRepository.find();
  }
}
