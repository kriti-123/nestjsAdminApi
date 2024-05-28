import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Admin } from './Entities/admin.entity';
import { Model } from 'mongoose';
import { Staff, Role } from '../staffs/entities/staff.entity';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Appointment } from '../patient/Entities/appointment.entity';
import { CreateAdminDto } from './DTO/createAdmin.dto';
import { AdminLogin } from './DTO/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CURDmongooseService } from 'src/tools/CRUDmongoose.tools';
import { UpdateStaffDto } from '../staffs/dto/update-staff.dto';
import { UpdateAdminDto } from './DTO/updateDto.dto';
@Injectable()
export class adminService extends CURDmongooseService<
  Admin,
  CreateAdminDto,
  UpdateAdminDto
> {
  constructor(
    private Jwtservice: JwtService,
    @InjectModel(Admin.name) public adminModel: Model<Admin>,
    @InjectModel(Staff.name) public staffModel: Model<Staff>,
    @InjectModel(Appointment.name) public appointmentModel: Model<Appointment>,
  ) {
    super(adminModel);
  }
  // I have used curdmongoose only the curd for admin and for other api i used the admin service is it
  async getstaffProfile(id: string) {
    try {
      const staff = await this.staffModel.findById(id);
      if (!staff) {
        throw new HttpException('staff not found', HttpStatus.NOT_FOUND);
      }
      return staff;
    } catch (error) {
      throw new HttpException('Invalid staff ID', HttpStatus.BAD_REQUEST);
    }
  }
  async removeStaff(id: string) {
    try {
      const staff = await this.staffModel.findByIdAndDelete(id);
      if (!staff) {
        throw new HttpException('staff not found', HttpStatus.NOT_FOUND);
      }
      return staff;
    } catch (error) {
      throw new HttpException('Invalid staff ID', HttpStatus.BAD_REQUEST);
    }
  }
  async getProfileStaff(id: string) {
    try {
      const staff = await this.staffModel.findById(id);
      if (!staff) {
        return new HttpException('Staff not found', HttpStatus.NOT_FOUND);
      }

      return staff;
    } catch (error) {
      throw new HttpException(
        'Error updating staff roles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateRole(id: string, roles: Role[]) {
    try {
      console.log(roles);
      const validRole = Object.values(Role);
      console.log(validRole);
      const invalidRole = roles.filter((role) => !validRole.includes(role));
      console.log(invalidRole);
      if (invalidRole.length > 0)
        throw new HttpException(
          `Invalid roles: ${invalidRole.join(', ')}`,
          HttpStatus.BAD_REQUEST,
        );
      return await this.staffModel.findByIdAndUpdate(
        id,
        { roles: roles },
        { new: true },
      );
    } catch (error) {
      throw new HttpException(
        'Error updating staff roles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async toggleStaffActivation(id: string) {
    try {
      const staff = await this.staffModel.findById(id);
      if (!staff) {
        throw new HttpException('Staff not found', HttpStatus.NOT_FOUND);
      }
      staff.isActive = !staff.isActive;
      console.log(staff.isActive);
      await staff.save();
      console.log(staff);
      return staff;
    } catch (err) {
      throw new HttpException(
        'Error toggling staff activation status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //------appointment api-------
  async getAppointment(id: string) {
    try {
      const appointment = await this.appointmentModel.findById(id);
      if (!appointment) {
        throw new HttpException('appointment not found', HttpStatus.NOT_FOUND);
      }
      return appointment;
    } catch (error) {
      throw new HttpException('Invalid appointment ID', HttpStatus.BAD_REQUEST);
    }
  }
  async getAllAppointment() {
    try {
      const appointment = await this.appointmentModel
        .find()
        // .populate('doctor', 'firstName lastName')
        // .populate('patient', 'firstName lastName')
        .select('doctor patient');
      if (!appointment) {
        throw new HttpException('appointment not found', HttpStatus.NOT_FOUND);
      }
      return appointment;
    } catch (error) {
      throw new HttpException('Invalid response', HttpStatus.BAD_REQUEST);
    }
  }
  async cancelAppointment(id: string) {
    try {
      const appointment = await this.appointmentModel.findByIdAndDelete(id);
      if (!appointment)
        throw new HttpException('unable to delete', HttpStatus.BAD_REQUEST);
      return appointment;
    } catch (err) {
      throw new HttpException('Invalid response', HttpStatus.BAD_REQUEST);
    }
  }
}
