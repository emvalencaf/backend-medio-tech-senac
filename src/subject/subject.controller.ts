import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { PartialUpdateSubjectDTO } from './dto/partial-update-subject.dto';

@Controller('subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) { }

    @Roles(UserType.COORDINATOR)
    @Post()
    async create(@Body() subjectDTO: CreateSubjectDTO) {
        return this.subjectService.create(subjectDTO);
    }

    @Roles(UserType.COORDINATOR, UserType.STUDENT, UserType.TEACHER)
    @Get(':subjectId')
    async getById(@Param('subjectId', ParseIntPipe) subjectId: number) {
        return this.subjectService.getById(subjectId);
    }

    @Roles(UserType.COORDINATOR)
    @Patch(':subjectId')
    async partialUpdate(
        @Param('subjectId', ParseIntPipe) subjectId: number,
        @Body() subjectDTO: PartialUpdateSubjectDTO, // Ensure validation for this DTO
    ) {
        return this.subjectService.partialUpdate(subjectId, subjectDTO);
    }

    @Roles(UserType.COORDINATOR)
    @Delete(':subjectId')
    async deleteById(@Param('subjectId', ParseIntPipe) subjectId: number) {
        return this.subjectService.deleteById(subjectId);
    }

    @Roles(UserType.COORDINATOR, UserType.TEACHER)
    @Get()
    async getAll(
        @Query('excludeByClassId') excludeByClassId?: string,
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
        @Query('noPagination') noPagination: boolean = false,
    ) {
        const classId = excludeByClassId
            ? parseInt(excludeByClassId, 10)
            : undefined; // Converte se necessário

        return this.subjectService.getAll(
            classId,
            parseInt(page),
            parseInt(limit),
            noPagination,
        );
    }
}
