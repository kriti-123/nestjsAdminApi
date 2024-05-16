import { IsNotEmpty, IsString } from 'class-validator';

export class loginStaffdto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
