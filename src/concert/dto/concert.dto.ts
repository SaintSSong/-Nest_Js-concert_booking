import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsDate, IsString, IsEnum } from 'class-validator';
import { ConcertCategory } from '../types/concertCategory.type';

export class ConcertDto {
  // 공연 이름 검증: 문자열인지 확인하고 비어있지 않은지 확인
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  name: string;

  // 공연 설명 검증: 문자열인지 확인하고 비어있지 않은지 확인
  @IsString()
  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  description: string;

  // 공연 카테고리 검증: 문자열인지 확인하고 비어있지 않은지 확인
  @IsEnum(ConcertCategory)
  @IsNotEmpty({
    message: '공연 카테고리를 입력해주세요. movie or music or comedy',
  })
  category: ConcertCategory;

  // 공연 장소 검증: 문자열인지 확인하고 비어있지 않은지 확인
  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  place: string;

  // 공연 가격 검증: 숫자인지 확인하고 비어있지 않은지 확인
  @IsInt()
  @IsNotEmpty({ message: '공연 가격을 입력해주세요.' })
  price: number;

  // 공연 이미지 검증: 문자열인지 확인하고 비어있지 않은지 확인
  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
  image: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: '날짜와 시간을 입력해주세요.' })
  schedule: Date;

  @IsInt()
  @IsNotEmpty({ message: '공연의 좌석 수를 입력해주세요.' })
  numSeats: number;
}
