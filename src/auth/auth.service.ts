// decorators
import { Injectable, UnauthorizedException } from '@nestjs/common';

// services
import { JwtService } from '@nestjs/jwt';

// dtos
import { SignInUserDto } from './dtos/sign-in-user.dto';

// utils
import * as bcrypt from 'bcrypt';
import { TokenPayloadDTO } from './dtos/token-payload.dto';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { RedisService } from '../redis/redis.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly redisService: RedisService,
    ) {}

    // Sign in as a user
    async signIn(signIn: SignInUserDto) {
        const user = await this.validateUserPassword(signIn);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = this.jwtService.sign({
            iss: 'backend-nestjs',
            sub: user.id,
            aud: 'backend-nextjs',
            userType: user.userType,
        });

        return {
            user: {
                name: user.firstName,
                email: user.email,
            },
            accessToken: accessToken,
        };
    }

    // Get token expiration date from JWT
    async getTokenExpiration(token: string): Promise<Date> {
        const decodedToken = this.jwtService.decode(token) as {
            exp: number;
        } | null;

        if (decodedToken && decodedToken.exp) {
            return new Date(decodedToken.exp * 1000);
        } else {
            throw new Error('Invalid token or missing expiration field');
        }
    }

    // Validate user credentials
    async validateUserPassword(signIn: SignInUserDto): Promise<User | null> {
        const user = await this.userService.getByEmail({
            email: signIn.email,
            showPassword: true,
        });

        if (!user) throw new UnauthorizedException('Invalid email');

        const isMatch = await bcrypt.compare(signIn.password, user.password);

        return isMatch ? user : null;
    }

    // sign up an user
    async signUp(signUp: CreateUserDto) {
        return this.userService.create(signUp);
    }

    // sign out an user
    async signOut(userId: number, token: string): Promise<void> {
        // get token expiration
        const { exp }: TokenPayloadDTO = await this.jwtService.verifyAsync(
            token,
            {
                secret: process.env.JWT_SECRET || 'default_secret',
            },
        );
        // set token in the black list on redis (the token will be blacklisted with time to live equal to token's exp)
        await this.redisService.revokeToken(userId, token, exp);
    }

    async isTokenRevoked(userId: number, token: string): Promise<boolean> {
        return await this.redisService.isTokenRevoked(userId, token);
    }
}
