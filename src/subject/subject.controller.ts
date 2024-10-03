import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { CreateSubjectDTO } from './dto/create-subject.dto';

@Controller('subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @Roles(UserType.COORDINATOR)
    @Post()
    async create(@Body() subjectDTO: CreateSubjectDTO) {
        return this.subjectService.create(subjectDTO);
    }

    @Roles(UserType.COORDINATOR, UserType.TEACHER)
    @Get()
    async getAll(@Query('excludeByClassId') excludeByClassId?: string) {
        const classId = excludeByClassId
            ? parseInt(excludeByClassId, 10)
            : undefined; // Converte se necessário

        return this.subjectService.getAll(classId);
    }
}
