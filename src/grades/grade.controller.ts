import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDTO } from './dto/create-grade.dto';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../decorators/user-type.decorator';

@Controller('grades')
export class GradeController {
    constructor(private readonly gradeService: GradeService) {}

    @Roles(UserType.TEACHER, UserType.STUDENT)
    @Get('classes/:classId')
    async getAllByClass(
        @Param('classId') classId: number,
        @UserId() userId: number,
        @UserRole() userType: UserType,
    ) {
        return this.gradeService.getAllByClassId(
            Number(classId),
            Number(userId),
            userType,
        );
    }

    @Roles(UserType.TEACHER)
    @Post('students/:studentId/assign-teacher-class/:teachingAssignmentId')
    async create(
        @Param('studentId') studentId: number,
        @Param('teachingAssignmentId') teachingAssignmentId: number,
        @UserId('teacherId') teacherId: number,
        @Body() gradeDTO: CreateGradeDTO,
    ) {
        return this.gradeService.create(
            Number(studentId),
            Number(teachingAssignmentId),
            Number(teacherId),
            {
                score: Number(gradeDTO.score),
                grade: gradeDTO.grade,
                avaliation: Number(gradeDTO.avaliation),
            },
        );
    }

    @Roles(UserType.TEACHER)
    @Patch(
        ':gradeId/students/:studentId/assign-teacher-class/:teachingAssignmentId',
    )
    async partialUpdade(
        @Param('gradeId') gradeId: number,
        @Param('studentId') studentId: number,
        @Param('teachingAssignmentId') teachingAssignmentId: number,
        @UserId('teacherId') teacherId: number,
        @Body() gradeDTO: CreateGradeDTO,
    ) {
        return this.gradeService.partialUpdate(
            Number(gradeId),
            Number(studentId),
            Number(teacherId),
            Number(teachingAssignmentId),
            {
                score: Number(gradeDTO.score),
                grade: gradeDTO.grade,
                avaliation: Number(gradeDTO.avaliation),
            },
        );
    }
}
