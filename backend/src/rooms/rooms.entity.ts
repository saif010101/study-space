import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Spaces } from '../spaces/spaces.entity';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  room_id: number;

  @Column({
    type: 'varchar',
    length: 20,
  })
  name: string;

  @ManyToOne(() => Spaces, (space) => space.room)
  @JoinColumn({name: 'space_id'})
  space: Spaces;
}