import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createAppointmentDto } from './DTO/appointmentCreate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './Entities/appointment.entity';
import { Model } from 'mongoose';
import { CURDmongooseService } from 'src/tools/CRUDmongoose.tools';
import { Patient } from './Entities/patient.entity';
import { CreatePatientDto } from './DTO/createPatient.dto';
import { UpdatePatientDto } from './DTO/UpdatePatientDto.dto';
@Injectable()
export class patientService extends CURDmongooseService<
  Patient,
  CreatePatientDto,
  UpdatePatientDto
> {
  constructor(
    @InjectModel(Patient.name) public patientModel: Model<Patient>,
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
  ) {
    super(patientModel);
  }
  async createAppointment(createAppointmentDto: createAppointmentDto) {
    try {
      const appointment =
        await this.appointmentModel.create(createAppointmentDto);
      if (!appointment) throw new InternalServerErrorException();
      return appointment;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
  async cancelAppointment(id: string) {
    try {
      const appointmentId = await this.appointmentModel.findByIdAndDelete(id);
      if (!appointmentId) {
        throw new InternalServerErrorException();
      }
      return appointmentId;
    } catch (err) {}
  }
  // async updateAppointment(id: string, data: object) {
  //   try {
  //     const appointment = await this.appointmentModel.findByIdAndUpdate(id, {
  //       doctor: data.doctor,
  //     });
  //   } catch (err) {}
  // }
}
