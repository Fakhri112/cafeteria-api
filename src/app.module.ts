import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { CafeModule } from './cafe/cafe.module';
import { dataSourceOption } from './typeorm/db';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOption),
    AuthModule,
    MenuModule,
    CafeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
