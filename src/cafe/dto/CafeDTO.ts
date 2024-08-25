import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';
import { User } from 'src/typeorm/entities/User';

export class CreateCafeDTO {
  @ApiProperty({ default: 'Maid Cafe' })
  @IsString()
  name: string;

  @ApiProperty({ default: 'Wonokromo, Surabaya' })
  @IsString()
  address: string;

  @ApiProperty({ default: '+628111111111' })
  @IsString()
  @Matches(/^\+62[0-9]{9,13}$/, { message: 'Invalid Indonesia Number Phone' })
  phoneNumber: string;

  @IsOptional()
  @ApiProperty({ default: '1', description: 'Foreign Key to User Id' })
  owner: User;
}

export class UpdateCafeDTO {
  @ApiProperty({ default: 'Maid Cafe' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ default: 'Wonokromo, Surabaya' })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ default: '+628111111111' })
  @IsString()
  @IsOptional()
  @Matches(/^\+62[0-9]{9,13}$/, { message: 'Invalid Indonesia Number Phone' })
  phoneNumber: string;

  @IsOptional()
  @ApiProperty({ default: '1', description: 'Foreign Key to User Id' })
  owner: User;
}
