import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('rooms')
export class RoomsController {

  constructor(private roomsService: RoomsService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getRooms(){
    return this.roomsService.getRooms();
  }

}
