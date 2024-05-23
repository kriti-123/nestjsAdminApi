import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Staff } from './entities/staff.entity';
import { Patient } from '../patient/Entities/patient.entity';
import { updateMedicationDto } from '../patient/DTO/updateMedication.dto';
import { Model } from 'mongoose';

@Injectable()
export class StaffsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Staff.name) private staffModel: Model<Staff>,
  ) {}
  // async getProfile(id: string) {}
  async updateMedication(
    updateMedication: updateMedicationDto,
    Pid: string,
    did: string,
  ) {
    try {
      const staff = await this.staffModel.findById(did);
      const isDoctor = staff.roles;
      console.log(typeof isDoctor);

      if (isDoctor !== 'doctor') {
        return 'you are not authorized';
      }
      const patient = await this.patientModel.findByIdAndUpdate(
        Pid,
        { medicalHistory: updateMedication },
        { new: true },
      );
      if (!patient) {
        return 'error caught';
      }
      return patient;
    } catch (err) {}
  }
}
