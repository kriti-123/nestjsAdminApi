import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
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
export class updateMedicationDto {
  @Prop({ required: true, type: [{ type: Object }] })
  medicalHistory: MedicalHistory;
}
