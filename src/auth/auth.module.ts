// decorators
import { Module } from '@nestjs/common';

// modules
import { JwtModule } from '@nestjs/jwt';

// controllers

import { AuthController } from './auth.controller';
// services
import { AuthService } from './auth.service';
import { RedisModule } from '../redis/redis.module';
import { UserModule } from '../user/user.module';

// entities

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET || 'default_secret',
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRES_IN || '3600S',
                },
            }),
        }),
        RedisModule,
        UserModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
