import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { ConcertTime } from 'src/concert/entities/concertTime.entity';
import { Concert } from 'src/concert/entities/concert.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
    @InjectRepository(ConcertTime)
    private concertTimeRepository: Repository<ConcertTime>,
  ) {}

  //공연 예매 API
  async createBooking(createBookingDto: CreateBookingDto) {
    const { concertId } = createBookingDto;

    const runningConcert = await this.findConcertById(concertId);
    if (!runningConcert) {
      throw new ConflictException('입력하신 Id의 공연이 없습니다.');
    }

    const newBooking = await this.bookingRepository.save(createBookingDto);
    return newBooking;
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }

  // DB에 공연 id로 검색해서 된게 있는지 확인.
  async findConcertById(id: number) {
    return await this.concertRepository.findBy({ id });
  }

  //
}
