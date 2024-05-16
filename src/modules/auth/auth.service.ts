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
import { Staff } from '../staffs/entities/staff.entity';
import { CreateStaffDto } from '../staffs/dto/create-staff.dto';
import { loginStaffdto } from '../staffs/dto/login-staff.dto';

@Injectable()
export class authService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Staff.name) private staffModel: Model<Staff>,
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
  //-----staff service start-----
  async staffSignup(CreateStaffDto: CreateStaffDto) {
    try {
      const emailExist = await this.staffModel.findOne({
        email: CreateStaffDto.email,
      });
      const numberExist = await this.staffModel.findOne({
        contactNumber: CreateStaffDto.contactNumber,
      });
      if (emailExist || numberExist) {
        return new ConflictException('email or contact number already exist');
      }
      const staff = await this.staffModel.create(CreateStaffDto);
      if (!staff) return new InternalServerErrorException("can't create staff");
      return staff;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async staffLogin(loginStaffdto: loginStaffdto) {
    try {
      const staff = await this.staffModel.findOne({
        userName: loginStaffdto.userName,
        password: loginStaffdto.password,
      });
      if (!staff) {
        return new UnauthorizedException('username and pasword doesnot match');
      }
      const payload = loginStaffdto;
      return {
        access_token: await this.Jwtservice.signAsync(payload),
      };
    } catch (err) {}
  }
}
