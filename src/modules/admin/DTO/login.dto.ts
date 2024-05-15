import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLogin {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
