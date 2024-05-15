// src/app/modules/admin/dto/create-admin.dto.ts

import {
  IsString,
  IsEmail,
  IsBoolean,
  IsArray,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Gender, Role } from '../Entities/admin.entity';
export class CreateAdminDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  lastName: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsEmail()
  email: string;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  contactNumber: string[];

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsEnum(Role, { each: true })
  roles: Role[];
}
