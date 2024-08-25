import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cafe } from './Cafe';
import { User } from './User';

@Entity({ name: 'menus' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  isRecommendation: boolean;

  @ManyToOne(() => Cafe, (cafe) => cafe.menus, { onDelete: 'SET NULL' })
  cafe: Cafe;

  @ManyToOne(() => User, (user) => user.menus, { onDelete: 'SET NULL' })
  manager: User;
}
