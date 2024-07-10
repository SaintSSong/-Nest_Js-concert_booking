import _ from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByEmail(payload.email);
    if (_.isNil(user)) {
      throw new NotFoundException('해당하는 사용자를 찾을 수 없습니다.');
    }

    // console.log('jwt@@@@@', user);

    return user;
  }
}

// 당장은 외우자.
// @UseGuards(AuthGuard('jwt')) <- 이게 동작 즉 선언이 되면.
// JwtStrategy의 super가 동작을 한다.
// jwt에 대한 유효성 검사를 시작한다.
// 그 과정은 아무도 모른다. 가시적이지 않다. nestJs의 내부에서 돌아간다.
// super가 끝나면 즉 유효성 검사가 끝나면 validate함수를 호출한다.
// 이 때 매개변수로는 유효성 검사가 끝난 후의 jwt의 payload 값을 넣어준다.
// payload 값을 기반으로 user 정보를 찾고 그 유저 정보를 req.user에다가 정보를 넣어준다.
// req.user라는 것이 눈에 보이지 않지만 그렇게 동작을 한다.

// 핵심.
// 한줄 요약 사용자가 입력한 jwt에 대한 유효성 검사를 하고 jwt에 든 데이터를 기반으로 user 데이터를 찾아서
// req.user한테 user값을 넘겨준다.  주의 userInfo로 가는거 아님

// req.user라는 공간이 안보이지만 존재하는데 JwtStrategy라는게 return 에 대한 값을 넣는다. 끝!
