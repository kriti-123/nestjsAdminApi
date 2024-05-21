import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { createAppointmentDto } from './DTO/appointmentCreate.dto';
import { patientService } from './patient.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('patient')
export class patientController {
  constructor(private patientService: patientService) {}
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
