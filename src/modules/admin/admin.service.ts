import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './Entities/admin.entity';
import { Model } from 'mongoose';
import { Staff, Role } from '../staffs/entities/staff.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class adminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Staff.name) private staffModel: Model<Staff>,
  ) {}
  async getAdminProfile(id: string) {
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
  //------staff Operation API------------
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
}
