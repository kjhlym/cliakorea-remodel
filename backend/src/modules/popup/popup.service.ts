import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual, IsNull, Or } from 'typeorm';
import { Popup } from '../../entities/popup.entity';

@Injectable()
export class PopupService {
  constructor(
    @InjectRepository(Popup)
    private popupRepository: Repository<Popup>,
  ) {}

  async create(data: Partial<Popup>): Promise<Popup> {
    const popup = this.popupRepository.create(data);
    return await this.popupRepository.save(popup);
  }

  async findAll(): Promise<Popup[]> {
    return await this.popupRepository.find({
      order: { priority: 'DESC', createdAt: 'DESC' },
    });
  }

  async findActive(): Promise<Popup[]> {
    const now = new Date();
    // 현재 시간 기준 노출 기간 내에 있고, isActive가 true인 팝업 조회
    return await this.popupRepository.find({
      where: [
        {
          isActive: true,
          startDate: Or(IsNull(), LessThanOrEqual(now)),
          endDate: Or(IsNull(), MoreThanOrEqual(now)),
        },
      ],
      order: { priority: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Popup> {
    const popup = await this.popupRepository.findOne({ where: { id } });
    if (!popup) throw new NotFoundException('Popup not found');
    return popup;
  }

  async update(id: string, data: Partial<Popup>): Promise<Popup> {
    await this.popupRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.popupRepository.delete(id);
  }
}
