import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { CoordinatorService } from './coordinator.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { PartialUpdateTeachingAssignmentDTO } from './dtos/partial-update-teaching-assignment.dto';

@Controller('coordinators')
export class CoordinatorController {
    constructor(private readonly coordinatorService: CoordinatorService) {}

    @Roles(UserType.COORDINATOR)
    @Get('/assign-teacher-class/:teachingAssignmentId')
    async getTeachingAssignmentId(
        @Param('teachingAssignmentId', ParseIntPipe)
        teachingAssignmentId: number,
    ) {
        return this.coordinatorService.getTeachingAssignmentById(
            teachingAssignmentId,
        );
    }

    @Roles(UserType.COORDINATOR)
    @Patch('/assign-teacher-class/:teachingAssignmentId')
    async partialUpdateTeachingAssignment(
        @Param('teachingAssignmentId', ParseIntPipe)
        teachingAssignmentId: number,
        @Body() updateDTO: PartialUpdateTeachingAssignmentDTO,
    ) {
        return this.coordinatorService.updateAssignTeacherToClass(
            teachingAssignmentId,
            updateDTO,
        );
    }

    @Roles(UserType.COORDINATOR)
    @Delete('/assign-teacher-class/:teachingAssignmentId')
    async deleteTeachingAssignmentById(
        @Param('teachingAssignmentId', ParseIntPipe)
        teachingAssignmentId: number,
    ) {
        return this.coordinatorService.deleteTeachingAssignmentById(
            teachingAssignmentId,
        );
    }

    @Roles(UserType.COORDINATOR)
    @Post(
        '/assign-teacher-class/teachers/:teacherId/classes/:classId/subjects/:subjectId',
    )
    async assignTeacherToClass(
        @Param('teacherId', ParseIntPipe) teacherId: number,
        @Param('classId', ParseIntPipe) classId: number,
        @Param('subjectId', ParseIntPipe) subjectId: number,
    ) {
        return this.coordinatorService.assignTeacherToClass(
            teacherId,
            classId,
            subjectId,
        );
    }

    @Roles(UserType.COORDINATOR)
    @Post('/assign-student-class/students/:studentId/classes/:classId')
    async addStudentToClass(
        @Param('studentId', ParseIntPipe) studentId: number,
        @Param('classId', ParseIntPipe) classId: number,
    ) {
        return this.coordinatorService.addStudentToClass(studentId, classId);
    }

    @Roles(UserType.COORDINATOR)
    @Patch('/assign-student-class/students/:studentId/classes/:classId')
    async removeStudentFromClass(
        @Param('studentId', ParseIntPipe) studentId: number,
        @Param('classId', ParseIntPipe) classId: number,
    ) {
        return this.coordinatorService.removeStudentFromClass(
            studentId,
            classId,
        );
    }
}
