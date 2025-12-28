import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingPlan } from '../../entities/pricing-plan.entity';

@Injectable()
export class PricingPlansService {
  constructor(
    @InjectRepository(PricingPlan)
    private pricingPlanRepository: Repository<PricingPlan>,
  ) {}

  // 모든 요금제 조회 (활성화된 것만)
  async findAll() {
    return await this.pricingPlanRepository.find({
      where: { isActive: true },
      order: { price: 'ASC' },
    });
  }

  // 모든 요금제 조회 (관리자용, 비활성화 포함)
  async findAllForAdmin() {
    return await this.pricingPlanRepository.find({
      order: { price: 'ASC' },
    });
  }

  // 요금제 생성
  async create(data: Partial<PricingPlan>) {
    const plan = this.pricingPlanRepository.create(data);
    return await this.pricingPlanRepository.save(plan);
  }

  // 요금제 수정
  async update(id: string, data: Partial<PricingPlan>) {
    await this.pricingPlanRepository.update(id, data);
    return await this.pricingPlanRepository.findOne({ where: { id } });
  }

  // 요금제 삭제 (소프트 딜리트 - isActive = false)
  async remove(id: string) {
    await this.pricingPlanRepository.update(id, { isActive: false });
    return { message: 'Pricing plan deactivated' };
  }
}
