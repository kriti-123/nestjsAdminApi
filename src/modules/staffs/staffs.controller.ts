import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { updateMedicationDto } from '../patient/DTO/updateMedication.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}
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
