// libs
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';
import { Reflector } from '@nestjs/core';

// services
import { JwtService } from '@nestjs/jwt';

// dtos
import { TokenPayloadDTO } from '../auth/dtos/token-payload.dto';

// types
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { UserType } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) return true;

        const requiredRoles =
            this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]) || [];

        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException('Token not found');

        try {
            const payload: TokenPayloadDTO = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET || 'default_secret',
                },
            );

            if (!payload || !payload.userType) {
                throw new UnauthorizedException('Invalid token payload');
            }

            const currentTime = Math.floor(Date.now() / 1000); // current time in secs

            if (payload.exp < currentTime) {
                throw new UnauthorizedException('Token has expired');
            }

            // if user already sign-out the token was registered in the black list
            if (
                token &&
                (await this.authService.isTokenRevoked(payload.sub, token))
            )
                throw new UnauthorizedException('Invalid token');

            return requiredRoles.some((role) => role === payload.userType);
        } catch (err) {
            console.log(err);
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
        if (!authHeader) return undefined;

        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
}
