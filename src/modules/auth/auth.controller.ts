import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminLogin } from '../admin/DTO/login.dto';
import { CreateAdminDto } from '../admin/DTO/createAdmin.dto';
import { authService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateStaffDto } from '../staffs/dto/create-staff.dto';
import { loginStaffdto } from '../staffs/dto/login-staff.dto';

@Controller('auth')
export class authController {
  constructor(private authService: authService) {}
  @Post('signup')
  async signup(@Body() createDto: CreateAdminDto) {
    return this.authService.signup(createDto);
    // return createDto;
  }
  @Post('login')
  async login(@Body() loginDto: AdminLogin) {
    return this.authService.signin(loginDto);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    return 'hhj';
  }

  //-----------staff auth-------------
  @Post('staff/signup')
  createStaff(@Body() CreateStaffDto: CreateStaffDto) {
    return this.authService.staffSignup(CreateStaffDto);
  }

  @Post('staff/login')
  loginStaff(@Body() loginDto: loginStaffdto) {
    return this.authService.staffLogin(loginDto);
  }
  @UseGuards(AuthGuard)
  @Get('staff/profile')
  getpro() {
    return 'opopo';
  }
}
