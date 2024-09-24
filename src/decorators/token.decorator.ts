import { createParamDecorator } from '@nestjs/common';

import { ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator((_, ctx: ExecutionContext) => {
    let { authorization } = ctx.switchToHttp().getRequest().headers;

    // get an access token
    authorization = authorization.includes('Bearer')
        ? authorization.split(' ')[1]
        : authorization;

    return authorization;
});
