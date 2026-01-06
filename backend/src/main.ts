import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  // 정적 파일 서빙 설정
  app.useStaticAssets(join(process.cwd(), "uploads"), {
    prefix: "/uploads/",
  });

  // CORS 설정 - 개발 환경에서 localhost:3000 허용
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "https://cliakorea-frontend.vercel.app",
      "https://*.railway.app",
      "https://cliakorea.kr",
      process.env.FRONTEND_URL,
    ].filter(Boolean), // undefined 값 제거
    credentials: true,
  });

  // 글로벌 접두사 삭제 (소셜 로그인 경로 호환성을 위해)
  // app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`백엔드 서버가 ${port} 포트에서 실행 중입니다.`);
  // Server initialized
}

bootstrap();
