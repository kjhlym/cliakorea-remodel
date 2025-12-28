import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PaymentService {
  private readonly tossSecretKey: string;

  constructor(private configService: ConfigService) {
    this.tossSecretKey = this.configService.get<string>('TOSS_SECRET_KEY');
  }

  async confirmPayment(paymentKey: string, orderId: string, amount: number) {
    try {
      const encodedKey = Buffer.from(`${this.tossSecretKey}:`).toString('base64');
      const response = await axios.post(
        'https://api.tosspayments.com/v1/payments/confirm',
        { paymentKey, orderId, amount },
        {
          headers: {
            Authorization: `Basic ${encodedKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.response?.data?.message || 'Payment confirmation failed';
      throw new HttpException(message, status);
    }
  }

  async getPaymentByOrderId(orderId: string) {
    try {
      const encodedKey = Buffer.from(`${this.tossSecretKey}:`).toString('base64');
      const response = await axios.get(
        `https://api.tosspayments.com/v1/payments/orders/${orderId}`,
        {
          headers: {
            Authorization: `Basic ${encodedKey}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to fetch payment info', HttpStatus.NOT_FOUND);
    }
  }
}
