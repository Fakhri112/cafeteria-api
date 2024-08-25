import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cafe } from './Cafe';
import { Menu } from './Menu';

export enum UserRole {
  SUPERADMIN = 'superadmin',
  OWNER = 'owner',
  MANAGER = 'manager',
  USER = 'user',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  fullname: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['superadmin', 'owner', 'manager', 'user'],
    default: 'user',
  })
  role: UserRole;

  @OneToMany(() => Cafe, (cafe) => cafe.owner)
  cafes: Cafe[];

  @OneToMany(() => Menu, (menu) => menu.manager)
  menus: Menu[];
}
