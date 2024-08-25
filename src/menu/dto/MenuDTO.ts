import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Cafe } from 'src/typeorm/entities/Cafe';
import { User } from 'src/typeorm/entities/User';

export class CreateMenuDTO {
  @ApiProperty({ default: 'Ramen Jawa' })
  @IsString()
  name: string;

  @ApiProperty({ default: 18000 })
  @IsNumber()
  price: number;

  @ApiProperty({ default: true })
  @IsBoolean()
  isRecommendation: boolean;

  @ApiProperty({ default: 1, description: 'Foreign Key to Cafe Id' })
  @IsOptional()
  cafe: Cafe;

  @ApiProperty({ default: 1, description: 'Foreign Key to User Id' })
  @IsOptional()
  manager: User;
}

export class UpdateMenuDTO {
  @ApiProperty({ default: 'Ramen Jawa' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ default: 18000 })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  isRecommendation: boolean;

  @ApiProperty({ default: 1, description: 'Foreign Key to Cafe Id' })
  @IsOptional()
  cafe: Cafe;

  @ApiProperty({ default: 1, description: 'Foreign Key to User Id' })
  @IsOptional()
  manager: User;
}
