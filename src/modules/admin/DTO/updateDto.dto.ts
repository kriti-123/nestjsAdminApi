import {
  IsString,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Role } from '../Entities/admin.entity';
export class UpdateAdminDto {
  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsString()
  @IsOptional()
  contactNumber: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsEnum(Role)
  @IsOptional()
  roles: Role;
}
