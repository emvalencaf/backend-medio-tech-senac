import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserType } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PartialUpdateTeachingAssignmentDTO } from './dtos/partial-update-teaching-assignment.dto';

@Injectable()
export class CoordinatorService {
    constructor(private readonly prismaService: PrismaService) {}

    // add a student to a class
    async addStudentToClass(studentId: number, classId: number) {
        // Verifica se o estudante existe
        const student = await this.prismaService.user.findUnique({
            where: {
                id: studentId,
            },
        });

        if (!student) {
            throw new NotFoundException('Student not found');
        }

        // Verifica se a classe existe
        const classExists = await this.prismaService.class.findUnique({
            where: {
                id: classId,
            },
        });

        if (!classExists) {
            throw new NotFoundException('Class not found');
        }

        // Adiciona o estudante à turma (usando o método connect para relacionar os IDs)
        await this.prismaService.class.update({
            where: {
                id: classId,
            },
            data: {
                students: {
                    connect: { id: studentId },
                },
            },
        });

        return { message: 'Student added to class successfully' };
    }

    async getTeachingAssignmentById(teachingAssignmentId: number) {
        return this.prismaService.teachingAssignment.findUnique({
            where: {
                id: teachingAssignmentId,
            },
            include: {
                teacher: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
                subject: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async deleteTeachingAssignmentById(teachingAssignmentId: number) {
        return this.prismaService.teachingAssignment.delete({
            where: {
                id: teachingAssignmentId,
            },
        });
    }

    async updateAssignTeacherToClass(
        teachingAssignmentId: number,
        updateDTO: PartialUpdateTeachingAssignmentDTO,
    ) {
        return this.prismaService.teachingAssignment.update({
            where: {
                id: teachingAssignmentId,
            },
            data: {
                teacherId: updateDTO.teacherId && Number(updateDTO.teacherId),
                subjectId: updateDTO.subjectId && Number(updateDTO.subjectId),
            },
        });
    }

    // assign a teacher to a class and a subject
    async assignTeacherToClass(
        teacherId: number,
        classId: number,
        subjectId: number,
    ) {
        const teacher = await this.prismaService.user.findUnique({
            where: {
                id: teacherId,
            },
        });

        if (!teacher || teacher.userType !== UserType.TEACHER)
            throw new BadRequestException(
                "Only teacher can be assign to teach a class or user doesn't exist",
            );

        try {
            return await this.prismaService.teachingAssignment.create({
                data: {
                    classId,
                    teacherId,
                    subjectId,
                },
            });
        } catch (err) {
            // database error
            if (err instanceof PrismaClientKnownRequestError)
                throw new BadRequestException(
                    'Only one teacher can be the teacher of a same class and subject',
                );
            // generic error
            throw err;
        }
    }
}
