import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'cliakorea',
    // 개발 환경에서는 소스 파일 경로, 프로덕션에서는 빌드된 파일 경로 사용
    entities: isProduction
      ? [join(__dirname, '..', '**', '*.entity.js')]
      : [join(__dirname, '..', '**', '*.entity.ts')],
    migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
    synchronize: !isProduction, // 프로덕션에서는 false
    logging: process.env.NODE_ENV === 'development',
    autoLoadEntities: true, // 엔티티 자동 로드 활성화
  };
};

