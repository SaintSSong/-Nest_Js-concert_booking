import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user ? request.user : null;
  },
);

// 유저 객체에 접근하는 메서드

// 핵심
// req.user라는곳에 데이터가 있으면 req.user를 반환하고
// 없으면 null 값을 반환한다.

//  함수면 return값을 반환한다.
// 정확한건 아니지만 UserInfo는 함수의 성격을 띄는 것 같다.
// 함수라는 것은 입력이 들어가면 반환을 한다.
