import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/typeorm/entities/User';

export class LoginUserDTO {
  @ApiProperty({ default: 'fakhri112' })
  username: string;
  @ApiProperty({ default: '12345678' })
  password: string;
}

export class RegisterUserDTO {
  @IsString()
  @ApiProperty({ default: 'fakhri112' })
  username: string;
  @IsString()
  @ApiProperty({ default: 'Fakhri Ali' })
  fullname: string;
  @IsString()
  @MinLength(8)
  @ApiProperty({ default: '12345678' })
  password: string;
  role: UserRole;
}

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  username: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'Muhammad Fakhri Ali' })
  fullname: string;
  @IsString()
  @IsOptional()
  @MinLength(8)
  @ApiProperty()
  password: string;
  role: UserRole;
}

export class UpdateUserRoleDTO {
  @ApiProperty({ default: 'superadmin' })
  @IsEnum(UserRole)
  role: UserRole;
}
