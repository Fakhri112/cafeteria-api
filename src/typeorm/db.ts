import { DataSourceOptions } from 'typeorm';
import { User } from './entities/User';
import { Menu } from './entities/Menu';
import { Cafe } from './entities/Cafe';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const dataSourceOption: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  migrations: ['../migration/*.ts'],
  entities: [User, Menu, Cafe],
};
