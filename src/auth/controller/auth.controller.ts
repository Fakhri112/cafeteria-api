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
import { AuthService } from '../service/auth.service';
import { LocalGuard } from '../guard/local.guard';
import {
  LoginUserDTO,
  RegisterUserDTO,
  UpdateUserDTO,
  UpdateUserRoleDTO,
} from '../dto/AuthDTO';
import { jwtGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/role.guard';
import { Role } from '../roles/role.decorator';
import { RolesEnum } from '../roles/roles.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth('JWT Access Token')
  @ApiOperation({
    summary: 'Get All User Data',
    description: 'This will retrieve all user data. (Superadmin only)',
  })
  @Role(RolesEnum.SUPERADMIN)
  @UseGuards(jwtGuard, RolesGuard)
  @Get()
  getUser() {
    return this.authService.getAllUser();
  }

  @ApiOperation({
    summary: 'Register User',
    description: 'This will create new user with standart role (User)',
  })
  @Post('register')
  registerUser(@Body() registerUser: RegisterUserDTO) {
    return this.authService.registerUser(registerUser);
  }

  @ApiOperation({
    summary: 'User Login',
    description: 'Authenticate User',
  })
  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Body() loginUser: LoginUserDTO) {
    return this.authService.loginUser(loginUser);
  }

  @ApiBearerAuth('JWT Access Token')
  @ApiOperation({
    summary: 'Update User Data',
    description:
      'This will update user data. Only valid when the parameter id match with logged user id (Superadmin is able to change any user data). Role is not editable in here.',
  })
  @Patch('update/:id')
  @UseGuards(jwtGuard, RolesGuard)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserData: UpdateUserDTO,
    @Req() req: Request,
  ) {
    return this.authService.updateUserData(id, updateUserData, req);
  }

  @ApiBearerAuth('JWT Access Token')
  @ApiOperation({
    summary: 'Update User Role',
    description: 'This will update user role with given id. (Superadmin Only)',
  })
  @Role(RolesEnum.SUPERADMIN)
  @UseGuards(jwtGuard, RolesGuard)
  @Patch('update/role/:id')
  updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserData: UpdateUserRoleDTO,
  ) {
    return this.authService.updateUserRole(id, updateUserData);
  }

  @ApiBearerAuth('JWT Access Token')
  @ApiOperation({
    summary: 'Delete User data',
    description:
      'This will delete user data with given id. Only valid when the parameter id match with logged user id (Superadmin is able to delete any user data)',
  })
  @UseGuards(jwtGuard, RolesGuard)
  @Delete('delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.authService.deleteUser(id, req);
  }
}
