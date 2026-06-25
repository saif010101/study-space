import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Spaces } from '../spaces/spaces.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    type: 'varchar',
    length: 16,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  display_name: string;

  @Column({
    type: 'varchar',
    length: 30,
    unique: true
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  profile_url: string;

  @OneToMany(() => Spaces, (space) => space.user)
  spaces: Spaces[];
}
