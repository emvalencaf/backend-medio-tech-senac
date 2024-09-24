import { createParamDecorator } from '@nestjs/common';

import { ExecutionContext } from '@nestjs/common';
import { authorizationToSignInPayload } from '../utils/base-64-convert.util';

export const UserRole = createParamDecorator((_, ctx: ExecutionContext) => {
    let { authorization } = ctx.switchToHttp().getRequest().headers;

    // get an access token
    authorization = authorization.includes('Bearer')
        ? authorization.split(' ')[1]
        : authorization;

    const signInPayload = authorizationToSignInPayload(authorization);

    return signInPayload.userType;
});
