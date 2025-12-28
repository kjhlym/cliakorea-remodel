import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../../entities/audit-log.entity';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, path, user, body, ip } = request;

    // Only log mutations (POST, PUT, PATCH, DELETE) for admin or sensitive paths
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      return next.handle().pipe(
        tap(async () => {
          const auditLog = this.auditLogRepository.create({
            userId: user?.userId || 'anonymous',
            action: `${method} ${path}`,
            method,
            path,
            details: JSON.stringify(body),
            ip,
          });
          await this.auditLogRepository.save(auditLog);
        }),
      );
    }

    return next.handle();
  }
}
