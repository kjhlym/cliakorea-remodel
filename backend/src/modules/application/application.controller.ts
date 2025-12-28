import { Controller, Post, Get, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationService } from './application.service';
import { Application, ApplicationStatus } from '../../entities/application.entity';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../../entities/user.entity';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async create(@Body() data: Partial<Application>, @Req() req) {
    // 로그인된 사용자인 경우 userId 추가
    if (req.user) {
      data.userId = req.user.userId;
    }
    return await this.applicationService.create(data);
  }

  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  async getMyApplications(@Req() req) {
    return await this.applicationService.findByUser(req.user.userId);
  }

  // Admin: Get all applications
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll() {
    return await this.applicationService.findAll();
  }

  // Admin: Update application status
  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateStatus(@Param('id') id: string, @Body('status') status: ApplicationStatus) {
    return await this.applicationService.updateStatus(id, status);
  }
}
