import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AnnouncementModule } from './announcements/announcement.module';
import { ClassModule } from './class/class.module';
import { AuthGuard } from './guards/auth.guard';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.development.local', '.env.development'],
        }),
        AnnouncementModule,
        ClassModule,
        UserModule,
        JwtModule,
        AuthModule,
        RedisModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'APP_GUARD',
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
