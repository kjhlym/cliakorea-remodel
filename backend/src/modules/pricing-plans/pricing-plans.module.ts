import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricingPlansService } from './pricing-plans.service';
import { PricingPlansController } from './pricing-plans.controller';
import { PricingPlan } from '../../entities/pricing-plan.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PricingPlan]),
    AuthModule,
  ],
  controllers: [PricingPlansController],
  providers: [PricingPlansService],
  exports: [PricingPlansService],
})
export class PricingPlansModule {}
