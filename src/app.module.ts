import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AnnouncementModule } from './announcements/announcement.module';
import { ClassModule } from './class/class.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.development.local', '.env.development'],
        }),
        AnnouncementModule,
        ClassModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
