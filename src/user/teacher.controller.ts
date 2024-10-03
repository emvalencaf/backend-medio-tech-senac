import {
    Controller,
    DefaultValuePipe,
    Get,
    ParseBoolPipe,
    Query,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '@prisma/client';

@Controller('/teachers')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Roles(UserType.COORDINATOR, UserType.TEACHER)
    @Get()
    async getAll(
        @Query('showRels', new DefaultValuePipe(false), ParseBoolPipe)
        showRels: boolean = false,
    ) {
        return this.teacherService.getAll(showRels);
    }
}
