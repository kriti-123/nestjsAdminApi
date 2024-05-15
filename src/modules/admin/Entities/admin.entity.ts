import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
export enum Role {
  ADMIN = ' admin',
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  RECEPTIONIST = 'receptionist',
  PHARMACIST = 'pharmacist',
  LAB_TECHNICIAN = 'lab technician',
}
@Schema({ timestamps: true })
export class Admin extends Document {
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

  @Prop({ required: true, default: [] })
  contactNumber: string[];

  @Prop({ default: null })
  profilePicture?: string;

  @Prop({ type: [String], default: [] })
  roles: Role[];

  @Prop({ type: Date, default: Date.now })
  LastLoginAt: Date;

  @Prop({ type: Date, default: null })
  deleted: Date;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
