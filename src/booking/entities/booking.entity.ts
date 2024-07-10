import { Concert } from 'src/concert/entities/concert.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'booking',
})
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number;

  @Column({ name: 'concert_id', type: 'int', nullable: false })
  concertId: number;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 유저랑 관계도
  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  // 콘서트랑 관계도
  @ManyToOne(() => Concert, (concert) => concert.bookings)
  @JoinColumn({ name: 'concert_id', referencedColumnName: 'id' })
  concert: Concert;
}
