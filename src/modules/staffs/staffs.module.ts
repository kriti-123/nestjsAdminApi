import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from '../patient/Entities/patient.entity';
import { Staff, staffSchema } from './entities/staff.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    MongooseModule.forFeature([{ name: Staff.name, schema: staffSchema }]),
  ],
  controllers: [StaffsController],
  providers: [StaffsService],
})
export class StaffsModule {}
//MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
