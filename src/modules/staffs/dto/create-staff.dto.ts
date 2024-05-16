import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from '../entities/address.entity';
import { Gender, Role } from '../entities/staff.entity';

export class CreateStaffDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  lastName: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsEmail()
  email: string;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @IsString({ each: true })
  contactNumber: string[];

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsArray()
  @IsEnum(Role, { each: true })
  roles: Role[];

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsOptional()
  @IsDate()
  LastLoginAt?: Date;

  @IsOptional()
  @IsDate()
  deleted?: Date;
}
