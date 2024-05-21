import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './Entities/admin.entity';
import { Role } from '../staffs/entities/staff.entity';
import { Model } from 'mongoose';
import { ValidationError } from 'class-validator';
import { adminService } from './admin.service';

@Controller('admin')
export class adminController {
  constructor(private adminService: adminService) {}
  @Get('profile/:id')
  //   @UseGuards(AuthGuard)
  async profile(@Param('id') id: string) {
    return await this.adminService.getAdminProfile(id);
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
