import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '어린이리더십강사협회 백엔드 API';
  }
}

