import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminLogin } from '../admin/DTO/login.dto';
import { CreateAdminDto } from '../admin/DTO/createAdmin.dto';
import { authService } from './auth.service';
import { AuthGuard } from './auth.guard';

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
}
