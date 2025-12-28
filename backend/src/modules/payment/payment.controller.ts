import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('confirm')
  async confirmPayment(
    @Body('paymentKey') paymentKey: string,
    @Body('orderId') orderId: string,
    @Body('amount') amount: number,
  ) {
    return await this.paymentService.confirmPayment(paymentKey, orderId, amount);
  }

  @Get('success')
  async success(@Query() query: any) {
    // 프론트엔드에서 성공 후 백엔드로 결제 승인 요청을 보내는 흐름
    // 여기서는 단순히 쿼리 파라미터를 반환하거나 DB 작업을 수행할 수 있음
    return {
      message: 'Payment variables received',
      data: query,
    };
  }
}
