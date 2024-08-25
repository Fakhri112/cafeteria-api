import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from '../service/menu.service';
import { CreateMenuDTO, UpdateMenuDTO } from '../dto/MenuDTO';
import { jwtGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/roles/role.decorator';
import { RolesEnum } from 'src/auth/roles/roles.enum';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT Access Token')
@ApiTags('Menu')
@Role(RolesEnum.MANAGER, RolesEnum.SUPERADMIN)
@UseGuards(jwtGuard, RolesGuard)
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @ApiOperation({
    summary: 'Get All Menu Data',
    description:
      'This will retrieve all user data. (Superadmin, Manager, and User Only)',
  })
  @Role(RolesEnum.MANAGER, RolesEnum.SUPERADMIN, RolesEnum.USER)
  @UseGuards(jwtGuard, RolesGuard)
  @Get()
  getMenu(@Req() req: Request) {
    return this.menuService.getMenu(req);
  }

  @ApiOperation({
    summary: 'Create New Menu',
    description:
      'This will create new menu data. (Superadmin and Manager only)',
  })
  @Post()
  createMenu(@Body() menuData: CreateMenuDTO) {
    return this.menuService.createMenu(menuData);
  }

  @ApiOperation({
    summary: 'Update Menu Data',
    description:
      'This will update menu data with given id. (Superadmin and Manager only)',
  })
  @Patch(':id')
  updateMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() menuData: UpdateMenuDTO,
  ) {
    return this.menuService.updateMenu(id, menuData);
  }

  @ApiOperation({
    summary: 'Delete Menu Data',
    description:
      'This will delete menu data with given id. (Superadmin and Manager only)',
  })
  @Delete(':id')
  deleteMenu(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.deleteMenu(id);
  }
}
