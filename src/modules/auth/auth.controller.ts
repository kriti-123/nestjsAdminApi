import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminLogin } from '../admin/DTO/login.dto';
import { CreateAdminDto } from '../admin/DTO/createAdmin.dto';
import { authService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateStaffDto } from '../staffs/dto/create-staff.dto';
import { loginStaffdto } from '../staffs/dto/login-staff.dto';
import { CreatePatientDto } from '../patient/DTO/createPatient.dto';
import { PatientLogin } from '../patient/DTO/login.dto';

@Controller('auth')
export class authController {
  constructor(private authService: authService) {}

  //--------patient auth-----------
  @Post('patient/signup')
  createPatient(@Body() CreatePatientDto: CreatePatientDto) {
    return this.authService.patientSignup(CreatePatientDto);
  }

  @Post('patient/login')
  loginPatient(@Body() loginDto: PatientLogin) {
    return this.authService.patientLogin(loginDto);
  }
}
