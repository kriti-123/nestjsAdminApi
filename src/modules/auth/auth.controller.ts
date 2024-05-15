import { Body, Controller, Post } from '@nestjs/common';
import { AdminLogin } from '../admin/DTO/login.dto';
import { CreateAdminDto } from '../admin/DTO/createAdmin.dto';
import { authService } from './auth.service';

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
}
