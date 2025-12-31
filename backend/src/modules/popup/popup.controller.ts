import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../../entities/user.entity';
import { PopupService } from './popup.service';
import { Popup } from '../../entities/popup.entity';

@Controller('popups')
export class PopupController {
  constructor(private readonly popupService: PopupService) {}

  // Public: 정기 노출 중인 활성 팝업 조회
  @Get('active')
  async findActive() {
    return await this.popupService.findActive();
  }

  // Admin: 모든 팝업 목록 조회
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll() {
    return await this.popupService.findAll();
  }

  // Admin: 팝업 상세 조회
  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async findOne(@Param('id') id: string) {
    return await this.popupService.findOne(id);
  }

  // Admin: 팝업 생성
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() data: Partial<Popup>) {
    return await this.popupService.create(data);
  }

  // Admin: 팝업 업데이트
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() data: Partial<Popup>) {
    return await this.popupService.update(id, data);
  }

  // Admin: 팝업 삭제
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.popupService.remove(id);
  }
}
