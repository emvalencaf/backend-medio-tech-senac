// decorators
import { Module } from '@nestjs/common';

// services
import { AnnouncementService } from './announcement.service';

// controllers
import { AnnouncementController } from './announcement.controller';

// modules
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { NotificationModule } from '../notifications/notification.module';

@Module({
    imports: [PrismaModule, RedisModule, NotificationModule],
    providers: [AnnouncementService],
    controllers: [AnnouncementController],
})
export class AnnouncementModule {}
