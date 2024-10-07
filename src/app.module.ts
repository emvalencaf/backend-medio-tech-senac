// decorators
import { Module } from '@nestjs/common';

// modules
import { AnnouncementModule } from './announcements/announcement.module';
import { ClassModule } from './class/class.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { SubjectModule } from './subject/subject.module';
import { GradeModule } from './grades/grade.module';
import { NotificationModule } from './notifications/notification.module';

// controllers
import { AppController } from './app.controller';

// services
import { AppService } from './app.service';

// guards
import { AuthGuard } from './guards/auth.guard';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.development.local', '.env.development', '.env'],
        }),
        AnnouncementModule,
        ClassModule,
        UserModule,
        JwtModule,
        AuthModule,
        RedisModule,
        SubjectModule,
        GradeModule,
        NotificationModule,
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
