import { Module } from '@nestjs/common';
import { CafeService } from './service/cafe.service';
import { CafeController } from './controller/cafe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafe } from 'src/typeorm/entities/Cafe';
import { jwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Cafe])],
  providers: [CafeService, jwtStrategy],
  controllers: [CafeController],
})
export class CafeModule {}
