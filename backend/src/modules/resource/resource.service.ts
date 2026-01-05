import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '../../entities/resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async create(createDto: Partial<Resource>): Promise<Resource> {
    const resource = this.resourceRepository.create(createDto);
    return await this.resourceRepository.save(resource);
  }

  async findAll(query: any): Promise<{ data: Resource[]; total: number }> {
    const { page = 1, limit = 10, category, search } = query;
    const skip = (page - 1) * limit;

    const qb = this.resourceRepository.createQueryBuilder('resource');

    if (category) {
      qb.andWhere('resource.category = :category', { category });
    }

    if (search) {
      qb.andWhere('resource.title LIKE :search', { search: `%${search}%` });
    }

    qb.orderBy('resource.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total };
  }

  async findOne(id: string): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (resource) {
      resource.viewCount += 1;
      await this.resourceRepository.save(resource);
    }
    return resource;
  }

  async update(id: string, updateDto: Partial<Resource>): Promise<Resource> {
    await this.resourceRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.resourceRepository.delete(id);
  }
}
