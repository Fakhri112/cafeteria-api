import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  LoginUserDTO,
  RegisterUserDTO,
  UpdateUserDTO,
  UpdateUserRoleDTO,
} from '../dto/AuthDTO';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  getAllUser() {
    return this.userRepository.find({
      select: ['id', 'username', 'fullname', 'role'],
    });
  }

  async registerUser(registerUserData: RegisterUserDTO) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerUserData.password, salt);
    registerUserData.password = hashedPassword;
    const { role, ...userData } = registerUserData;
    const newdata = this.userRepository.create(userData);
    const save = await this.userRepository.save(newdata);
    if (!save)
      throw new HttpException('Forbidden', HttpStatus.INTERNAL_SERVER_ERROR);
    return 'Success, please login to your account';
  }

  async loginUser(loginUserData: LoginUserDTO) {
    const getUserData = await this.userRepository.findOne({
      where: { username: loginUserData.username },
    });
    if (!getUserData) return false;
    const passwordCompare = await bcrypt.compare(
      loginUserData.password,
      getUserData.password,
    );
    if (!passwordCompare) return false;
    const { password, cafes, menus, ...user } = getUserData;
    return this.jwtService.sign(user);
  }

  async updateUserData(
    id: number,
    updateUserData: UpdateUserDTO,
    request: any,
  ) {
    if (id != request.user.id && request.user.role != 'superadmin')
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    request.user.role == 'user';
    if (updateUserData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updateUserData.password, salt);
      updateUserData.password = hashedPassword;
    }
    const { role, ...userData } = updateUserData;
    const updateData = this.userRepository.create(userData);
    await this.userRepository.update({ id: id }, updateData);
    return 'User Data has updated successfully';
  }

  async updateUserRole(id: number, role: UpdateUserRoleDTO) {
    const updateRole = this.userRepository.create(role);
    await this.userRepository.update({ id: id }, updateRole);
    return 'Role has updated successfully';
  }

  async deleteUser(id: number, request: any) {
    if (id != request.user.id && request.user.role != 'superadmin')
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    await this.userRepository.delete({ id: id });
    return 'User has deleted successfully';
  }
}
