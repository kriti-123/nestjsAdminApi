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
  @Get('staff/getStaff/:id')
  async getStaff(@Param('id') id: string) {
    return await this.adminService.getProfileStaff(id);
  }
  @Delete('staff/removestaff/:id')
  async removestaff(@Param('id') id: string) {
    return await this.adminService.removeStaff(id);
  }
  @Put('staff/updateRole/:id')
  async updateRole(@Param('id') id: string, @Body() roles: Role[]) {
    return await this.adminService.updateRole(id, roles);
  }
  @Put('staff/updateStatus/:id')
  async togglestatus(@Param('id') id: string) {
    return await this.adminService.toggleStaffActivation(id);
  }
}
