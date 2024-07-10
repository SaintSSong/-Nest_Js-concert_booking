import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertDto } from './dto/concert.dto';

import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';
import { ConcertCategory } from './types/concertCategory.type';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  // 공연 등록 관련 API 미완성

  @UseGuards(RolesGuard)
  @Roles(Role.User)
  // 16,17번 줄이 제한을 걸어두는 것
  @Post()
  async register(@Body() concertDto: ConcertDto) {
    const newConcert = await this.concertService.concertRegister(concertDto);
    return {
      message: '공연 등록에 성공했습니다.',
      data: newConcert,
    };
  }

  // 공연 전체 조회 API

  // URL을 "check"으로 만들거야
  // QUERY PARAMETERS
  @Get('findAll')
  async findAll(@Query('category') category: ConcertCategory) {
    return await this.concertService.concertCheck(category);
  }

  // 공연 상세 조회 API

  // 특정 조회를 할 것이면 url창에 조건을 적어야하는 것이고
  // 우리는 그것을 "id"라고 할 것인데 이것이 뭐냐? express에서 썼던 req.param이다.
  // 근데 typescript이나 nestJS에서는 명시적으로 박아놔야하니까
  // Param을 쓸꺼야 <- (@Param)이고 이 Param에서는 특정 문자("id")를 받아야 실행 될거야.
  // 그리고 이 특정 문자의 타입은 바로 옆에 내가 지정할꺼야(Number)
  // URl에 기본적으로 concert들어가는거는 9번째 줄에서 가는거야
  // 우리는 :id를 통해서 concert/"5" 얘만 넣으면 되는거야
  // PATH PARAMETERS
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.concertService.concertFindOne(id);
  }

  // 공연 검색 조회 API

  // QUERY PARAMETERS
  @Get()
  async search(@Query('name') name: string) {
    return await this.concertService.concertSearch(name);
  }
}
