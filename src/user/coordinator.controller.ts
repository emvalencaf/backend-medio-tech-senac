import { Controller, Param, Post } from '@nestjs/common';
import { CoordinatorService } from './coordinator.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '@prisma/client';

@Controller('coordinators')
export class CoordinatorController {
    constructor(private readonly coordinatorService: CoordinatorService) {}

    @Roles(UserType.COORDINATOR)
    @Post(
        '/assign-teacher-class/teachers/:teacherId/classes/:classId/subjects/:subjectId',
    )
    async assignTeacherToClass(
        @Param('teacherId') teacherId: number,
        @Param('classId') classId: number,
        @Param('subjectId') subjectId: number,
    ) {
        return this.coordinatorService.assignTeacherToClass(
            Number(teacherId),
            Number(classId),
            Number(subjectId),
        );
    }

    @Roles(UserType.COORDINATOR)
    @Post('/assign-student-class/students/:studentId/classes/:classId')
    async addStudentToClass(
        @Param('studentId') studentId: number,
        @Param('classId') classId: number,
    ) {
        return this.coordinatorService.addStudentToClass(
            Number(studentId),
            Number(classId),
        );
    }
}
