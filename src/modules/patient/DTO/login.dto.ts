import { IsNotEmpty, IsString } from 'class-validator';

export class PatientLogin {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
