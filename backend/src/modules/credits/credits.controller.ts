import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreditsService } from './credits.service';

@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  // 크레딧 구매 요청
  @Post('purchase')
  @UseGuards(AuthGuard('jwt'))
  async createPurchase(@Req() req, @Body('planId') planId: string) {
    return await this.creditsService.createPurchaseRequest(req.user.id, planId);
  }

  // 결제 확인 (토스페이먼츠 콜백)
  @Post('confirm')
  async confirmPayment(
    @Body('paymentKey') paymentKey: string,
    @Body('orderId') orderId: string,
    @Body('amount') amount: number,
  ) {
    return await this.creditsService.confirmPayment(paymentKey, orderId, amount);
  }

  // 크레딧 잔액 조회
  @Get('balance')
  @UseGuards(AuthGuard('jwt'))
  async getBalance(@Req() req) {
    return await this.creditsService.getBalance(req.user.id);
  }

  // 크레딧 거래 내역
  @Get('transactions')
  @UseGuards(AuthGuard('jwt'))
  async getTransactions(@Req() req) {
    return await this.creditsService.getTransactions(req.user.id);
  }

  // 결제 내역
  @Get('payments')
  @UseGuards(AuthGuard('jwt'))
  async getPaymentHistory(@Req() req) {
    return await this.creditsService.getPaymentHistory(req.user.id);
  }
}
