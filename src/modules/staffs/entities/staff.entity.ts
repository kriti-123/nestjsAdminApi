import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.entity';
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
export enum Role {
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  RECEPTIONIST = 'receptionist',
  PHARMACIST = 'pharmacist',
  LAB_TECHNICIAN = 'lab technician',
}
@Schema({ timestamps: true })
export class Staff extends Document {
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

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true })
  contactNumber: string;

  @Prop({ default: null })
  profilePicture?: string;

  @Prop({ enum: Role })
  roles: Role;

  @Prop({ type: Address, required: true })
  address: Address;

  @Prop({ type: Date, default: Date.now })
  LastLoginAt: Date;

  @Prop({ type: Date, default: null })
  deleted: Date;
}
export const staffSchema = SchemaFactory.createForClass(Staff);
