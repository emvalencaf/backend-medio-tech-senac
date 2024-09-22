import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassService {
    constructor(private readonly prismaService: PrismaService) {}

    // returns all classes the teacher is related to by proxy (subjects)
    async getByTeacherId(teacherId: number) {
        const teacher = await this.prismaService.user.findUnique({
            where: {
                id: teacherId,
                userType: 'TEACHER',
            },
        });

        if (!teacher) throw new NotFoundException('No teacher was found');

        return this.prismaService.class.findMany({
            where: {
                TeachingAssignment: {
                    some: {
                        teacherId,
                    },
                },
            },
        });
    }
}
