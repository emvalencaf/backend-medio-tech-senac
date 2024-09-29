// decorators
import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';

// services
import { AnnouncementService } from './announcement.service';

// dtos
import { CreateAnnouncementDTO } from './dtos/create-announcement.dto';
import { UserId } from '../decorators/user-id.decorator';
import { UserRole } from '../decorators/user-type.decorator';
import { UserType } from '@prisma/client';
import { Public } from '../decorators/is-public.decorator';

@Controller('announcements')
export class AnnouncementController {
    constructor(private readonly announcementService: AnnouncementService) {}

    @Post('send/:classIds')
    async sendAnnouncement(
        @Param('classIds') classIds: string,
        @Body() announcement: CreateAnnouncementDTO,
    ) {
        const arrIds = classIds.split(',').map((id) => parseInt(id));

        return this.announcementService.sendAnnouncement(announcement, arrIds);
    }

    @Public()
    @Get('read')
    async readAnnouncements(
        @UserId('userId') userId: number,
        @UserRole('userType') userType: UserType,
        @Query('title') title?: string,
        @Query('author') author?: string,
        @Query('order') order: 'asc' | 'desc' = 'desc',
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.announcementService.readAnnouncements(
            Number(userId),
            userType,
            title,
            author,
            order,
            Number(page),
            Number(limit),
        );
    }
}
