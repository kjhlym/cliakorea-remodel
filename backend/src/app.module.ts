import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { User } from './entities/user.entity';
import { Board } from './entities/board.entity';
import { Application } from './entities/application.entity';
import { Consultation } from './entities/consultation.entity';
import { AuditLog } from './entities/audit-log.entity';
import { PricingPlan } from './entities/pricing-plan.entity';
import { Payment } from './entities/payment.entity';
import { CreditTransaction } from './entities/credit-transaction.entity';
import { RefundRequest } from './entities/refund-request.entity';
import { Schedule } from './entities/schedule.entity';
import { Popup } from './entities/popup.entity';
import { Gallery } from './entities/gallery.entity';
import { Statistics } from './entities/statistics.entity';
import { BoardModule } from './modules/board/board.module';
import { ApplicationModule } from './modules/application/application.module';
import { ConsultationModule } from './modules/consultation/consultation.module';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { PaymentModule } from './modules/payment/payment.module';
import { UsersModule } from './modules/users/users.module';
import { CreditsModule } from './modules/credits/credits.module';
import { PricingPlansModule } from './modules/pricing-plans/pricing-plans.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { PopupModule } from './modules/popup/popup.module';
import { AdminModule } from './modules/admin/admin.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditInterceptor } from './modules/auth/audit.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    TypeOrmModule.forFeature([User, Board, Application, Consultation, AuditLog, PricingPlan, Payment, CreditTransaction, RefundRequest, Schedule, Popup, Gallery, Statistics]),
    AuthModule,
    UsersModule,
    FilesModule,
    PaymentModule,
    BoardModule,
    ApplicationModule,
    ConsultationModule,
    CreditsModule,
    PricingPlansModule,
    ScheduleModule,
    AdminModule,
    PopupModule,
    GalleryModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    // Dependency tree update trigger
  ],
})
export class AppModule {}

