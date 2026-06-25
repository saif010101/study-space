import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rooms } from '../rooms/rooms.entity';
import { Users } from '../users/users.entity';

@Entity()
export class Spaces {
  @PrimaryGeneratedColumn()
  space_id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @OneToMany(() => Rooms, (room) => room.space)
  room: Rooms[];

  @ManyToOne(() => Users, (user) => user.spaces)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}