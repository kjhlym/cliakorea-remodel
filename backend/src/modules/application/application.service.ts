import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from '../../entities/application.entity';
import { EncryptionService } from '../auth/encryption.service';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    private encryptionService: EncryptionService,
  ) {}

  async create(data: Partial<Application>): Promise<Application> {
    if (data.applicantPhone) {
      data.applicantPhone = this.encryptionService.encrypt(data.applicantPhone);
    }
    const application = this.applicationRepository.create({
      ...data,
      status: ApplicationStatus.PENDING,
    });
    return await this.applicationRepository.save(application);
  }

  async findAll(): Promise<Application[]> {
    const applications = await this.applicationRepository.find({
      order: { createdAt: 'DESC' },
    });
    return applications.map((a) => ({
      ...a,
      applicantPhone: this.encryptionService.decrypt(a.applicantPhone),
    }));
  }

  async findByUser(userId: string): Promise<Application[]> {
    const applications = await this.applicationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return applications.map((a) => ({
      ...a,
      applicantPhone: this.encryptionService.decrypt(a.applicantPhone),
    }));
  }

  async updateStatus(id: string, status: ApplicationStatus): Promise<Application> {
    await this.applicationRepository.update(id, { status });
    return this.applicationRepository.findOne({ where: { id } });
  }
}
