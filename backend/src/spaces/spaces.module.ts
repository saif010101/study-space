import { Module } from '@nestjs/common';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spaces } from './spaces.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spaces])],
  controllers: [SpacesController],
  providers: [SpacesService]
})
export class SpacesModule {}
