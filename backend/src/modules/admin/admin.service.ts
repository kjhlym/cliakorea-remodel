import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { User } from '../../entities/user.entity';
import { Application } from '../../entities/application.entity';
import { Consultation } from '../../entities/consultation.entity';
import { Payment } from '../../entities/payment.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
    @InjectRepository(Consultation)
    private readonly consultationRepo: Repository<Consultation>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(dto: CreateAdminDto): Promise<Admin> {
    const exists = await this.adminRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('이미 존재하는 관리자 이메일입니다.');

    const hashed = await bcrypt.hash(dto.password, 10);
    const admin = this.adminRepo.create({ ...dto, password: hashed });
    return this.adminRepo.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepo.find();
  }

  async findOne(id: number): Promise<Admin> {
    return this.adminRepo.findOneOrFail({ where: { id } });
  }
  async update(id: number, dto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminRepo.findOneOrFail({ where: { id } });
    if (dto.email && dto.email !== admin.email) {
      const exists = await this.adminRepo.findOne({ where: { email: dto.email } });
      if (exists) throw new BadRequestException('이미 존재하는 관리자 이메일입니다.');
    }
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const updated = this.adminRepo.merge(admin, dto);
    return this.adminRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.adminRepo.delete(id);
  }

  async getStats() {
    const totalUsers = await this.userRepo.count();
    const totalApplications = await this.applicationRepo.count();
    const totalConsultations = await this.consultationRepo.count();
    const totalRevenueResult = await this.paymentRepo
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .where('payment.status = :status', { status: 'completed' })
      .getRawOne();
    
    const recentApplications = await this.applicationRepo.find({
      take: 5,
      order: { createdAt: 'DESC' },
    });

    const recentConsultations = await this.consultationRepo.find({
      take: 5,
      order: { createdAt: 'DESC' },
    });

    return {
      stats: {
        totalUsers,
        totalApplications,
        totalConsultations,
        totalRevenue: Number(totalRevenueResult?.total || 0),
      },
      recentApplications,
      recentConsultations,
    };
  }
}
