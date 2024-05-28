import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { updateMedicationDto } from '../patient/DTO/updateMedication.dto';
import { AuthGuard } from '../auth/auth.guard';
import { loginStaffdto } from './dto/login-staff.dto';

@Controller('staffs')
export class StaffsController {
  constructor(
    private readonly staffsService: StaffsService,
    private JwtService: JwtService,
  ) {}
  @Post('signup')
  async createStaff(@Body() CreateStaffDto: CreateStaffDto) {
    try {
      const { email, password } = CreateStaffDto;
      const existedemail = await this.staffsService.findOne({ email });
      const { contactNumber } = CreateStaffDto;
      const existedphno = await this.staffsService.findOne({ contactNumber });
      console.log(existedemail, existedphno);
      if (existedemail !== null && existedphno !== null) {
        return 'user already existed';
      }
      const salt = 10;
      const hashed = await bcrypt.hash(CreateStaffDto.password, salt);
      CreateStaffDto.password = hashed;
      return this.staffsService.create(CreateStaffDto);
    } catch (err) {}
  }

  @Post('login')
  async login(@Body() loginDto: loginStaffdto) {
    try {
      const { userName, password } = loginDto;
      const staff = await this.staffsService.findOne({ userName });
      // console.log(staff);
      if (!staff) return 'user not found';
      const isValidPassword = await bcrypt.compare(password, staff.password);
      console.log(isValidPassword);
      if (!isValidPassword)
        return new UnauthorizedException(
          'username and password are not matched',
        );
      const payload = loginDto;

      return { accessToken: await this.JwtService.signAsync(payload) };
    } catch (err) {}
  }
  @Put('update/:id')
  async update(
    @Body() UpdateStaffDto: UpdateStaffDto,
    @Param('id') id: string,
  ) {
    try {
      return await this.staffsService.update(UpdateStaffDto, id);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      return await this.staffsService.delete(id);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
  @Get('getProfile/:id')
  async get(@Param('id') id: string) {
    try {
      return await this.staffsService.get(id);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
  @Post('updateMedication/:id/:did')
  // @UseGuards(AuthGuard)
  async updateMed(
    @Body() updateMedication: updateMedicationDto,
    @Param('id') id: string,
    @Param('did') did: string,
  ) {
    return this.staffsService.updateMedication(updateMedication, id, did);
  }
}
