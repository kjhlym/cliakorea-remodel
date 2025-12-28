import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PricingPlansService } from './pricing-plans.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../../entities/user.entity';

@Controller('pricing-plans')
export class PricingPlansController {
  constructor(private readonly pricingPlansService: PricingPlansService) {}

  // 활성화된 요금제 목록 (공개)
  @Get()
  async findAll() {
    return await this.pricingPlansService.findAll();
  }

  // 모든 요금제 목록 (관리자 전용)
  @Get('admin/all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAllForAdmin() {
    return await this.pricingPlansService.findAllForAdmin();
  }

  // 요금제 생성 (관리자 전용)
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() data: any) {
    return await this.pricingPlansService.create(data);
  }

  // 요금제 수정 (관리자 전용)
  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.pricingPlansService.update(id, data);
  }

  // 요금제 삭제 (관리자 전용)
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.pricingPlansService.remove(id);
  }
}
