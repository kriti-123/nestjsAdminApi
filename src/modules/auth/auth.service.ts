import {
  Body,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from '../admin/DTO/createAdmin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../admin/Entities/admin.entity';
import { Model } from 'mongoose';
import { error } from 'console';
import { AdminLogin } from '../admin/DTO/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class authService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private Jwtservice: JwtService,
  ) {}
  async signup(createDto: CreateAdminDto) {
    try {
      const emailExist = await this.adminModel.findOne({
        email: createDto.email,
      });
      const numberExist = await this.adminModel.findOne({
        contactNumber: createDto.contactNumber,
      });
      if (emailExist || numberExist) {
        return new ConflictException('email or contact number already exist');
      }
      const admin = await this.adminModel.create(createDto);
      if (!admin) return new InternalServerErrorException("can't create admin");
      return admin;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async signin(loginDto: AdminLogin) {
    try {
      const admin = await this.adminModel.findOne({
        userName: loginDto.userName,
        password: loginDto.password,
      });
      if (!admin) {
        return new UnauthorizedException('username and pasword doesnot match');
      }
      const payload = loginDto;
      return {
        access_token: await this.Jwtservice.signAsync(payload),
      };
    } catch (err) {}
  }
}
