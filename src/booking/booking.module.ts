import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Concert } from 'src/concert/entities/concert.entity';
import { ConcertTime } from 'src/concert/entities/concertTime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Concert, ConcertTime])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
