import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Address } from '../../staffs/entities/address.entity';
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
class Medication {
  name: string;
  dosage: string;
}
class MedicalHistory {
  allergies: string[];
  medications: Medication[];
  medicalConditions: string[];
  surgeries: string[];
}
@Schema({ timestamps: true })
export class Patient extends Document {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ default: null })
  middleName?: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ enum: Gender })
  gender: Gender;

  @Prop({ type: Date, default: null })
  dateOfBirth: Date;

  @Prop({ required: true })
  email: string;
  @Prop({ required: true, default: [] })
  contactNumber: string[];

  @Prop({ default: null })
  profilePicture?: string;

  @Prop({ type: Address, required: true })
  address: Address;

  @Prop({ type: [{ type: Object }] })
  medicalHistory: MedicalHistory;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Staff' })
  assignedDoctor: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
  @Prop({ type: Date, default: Date.now })
  LastLoginAt: Date;

  @Prop({ type: Date, default: null })
  deleted: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
