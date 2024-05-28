import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '../auth/auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './Entities/admin.entity';
import { Role } from '../staffs/entities/staff.entity';
import { Model } from 'mongoose';
import { ValidationError } from 'class-validator';
import { adminService } from './admin.service';
import { CreateAdminDto } from './DTO/createAdmin.dto';
import { AdminLogin } from './DTO/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateAdminDto } from './DTO/updateDto.dto';
@Controller('admin')
export class adminController {
  constructor(
    private adminService: adminService,
    private JwtService: JwtService,
  ) {}
  @Post('signup')
  async signup(@Body() createDto: CreateAdminDto) {
    try {
      const { email, password } = createDto;
      const existedemail = await this.adminService.findOne({ email });
      const { contactNumber } = createDto;
      const existedphno = await this.adminService.findOne({ contactNumber });
      console.log(existedemail, existedphno);
      if (existedemail !== null && existedphno !== null) {
        return 'user already existed';
      }
      const salt = 10;
      const hashed = await bcrypt.hash(createDto.password, salt);
      createDto.password = hashed;
      return this.adminService.create(createDto);
    } catch (err) {}
  }
  @Post('login')
  async login(@Body() loginDto: AdminLogin) {
    try {
      const { userName, password } = loginDto;
      const admin = await this.adminService.findOne({ userName });
      // console.log(admin);
      if (!admin) return 'user not found';
      const isValidPassword = await bcrypt.compare(password, admin.password);
      console.log(isValidPassword);
      if (!isValidPassword)
        return new UnauthorizedException(
          'username and password are not matched',
        );
      const payload = loginDto;

      return { accessToken: await this.JwtService.signAsync(payload) };
    } catch (err) {}
  }
  @Get('profile/:id')
  @UseGuards(AuthGuard)
  async profile(@Param('id') id: string) {
    return await this.adminService.get(id);
  }
  @Put('update/:id')
  async update(
    @Body() UpdateAdminDto: UpdateAdminDto,
    @Param('id') id: string,
  ) {
    try {
      return await this.adminService.update(UpdateAdminDto, id);
    } catch (err) {}
  }
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      return await this.adminService.delete(id);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
  @Get('getProfile/:id')
  async get(@Param('id') id: string) {
    try {
      return await this.adminService.get(id);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
  // @UseGuards(AuthGuard)
  @Get('staff/getStaff/:id')
  async getStaff(@Param('id') id: string) {
    return await this.adminService.getProfileStaff(id);
  }
  // @UseGuards(AuthGuard)
  @Delete('staff/removestaff/:id')
  async removestaff(@Param('id') id: string) {
    return await this.adminService.removeStaff(id);
  }
  // @UseGuards(AuthGuard)
  @Put('staff/updateRole/:id')
  async updateRole(@Param('id') id: string, @Body() roles: Role[]) {
    return await this.adminService.updateRole(id, roles);
  }
  // @UseGuards(AuthGuard)
  @Put('staff/updateStatus/:id')
  async togglestatus(@Param('id') id: string) {
    return await this.adminService.toggleStaffActivation(id);
  }
  // @UseGuards(AuthGuard)
  @Get('appointment/:id')
  async getAppointment(@Param('id') id: string) {
    return await this.adminService.getAppointment(id);
  }
  // @UseGuards(AuthGuard)
  @Get('appointmentAll')
  async getAllAppointment() {
    return await this.adminService.getAllAppointment();
  }
  // @UseGuards(AuthGuard)
  @Delete('appointment/remove/:id')
  async removeAppointment(@Param('id') id: string) {
    return await this.adminService.cancelAppointment(id);
  }
}
