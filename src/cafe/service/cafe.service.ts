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
    console.log(newData);
    return this.cafeRepository.save(newData);
  }
  updateCafe(id: number, cafeData: UpdateCafeDTO) {
    const updateData = this.cafeRepository.create(cafeData);
    return this.cafeRepository.update({ id }, updateData);
  }
  deleteCafe(id: number) {
    return this.cafeRepository.delete({ id });
  }
}
