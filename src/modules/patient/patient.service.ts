import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createAppointmentDto } from './DTO/appointmentCreate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './Entities/appointment.entity';
import { Model } from 'mongoose';
@Injectable()
export class patientService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
  ) {}
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
  async updateAppointment(id: string, doctor: string) {
    try {
      const appointment = await this.appointmentModel.findByIdAndUpdate(id, {
        doctor: doctor,
      });
    } catch (err) {}
  }
}
