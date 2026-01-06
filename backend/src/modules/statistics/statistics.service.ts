import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistics } from '../../entities/statistics.entity';
import { UpdateStatisticsDto } from './statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics)
    private statsRepository: Repository<Statistics>,
  ) {}

  async getStatistics(): Promise<Statistics> {
    const stats = await this.statsRepository.find();
    if (stats.length === 0) {
      // 초기 데이터 생성
      const newStats = this.statsRepository.create({
        instructorCount: '2,000+',
        programCount: '50+',
        partnerCount: '15+',
        historyYears: '16년',
      });
      return this.statsRepository.save(newStats);
    }
    return stats[0];
  }

  async updateStatistics(updateDto: UpdateStatisticsDto): Promise<Statistics> {
    let stats = await this.getStatistics(); // 기존 데이터 조회 또는 생성
    
    // 값 업데이트
    stats.instructorCount = updateDto.instructorCount;
    stats.programCount = updateDto.programCount;
    stats.partnerCount = updateDto.partnerCount;
    stats.historyYears = updateDto.historyYears;

    return this.statsRepository.save(stats);
  }
}
