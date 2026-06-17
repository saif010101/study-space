import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn({
    type: 'varchar',
    length: 16,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  last_name: string;

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
