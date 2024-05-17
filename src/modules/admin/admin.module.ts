import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './Entities/admin.entity';
import { adminController } from './admin.controller';
import { adminService } from './admin.service';
import { Staff, staffSchema } from '../staffs/entities/staff.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: Staff.name, schema: staffSchema }]),
  ],
  providers: [adminService],
  controllers: [adminController],
  exports: [adminModule],
})
export class adminModule {}
