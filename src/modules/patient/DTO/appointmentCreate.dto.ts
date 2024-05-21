import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AppointmentType } from '../Entities/appointment.entity';
export class ReasonDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  symptoms: string[];
}
export class createAppointmentDto {
  @IsMongoId()
  @IsNotEmpty()
  patient: string;

  @IsMongoId()
  @IsNotEmpty()
  doctor: string;

  @IsDate()
  @IsNotEmpty()
  appointmentDate: Date;
  @IsNotEmpty()
  reason: ReasonDto;

  @IsNotEmpty()
  appointmentType: AppointmentType;
}
