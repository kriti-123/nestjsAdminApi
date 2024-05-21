import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
export enum AppointmentType {
  CONSULTATION = 'consultation',
  FOLLOW_UP = 'follow-up',
  EMERGENCY = 'emergency',
  ROUTINE_CHECKUP = 'routine check-up',
}
class Reason {
  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  symptoms: string[];
}
@Schema({ timestamps: true })
export class Appointment extends Document {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  })
  patient: mongoose.Schema.Types.ObjectId;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
  })
  doctor: mongoose.Schema.Types.ObjectId;
  @Prop({ type: Date, required: true })
  appointmentDate: Date;
  @Prop({ type: Reason, required: true })
  reason: Reason;
  @Prop({ enum: AppointmentType, required: true })
  appointmentType: AppointmentType;
}
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
