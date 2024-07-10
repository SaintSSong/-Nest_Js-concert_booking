import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { Repository } from 'typeorm';

import { ConflictException } from '@nestjs/common';
import { ConcertDto } from './dto/concert.dto';
import { ConcertTime } from './entities/concertTime.entity';
import { ConcertCategory } from './types/concertCategory.type';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
    @InjectRepository(ConcertTime)
    private concertTimeRepository: Repository<ConcertTime>,
  ) {}

  // 조건을 바꿔야함. 이름 하나만이 아니라 (이름과 끝 시간)으로 조건을 걸어야한다.
  // 공연 등록 API
  async concertRegister(concertDto: ConcertDto) {
    const { schedule } = concertDto;

    // Db에 같은 시간의 콘서트가 존재하는지 확인
    const existingConcert = await this.findByConcert(schedule);

    if (existingConcert) {
      throw new ConflictException(
        '이미 해당 공연 시간으로 등록된 공연이 있습니다.',
      );
    }

    // concert테이블에 신 콘서트를 등록하는 작업
    const newConcert = await this.concertRepository.save(concertDto);

    // 콘서트 타임 테이블에 넣을 데이터 형식
    const concertTimeDto = {
      concertId: newConcert.id,
      startTime: schedule,
      endTime: new Date(schedule.getTime() + 60 * 60 * 1000 * 2),
    };

    // 콘서트 타임 테이블에 등록
    await this.concertTimeRepository.save(concertTimeDto);

    // 신규 콘서트 컨트롤러로 반환
    return newConcert;
  }

  // 공연 전체 조회 API
  async concertCheck(category: ConcertCategory | undefined) {
    // | <- 유니온 타입 = 합집합. n개 중에 하나라도 (아무거나여도) 통과 조건만 맞으면 통과
    // 조회를 할거야 그럼 뭘로 조회를 할꺼야?
    // 어떤게 DB에 들어가지? 엔티티에 적혀 있는게 들어갈거야
    // 그러면 공통적으로 가져 나올게 뭐가 있을까? id, name, place, price 정도?
    // select를 쓰는 이유 find 즉 찾긴 찾을 것인데 내가 원하는 요소들만 찾을 거야
    // []을 왜 쓰는거야? {}를 쓰면 안돼? 그 이유는 typeORM에서 내장된 규칙이다.

    /** 공연 조회 할 때
     *  전체 조회는 가능
     *  카테고리별로 조회 가능 <- 카테고리별?? 그럼 어떻게 해야하지?
     *  카테고리별로 조회 되로록 함수를 하나 만들어서 || 로 해야하나?
     *  특정 Param으로 "카테고리" 넣으면 카테고리만 되도록?
     */
    return await this.concertRepository.find({
      select: ['id', 'name', 'place', 'price', 'category'],
      where: { category },
    });
  }

  // 공연 검색 조회 API
  async concertSearch(name: string) {
    return await this.concertRepository.findBy({ name: name });
  }

  // 공연 상세 조회 API 미완성()
  // 이상하다? 이렇게 쉽게?? 그럴리가 없는데?
  async concertFindOne(id: number) {
    return await this.concertRepository.findOneBy({ id });
  }

  // create할 때 중복 시간이 존재하는지 검증하는 함수
  async findByConcert(startTime: Date) {
    return await this.concertRepository.findOne({
      relations: {
        concertTimes: true,
      },
      where: {
        concertTimes: {
          startTime,
        },
      },
    });
  }
}
