import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConsultationService } from './consultation.service';
import { Consultation, ConsultationStatus } from '../../entities/consultation.entity';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../../entities/user.entity';

@Controller('consultations')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  async create(@Body() data: Partial<Consultation>, @Req() req) {
    if (req.user) {
      data.userId = req.user.userId;
    }
    return await this.consultationService.create(data);
  }

  // Admin: Get all consultations
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll() {
    return await this.consultationService.findAll();
  }

  // Admin: Update status
  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateStatus(@Param('id') id: string, @Body('status') status: ConsultationStatus) {
    return await this.consultationService.updateStatus(id, status);
  }

  // Admin: Delete
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.consultationService.remove(id);
  }
}
