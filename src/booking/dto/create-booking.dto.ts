import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  // 공연 이름 검증: 문자열인지 확인하고 비어있지 않은지 확인
  @IsInt()
  @IsNotEmpty({ message: 'UserId를 입력해주세요.' })
  userId: number;

  @IsInt()
  @IsNotEmpty({ message: 'concertId를 입력해주세요.' })
  concertId: number;

  // 공연 가격 검증: 숫자인지 확인하고 비어있지 않은지 확인
  @IsInt()
  @IsNotEmpty({ message: '공연 가격을 입력해주세요.' })
  price: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: '날짜와 시간을 입력해주세요.' })
  date: Date;

  @IsInt()
  @IsNotEmpty({ message: '공연의 좌석 수를 입력해주세요.' })
  concertSeats: number;
}
