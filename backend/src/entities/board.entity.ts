import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum BoardCategory {
  NOTICE = 'notice', // 공지사항
  NEWS = 'news', // 뉴스
  EDUCATION = 'education', // 교육 정보
  GENERAL = 'general', // 일반 게시판
}

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({
    type: 'enum',
    enum: BoardCategory,
    default: BoardCategory.GENERAL,
  })
  category: BoardCategory;

  @Column({ default: 0 })
  viewCount: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column({ nullable: true })
  authorId: string;

  @Column({ nullable: true })
  authorName: string; // 작성자 이름 (탈퇴한 사용자 대비)

  @Column({ type: 'jsonb', nullable: true, default: [] })
  attachments: { name: string; url: string }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

