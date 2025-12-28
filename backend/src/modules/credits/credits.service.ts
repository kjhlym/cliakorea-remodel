import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Payment, PaymentStatus } from '../../entities/payment.entity';
import { CreditTransaction, TransactionType } from '../../entities/credit-transaction.entity';
import { PricingPlan } from '../../entities/pricing-plan.entity';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(CreditTransaction)
    private creditTransactionRepository: Repository<CreditTransaction>,
    @InjectRepository(PricingPlan)
    private pricingPlanRepository: Repository<PricingPlan>,
    private paymentService: PaymentService,
  ) {}

  // 크레딧 구매 요청 생성
  async createPurchaseRequest(userId: string, planId: string) {
    const plan = await this.pricingPlanRepository.findOne({ where: { id: planId } });
    if (!plan) {
      throw new Error('Pricing plan not found');
    }

    const payment = this.paymentRepository.create({
      userId,
      planId,
      amount: plan.discountedPrice || plan.price,
      credits: plan.credits,
      status: PaymentStatus.PENDING,
      tossOrderId: `ORDER-${Date.now()}-${userId.substring(0, 8)}`,
    });

    return await this.paymentRepository.save(payment);
  }

  // 결제 확인 및 크레딧 충전
  async confirmPayment(paymentKey: string, orderId: string, amount: number) {
    // 토스페이먼츠 결제 확인
    const tossResult = await this.paymentService.confirmPayment(paymentKey, orderId, amount);

    // 결제 정보 조회
    const payment = await this.paymentRepository.findOne({ where: { tossOrderId: orderId } });
    if (!payment) {
      throw new Error('Payment not found');
    }

    // 결제 상태 업데이트
    payment.status = PaymentStatus.COMPLETED;
    payment.tossPaymentKey = paymentKey;
    await this.paymentRepository.save(payment);

    // 사용자 크레딧 충전
    const user = await this.userRepository.findOne({ where: { id: payment.userId } });
    user.totalCredits += payment.credits;
    await this.userRepository.save(user);

    // 크레딧 거래 내역 생성
    const transaction = this.creditTransactionRepository.create({
      userId: payment.userId,
      amount: payment.credits,
      transactionType: TransactionType.PURCHASE,
      relatedPaymentId: payment.id,
      description: `크레딧 구매: ${payment.credits}개`,
    });
    await this.creditTransactionRepository.save(transaction);

    return { payment, user };
  }

  // 크레딧 사용 (FIFO 로직)
  async useCredits(userId: string, amount: number, description: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.totalCredits < amount) {
      throw new Error('Insufficient credits');
    }

    // 크레딧 차감
    user.totalCredits -= amount;
    await this.userRepository.save(user);

    // 사용 내역 기록
    const transaction = this.creditTransactionRepository.create({
      userId,
      amount: -amount,
      transactionType: TransactionType.USAGE,
      description,
    });
    await this.creditTransactionRepository.save(transaction);

    return user;
  }

  // 크레딧 잔액 조회
  async getBalance(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return { totalCredits: user.totalCredits };
  }

  // 크레딧 거래 내역 조회
  async getTransactions(userId: string) {
    return await this.creditTransactionRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  // 결제 내역 조회
  async getPaymentHistory(userId: string) {
    return await this.paymentRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: ['plan'],
    });
  }
}
