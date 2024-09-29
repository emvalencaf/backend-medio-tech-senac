import { Body, Controller, Post } from '@nestjs/common';
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
}
