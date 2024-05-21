import { Module } from '@nestjs/common';
import { patientController } from './patient.controller';
import { patientService } from './patient.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './Entities/appointment.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
  controllers: [patientController],
  providers: [patientService],
})
export class patientModule {}
