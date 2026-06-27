import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateSpaceDto } from './dtos/create-space.dto';

interface NewResponse extends Response {
  user_id: number;
}

@Controller('spaces')
export class SpacesController {
  constructor(private spacesServices: SpacesService) {}



  @UseGuards(AuthGuard)
  @Get('/')
  async getSpaces(@Req() req: NewResponse) {
    return this.spacesServices.getSpaces(req.user_id);
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async createSpace(
    @Req() req: NewResponse,
    @Body() createSpaceDto: CreateSpaceDto,
  ) {

    // if user tries to create a space with empty name, throw an error
    if (createSpaceDto.name.trim().length === 0) {
      throw new HttpException('Space name is required', HttpStatus.BAD_REQUEST);
    }

    // if user tries to create a space with length greater than 50
    if (createSpaceDto.name.trim().length > 50) {
      throw new HttpException(
        'Space name cannot exceed 50 characters.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.spacesServices.createSpace(req.user_id, createSpaceDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/:space_id')
  async editSpace(
    @Body() createSpaceDto: CreateSpaceDto,
    @Param('space_id') space_id: string
  ) {

    const parsedSpaceId = parseInt(space_id, 10);

    if (!parsedSpaceId ) {
      throw new HttpException('Space ID is not in a valid format.', HttpStatus.BAD_REQUEST);
    }
    // if user tries to create a space with empty name, throw an error
    if (createSpaceDto.name.trim().length === 0) {
      throw new HttpException('Space name is required', HttpStatus.BAD_REQUEST);
    }

    // if user tries to create a space with length greater than 50
    if (createSpaceDto.name.trim().length > 50) {
      throw new HttpException(
        'Space name cannot exceed 50 characters.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.spacesServices.editSpace(parsedSpaceId,createSpaceDto);
  }

}
