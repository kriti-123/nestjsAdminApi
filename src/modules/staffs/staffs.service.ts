import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Staff } from './entities/staff.entity';

@Injectable()
export class StaffsService {
  // constructor(@InjectModel(Staff.name) private staffModel: Staff) {}
  // async getProfile(id: string) {}
  // async updateProfile(id: string, updateDto: UpdateStaffDto) {}
}
