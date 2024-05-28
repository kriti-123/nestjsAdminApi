import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Staff } from './entities/staff.entity';
import { Patient } from '../patient/Entities/patient.entity';
import { updateMedicationDto } from '../patient/DTO/updateMedication.dto';
import { Model } from 'mongoose';
import { CURDmongooseService } from 'src/tools/CRUDmongoose.tools';

@Injectable()
export class StaffsService extends CURDmongooseService<
  Staff,
  CreateStaffDto,
  UpdateStaffDto
> {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Staff.name) public staffModel: Model<Staff>,
  ) {
    super(staffModel);
  }
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
