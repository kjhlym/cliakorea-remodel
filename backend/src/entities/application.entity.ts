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

export enum ApplicationStatus {
  PENDING = 'pending', // 대기 중
  APPROVED = 'approved', // 승인됨
  REJECTED = 'rejected', // 거절됨
  COMPLETED = 'completed', // 완료됨
}

export enum ProgramType {
  CHILDREN = 'children', // 어린이 리더십
  YOUTH = 'youth', // 청소년 리더십
  PARENT = 'parent', // 부모 리더십
  SPECIALIZED = 'specialized', // 특화 프로그램
}

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ProgramType,
  })
  programType: ProgramType;

  @Column()
  programName: string;

  @Column()
  applicantName: string;

  @Column()
  applicantEmail: string;

  @Column()
  applicantPhone: string;

  @Column('text', { nullable: true })
  message: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

