import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Concert } from './concert.entity';

@Entity({
  name: 'concertTime',
})
export class ConcertTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'concert_id', type: 'int', nullable: false })
  concertId: number;

  @Column({ name: 'start_time', type: 'timestamp', nullable: false })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamp', nullable: false })
  endTime: Date;

  @Column({ name: 'rest_seats', type: 'int', nullable: false })
  restSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Concert, (concert) => concert.concertTimes)
  @JoinColumn({ name: 'concert_id', referencedColumnName: 'id' })
  concert: Concert;
}
