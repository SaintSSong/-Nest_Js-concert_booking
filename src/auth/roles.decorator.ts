import { Role } from 'src/user/types/userRole.type';

import { SetMetadata } from '@nestjs/common';

// const "Roles"가 데코레이터 이름!!
// Roles 라는 데이터에 여러 개의 Role[]의 데이터를 넣는다!
// Role[]이란 무엇이냐? userRole에서 정한 role을 말한다. (User,Admin) 이것

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
