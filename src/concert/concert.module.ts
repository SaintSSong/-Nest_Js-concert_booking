import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { ConcertTime } from './entities/concertTime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concert, ConcertTime])],
  providers: [ConcertService],
  controllers: [ConcertController],
})
export class ConcertModule {}
