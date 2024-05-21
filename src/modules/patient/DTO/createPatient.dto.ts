import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDate,
  IsArray,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../Entities/patient.entity';
import { Address } from '../../staffs/entities/address.entity';
class MedicalHistoryDto {
  @IsArray()
  @IsString({ each: false })
  allergies: string[];

  @IsArray()
  @ValidateNested({ each: false })
  @Type(() => MedicationDto)
  medications: MedicationDto[];

  @IsArray()
  @IsString({ each: false })
  medicalConditions: string[];

  @IsArray()
  @IsString({ each: false })
  surgeries: string[];
}

class MedicationDto {
  @IsString()
  name: string;

  @IsString()
  dosage: string;
}

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateOfBirth?: Date;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  contactNumber: string[];

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @ValidateNested()
  @Type(() => MedicalHistoryDto)
  medicalHistory: MedicalHistoryDto;

  @IsMongoId()
  @IsOptional()
  assignedDoctor?: string;
}
