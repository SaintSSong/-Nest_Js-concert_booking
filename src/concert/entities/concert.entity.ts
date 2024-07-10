import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { ConcertCategory } from '../types/concertCategory.type';
import { ConcertTime } from './concertTime.entity';
import { Booking } from 'src/booking/entities/booking.entity';

@Entity({
  name: 'concert',
})
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'enum', enum: ConcertCategory, nullable: false })
  category: ConcertCategory;

  @Column({ type: 'varchar', nullable: false })
  place: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'int', nullable: false })
  numSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 콘서트타임과의 연관 관계도
  @OneToMany(() => ConcertTime, (concertTimes) => concertTimes.concert)
  concertTimes: ConcertTime[];

  // 부킹과의 연관 관계도
  @OneToMany(() => Booking, (bookings) => bookings.concert)
  bookings: Booking[];
}
