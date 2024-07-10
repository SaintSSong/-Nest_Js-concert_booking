import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

// API 경로를 뜻하는 것 같다.
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입 관련 API
  @Post('sign-up')
  async signUp(@Body() SignupDto: SignUpDto) {
    return await this.userService.signUp(
      SignupDto.email,
      SignupDto.password,
      SignupDto.nickname,
    );
  }

  // 로그인 관련 API
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  // 프로필 조회 API
  @UseGuards(AuthGuard('jwt')) //JwtStrategy 동작을 하는 것임.
  @Get('profile')
  async profile(@UserInfo() user: User) {
    return await this.userService.profile(user);
  }

  // jwt를 통해서 인증된 user만 getEmail를 호출 할 수 있도록 만든 API
  // 실제 사용은 무쓸모이지만 되는지 안되는지 보여줄라고 있는 것
  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }
}
