import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { SpacesModule } from './spaces/spaces.module';
import { Rooms } from './rooms/rooms.entity';
import { Spaces } from './spaces/spaces.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.19.0.2',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'test',
      entities: [Users,Rooms,Spaces],
      synchronize: true,
    }),
    AuthModule,
    RoomsModule,
    SpacesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
