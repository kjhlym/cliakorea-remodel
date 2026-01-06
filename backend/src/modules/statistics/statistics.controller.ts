import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatisticsService } from './statistics.service';
import { UpdateStatisticsDto } from './statistics.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../../entities/user.entity';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getStatistics() {
    return this.statisticsService.getStatistics();
  }

  @Put()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  updateStatistics(@Body() updateDto: UpdateStatisticsDto) {
    console.log('Update Statistics Request:', updateDto);
    return this.statisticsService.updateStatistics(updateDto);
  }
}
