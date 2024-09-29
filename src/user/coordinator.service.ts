import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserType } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CoordinatorService {
    constructor(private readonly prismaService: PrismaService) {}

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
