import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { Schedule } from '../../entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  create(schedule: Partial<Schedule>) {
    const newSchedule = this.scheduleRepository.create(schedule);
    return this.scheduleRepository.save(newSchedule);
  }

  async findAll(year?: number, month?: number, page: number = 1, limit?: number, search?: string) {
    const where: any = {};
    
    if (year && month) {
      where.startDate = Between(
        new Date(year, month - 1, 1),
        new Date(year, month, 0, 23, 59, 59)
      );
    }
    
    if (search) {
      where.title = Like(`%${search}%`);
    }

    if (limit) {
      const [items, total] = await this.scheduleRepository.findAndCount({
        where,
        order: {
          startDate: 'DESC',
        },
        skip: (page - 1) * limit,
        take: limit,
      });
      return {
        items,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }
    
    return this.scheduleRepository.find({
      where,
      order: {
        startDate: 'DESC',
      },
      take: 100
    });
  }

  findOne(id: number) {
    return this.scheduleRepository.findOne({ where: { id } });
  }

  update(id: number, updateScheduleDto: Partial<Schedule>) {
    return this.scheduleRepository.update(id, updateScheduleDto);
  }

  remove(id: number) {
    return this.scheduleRepository.delete(id);
  }
}
