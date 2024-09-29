import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDTO } from './dto/create-classes.dto';
import { UserType } from '@prisma/client';

@Injectable()
export class ClassService {
    constructor(private readonly prismaService: PrismaService) {}

    // get all classes by userId
    async getAll(userId: number, userType: UserType) {
        if (userType === UserType.TEACHER)
            return this.prismaService.class.findMany({
                where: {
                    TeachingAssignment: {
                        some: {
                            teacherId: userId,
                        },
                    },
                },
                include: {
                    students: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                    TeachingAssignment: {
                        include: {
                            subject: {
                                select: {
                                    id: true,
                                    name: true,
                                    description: true,
                                },
                            },
                        },
                    },
                },
            });

        return this.prismaService.class.findMany({
            where: {
                students: {
                    some: {
                        id: userId,
                    },
                },
            },
            include: {
                TeachingAssignment: {
                    include: {
                        teacher: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                        subject: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                            },
                        },
                    },
                },
            },
        });
    }

    // create class
    async create(classDTO: CreateClassDTO) {
        return this.prismaService.class.create({
            data: classDTO,
        });
    }

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
