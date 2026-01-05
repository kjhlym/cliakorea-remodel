import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ResourceCategory {
  GENERAL = 'general', // 일반 자료실
  BOOKS = 'books', // 추천도서목록
  MATERIALS = 'materials', // 교구자료
}

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ResourceCategory,
    default: ResourceCategory.GENERAL,
  })
  category: ResourceCategory;

  @Column()
  title: string;

  @Column({ nullable: true })
  author: string; // 추천도서의 경우 저자

  @Column('text', { nullable: true })
  content: string; // 설명 또는 내용

  @Column({ nullable: true })
  imageUrl: string; // 추천도서 표지 또는 자료 썸네일

  @Column({ type: 'jsonb', nullable: true, default: [] })
  attachments: { name: string; url: string }[]; // 첨부파일

  @Column({ default: 0 })
  viewCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
