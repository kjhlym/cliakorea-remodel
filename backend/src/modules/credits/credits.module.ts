import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditsService } from './credits.service';
import { CreditsController } from './credits.controller';
import { User } from '../../entities/user.entity';
import { Payment } from '../../entities/payment.entity';
import { CreditTransaction } from '../../entities/credit-transaction.entity';
import { PricingPlan } from '../../entities/pricing-plan.entity';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Payment, CreditTransaction, PricingPlan]),
    PaymentModule,
  ],
  controllers: [CreditsController],
  providers: [CreditsService],
  exports: [CreditsService],
})
export class CreditsModule {}
