import { IsNotEmpty, IsString } from 'class-validator';

export class PatientLoginDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
