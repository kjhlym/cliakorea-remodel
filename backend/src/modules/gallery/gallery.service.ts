import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from '../../entities/gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
  ) {}

  async create(createGalleryDto: { title: string; images: string[]; category?: string; eventDate?: any }): Promise<Gallery> {
    try {
        // 빈 문자열이 들어오면 null로 처리 to avoid DB error
        if (createGalleryDto.eventDate === "") {
            createGalleryDto.eventDate = null;
        }
        const gallery = this.galleryRepository.create(createGalleryDto);
        return await this.galleryRepository.save(gallery);
    } catch (e) {
        throw new Error(`Create Error: ${e.message}`);
    }
  }

  async findAll(query: any): Promise<{ data: Gallery[]; total: number }> {
    try {
      const { page = 1, limit = 12, category, search } = query;
      const skip = (page - 1) * limit;

      const qb = this.galleryRepository.createQueryBuilder('gallery');

      if (category && category !== '전체') {
        qb.andWhere('gallery.category = :category', { category });
      }

      if (search) {
        qb.andWhere('gallery.title LIKE :search', { search: `%${search}%` });
      }

      qb.orderBy('gallery.eventDate', 'DESC')
        .addOrderBy('gallery.createdAt', 'DESC')
        .skip(skip)
        .take(limit);

      const [data, total] = await qb.getManyAndCount();

      return { data, total };
    } catch (e) {
      console.error(e);
      throw new Error(`Gallery Error: ${e.message}`);
    }
  }

  async findOne(id: string): Promise<Gallery> {
    return this.galleryRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.galleryRepository.delete(id);
  }
}
