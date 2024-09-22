// decorators
import { Controller, Post, Body, Param, Get } from '@nestjs/common';

// services
import { AnnouncementService } from './announcement.service';

// dtos
import { CreateAnnouncementDTO } from './dtos/create-announcement.dto';

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

    @Get('read/:classId')
    async readAnnouncements(@Param('classId') classId: number) {
        return this.announcementService.readAnnouncements(Number(classId));
    }
}
