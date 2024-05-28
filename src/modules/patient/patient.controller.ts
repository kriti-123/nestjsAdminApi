import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createAppointmentDto } from './DTO/appointmentCreate.dto';
import { patientService } from './patient.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePatientDto } from './DTO/createPatient.dto';
import { PatientLoginDto } from './DTO/login.dto';
import { UpdatePatientDto } from './DTO/UpdatePatientDto.dto';
import { JwtService } from '@nestjs/jwt';
import { loginStaffdto } from '../staffs/dto/login-staff.dto';

@Controller('patient')
export class patientController {
  constructor(
    private patientService: patientService,
    private JwtService: JwtService,
  ) {}
  @Post('signup')
  async createStaff(@Body() CreatePatientDto: CreatePatientDto) {
    try {
      const { email, password } = CreatePatientDto;
      const existedemail = await this.patientService.findOne({ email });
      const { contactNumber } = CreatePatientDto;
      const existedphno = await this.patientService.findOne({ contactNumber });
      console.log(existedemail, existedphno);
      if (existedemail !== null && existedphno !== null) {
        return 'user already existed';
      }
      const salt = 10;
      const hashed = await bcrypt.hash(CreatePatientDto.password, salt);
      CreatePatientDto.password = hashed;
      return this.patientService.create(CreatePatientDto);
    } catch (err) {}
  }

  @Post('login')
  async login(@Body() loginDto: PatientLoginDto) {
    try {
      const { userName, password } = loginDto;
      const admin = await this.patientService.findOne({ userName });
      // console.log(admin);
      if (!admin) return 'user not found';
      const isValidPassword = await bcrypt.compare(password, admin.password);
      console.log(isValidPassword);
      if (!isValidPassword)
        return new UnauthorizedException(
          'username and password are not matched',
        );
      const payload = loginDto;

      return { accessToken: await this.JwtService.signAsync(payload) };
    } catch (err) {}
  }
  @Get('profile/:id')
  @UseGuards(AuthGuard)
  async profile(@Param('id') id: string) {
    return await this.patientService.get(id);
  }
  @Put('update/:id')
  async update(
    @Body() UpdatePatientDto: UpdatePatientDto,
    @Param('id') id: string,
  ) {
    try {
      return await this.patientService.update(UpdatePatientDto, id);
    } catch (err) {}
  }
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      return await this.patientService.delete(id);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Post('make/appointment')
  async create(@Body() createAppointmentDto: createAppointmentDto) {
    return this.patientService.createAppointment(createAppointmentDto);
  }
  @UseGuards(AuthGuard)
  @Get('appointment/cancel')
  async cancel(@Param('id') id: string) {
    return this.patientService.cancelAppointment(id);
  }
  // @Put('appointment/update')
  // async updateAppointment(@Param('id') id: string, @Body() data) {
  //   return this.patientService.updateAppointment(id, data);
  // }
}
