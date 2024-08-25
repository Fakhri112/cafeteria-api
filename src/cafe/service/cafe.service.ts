import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cafe } from 'src/typeorm/entities/Cafe';
import { Repository } from 'typeorm';
import { CreateCafeDTO, UpdateCafeDTO } from '../dto/CafeDTO';

@Injectable()
export class CafeService {
  constructor(
    @InjectRepository(Cafe) private cafeRepository: Repository<Cafe>,
  ) {}

  async getCafe() {
    const datas = await this.cafeRepository.find({ relations: ['owner'] });
    datas.map((user) => {
      if (user.owner) delete user.owner.password;
    });
    return datas;
  }

  createCafe(cafeData: CreateCafeDTO) {
    const newData = this.cafeRepository.create(cafeData);
    return this.cafeRepository.save(newData);
  }
  async updateCafe(id: number, cafeData: UpdateCafeDTO) {
    const updateData = this.cafeRepository.create(cafeData);
    await this.cafeRepository.update({ id }, updateData);
    return 'Menu data has updated successfully';
  }
  async deleteCafe(id: number) {
    await this.cafeRepository.delete({ id });
    return 'Menu data has deleted successfully';
  }
}
