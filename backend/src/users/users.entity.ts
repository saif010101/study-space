import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
