import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './Entities/admin.entity';
import { Model } from 'mongoose';
import { ValidationError } from 'class-validator';

@Controller('admin')
export class adminController {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}
  @Get('profile/:id')
  //   @UseGuards(AuthGuard)
  async profile(@Param('id') id: string) {
    try {
      const admin = await this.adminModel.findById(id);
      if (!admin) {
        throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
      }
      return admin;
    } catch (error) {
      throw new HttpException('Invalid admin ID', HttpStatus.BAD_REQUEST);
    }
  }
}
