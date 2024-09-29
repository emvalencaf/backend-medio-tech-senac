import { Controller, Post, Query } from '@nestjs/common';
import { CoordinatorService } from './coordinator.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '@prisma/client';

@Controller('coordinators')
export class CoordinatorController {
    constructor(private readonly coordinatorService: CoordinatorService) {}

    @Roles(UserType.COORDINATOR)
    @Post('/assign-teacher-class')
    async assignTeacherToClass(
        @Query('teacherId') teacherId: number,
        @Query('classId') classId: number,
        @Query('subjectId') subjectId: number,
    ) {
        return this.coordinatorService.assignTeacherToClass(
            Number(teacherId),
            Number(classId),
            Number(subjectId),
        );
    }
}
