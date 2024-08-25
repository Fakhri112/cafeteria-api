import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CafeService } from '../service/cafe.service';
import { CreateCafeDTO, UpdateCafeDTO } from '../dto/CafeDTO';
import { jwtGuard } from 'src/auth/guard/jwt.guard';
import { RolesEnum } from 'src/auth/roles/roles.enum';
import { Role } from 'src/auth/roles/role.decorator';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT Access Token')
@ApiTags('Cafe')
@Role(RolesEnum.OWNER, RolesEnum.SUPERADMIN)
@UseGuards(jwtGuard, RolesGuard)
@Controller('cafe')
export class CafeController {
  constructor(private cafeService: CafeService) {}

  @ApiOperation({
    summary: 'Get All Cafe Data',
    description:
      'This will retrieve all cafe data. (Superadmin and Owner only)',
  })
  @Get()
  getCafe() {
    return this.cafeService.getCafe();
  }

  @ApiOperation({
    summary: 'Create New Cafe',
    description: 'This will create new cafe data. (Superadmin and Owner only)',
  })
  @Post()
  createCafe(@Body() cafeData: CreateCafeDTO) {
    return this.cafeService.createCafe(cafeData);
  }

  @ApiOperation({
    summary: 'Update Cafe Data',
    description:
      'This will update cafe data with given id. (Superadmin and Owner only)',
  })
  @Patch(':id')
  updateCafe(
    @Param('id', ParseIntPipe) id: number,
    @Body() cafeData: UpdateCafeDTO,
  ) {
    return this.cafeService.updateCafe(id, cafeData);
  }

  @ApiOperation({
    summary: 'Delete Cafe Data',
    description:
      'This will delete cafe data with given id. (Superadmin and Owner only)',
  })
  @Delete(':id')
  deleteCafe(@Param('id', ParseIntPipe) id: number) {
    return this.cafeService.deleteCafe(id);
  }
}
