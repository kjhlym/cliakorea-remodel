import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('galleries')
export class Gallery {
  // 갤러리 테이블
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text', { array: true, default: [] })
  images: string[];

  @Column({ nullable: true })
  category: string; // e.g., '활동', '행사', etc.

  @Column({ type: 'date', nullable: true })
  eventDate: Date; // The date displayed on the card (2025-10-15 etc)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
