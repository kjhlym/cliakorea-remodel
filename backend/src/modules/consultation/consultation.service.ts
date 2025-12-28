import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation, ConsultationStatus } from '../../entities/consultation.entity';
import { EncryptionService } from '../auth/encryption.service';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(Consultation)
    private consultationRepository: Repository<Consultation>,
    private encryptionService: EncryptionService,
  ) {}

  async create(data: Partial<Consultation>): Promise<Consultation> {
    if (data.phone) {
      data.phone = this.encryptionService.encrypt(data.phone);
    }
    const consultation = this.consultationRepository.create(data);
    return await this.consultationRepository.save(consultation);
  }

  async findAll(): Promise<Consultation[]> {
    const consultations = await this.consultationRepository.find({
      order: { createdAt: 'DESC' },
    });
    return consultations.map((c) => ({
      ...c,
      phone: this.encryptionService.decrypt(c.phone),
    }));
  }

  async updateStatus(id: string, status: ConsultationStatus): Promise<Consultation> {
    await this.consultationRepository.update(id, { status });
    return this.consultationRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.consultationRepository.delete(id);
  }
}
