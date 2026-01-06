import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const databaseConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === "production";

  // Neon DATABASE_URL 지원 (postgresql://user:pass@host/db?sslmode=require)
  const databaseUrl = process.env.DATABASE_URL;

  if (isProduction && databaseUrl) {
    // Neon 연결 문자열 사용
    return {
      type: "postgres",
      url: databaseUrl,
      entities: [join(__dirname, "..", "**", "*.entity.{ts,js}")],
      migrations: [join(__dirname, "..", "migrations", "*.{ts,js}")],
      synchronize: true, // 프로덕션에서는 동기화 비활성화
      logging: process.env.NODE_ENV === "development",
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false, // Neon requires SSL
      },
    };
  }

  // 기존 개별 설정 (로컬 개발용)
  return {
    type: "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "5432", 10),
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD || "6371",
    database: process.env.DATABASE_NAME || "cliakorea",
    entities: [join(__dirname, "..", "**", "*.entity.{ts,js}")],
    migrations: [join(__dirname, "..", "migrations", "*.{ts,js}")],
    synchronize: true, // 개발 환경에서 동기화 활성화
    logging: process.env.NODE_ENV === "development",
    autoLoadEntities: true,
  };
};
