import { Module } from '@nestjs/common';
import { MenuController } from './controller/menu.controller';
import { MenuService } from './service/menu.service';
import { Menu } from 'src/typeorm/entities/Menu';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
