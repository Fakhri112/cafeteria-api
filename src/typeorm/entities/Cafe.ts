import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Menu } from './Menu';
import { User } from './User';

@Entity({ name: 'cafes' })
export class Cafe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => User, (user) => user.cafes, { onDelete: 'SET NULL' })
  owner: User;

  @OneToMany(() => Menu, (menu) => menu.cafe)
  menus: Menu[];
}
