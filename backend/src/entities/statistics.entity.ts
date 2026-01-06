import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Statistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '2,000+' })
  instructorCount: string;

  @Column({ default: '50+' })
  programCount: string;

  @Column({ default: '15+' })
  partnerCount: string;

  @Column({ default: '16년' })
  historyYears: string;
}
