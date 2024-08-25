import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/typeorm/entities/Menu';
import { Repository } from 'typeorm';
import { CreateMenuDTO, UpdateMenuDTO } from '../dto/MenuDTO';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
  ) {}

  getMenu(request: any) {
    return this.menuRepository.find(
      request.user.role == 'user' ? {} : { relations: ['cafe', 'manager'] },
    );
  }

  createMenu(menuData: CreateMenuDTO) {
    const newData = this.menuRepository.create(menuData);
    return this.menuRepository.save(newData);
  }
  async updateMenu(id: number, menuData: UpdateMenuDTO) {
    const updateData = this.menuRepository.create(menuData);
    await this.menuRepository.update({ id }, updateData);
    return 'Menu data has updated successfully';
  }
  async deleteMenu(id: number) {
    await this.menuRepository.delete({ id });
    return 'Menu data has deleted successfully';
  }
}
