import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { AuthGuard } from '@nestjs/passport';
import { Resource } from '../../entities/resource.entity';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createDto: Partial<Resource>) {
    return this.resourceService.create(createDto);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('category') category: string,
    @Query('search') search: string,
  ) {
    return this.resourceService.findAll({ page, limit, category, search });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateDto: Partial<Resource>) {
    return this.resourceService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.resourceService.remove(id);
  }
}
