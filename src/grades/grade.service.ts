import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGradeDTO } from './dto/create-grade.dto';
import { UserType } from '@prisma/client';
import { PartialUpdateGradeDTO } from './dto/partial-upda-grade.dto';

@Injectable()
export class GradeService {
    constructor(private readonly prismaService: PrismaService) {}

    // update a grade
    async partialUpdate(
        gradeId: number,
        studentId: number,
        teachingAssignmentId: number,
        teacherId: number,
        gradeDTO: PartialUpdateGradeDTO,
    ) {
        // Verifica se o professor existe e se é um professor designado para a turma
        const teacher = await this.prismaService.user.findUnique({
            where: {
                id: teacherId,
                userType: UserType.TEACHER,
                TeachingAssignment: {
                    some: {
                        id: teachingAssignmentId,
                    },
                },
            },
        });

        if (!teacher)
            throw new UnauthorizedException(
                "Teacher doesn't exist or isn't a teacher or teacher wasn't assigned to teach that class",
            );

        // Verifica se o aluno existe e se pertence à turma
        const student = await this.prismaService.user.findUnique({
            where: {
                id: studentId,
                classes: {
                    some: {
                        TeachingAssignment: {
                            some: {
                                id: teachingAssignmentId,
                            },
                        },
                    },
                },
            },
        });

        if (!student)
            throw new BadRequestException(
                "Student doesn't exist or isn't part of the class",
            );

        // Faz o partial update
        await this.prismaService.grade.updateMany({
            where: {
                id: gradeId,
            },
            data: {
                ...gradeDTO, // Aplica os campos fornecidos no DTO
            },
        });

        return {
            message: 'Successfully update student grade',
        };
    }

    // create a grade
    async create(
        studentId: number,
        teachingAssignmentId: number,
        teacherId: number,
        gradeDTO: CreateGradeDTO,
    ) {
        // will find if exist a teacher
        // and if the user is a teacher
        // and if the user was assign to teach subject to the class
        const teacher = await this.prismaService.user.findUnique({
            where: {
                id: teacherId,
                userType: UserType.TEACHER,
                TeachingAssignment: {
                    some: {
                        teacherId,
                    },
                },
            },
        });

        if (!teacher)
            throw new UnauthorizedException(
                "Teacher doesn't exist or isn't a teacher or teacher wasn't assign to teach that class",
            );

        const student = await this.prismaService.user.findUnique({
            where: {
                id: studentId,
                classes: {
                    some: {
                        TeachingAssignment: {
                            some: {
                                id: teachingAssignmentId,
                            },
                        },
                    },
                },
            },
        });

        if (!student)
            throw new BadRequestException(
                "Student doens't exist or isn't of the class",
            );

        return await this.prismaService.grade.create({
            data: {
                grade: gradeDTO.grade, // Enum ou valor para grade
                score: gradeDTO.score, // Número opcional, entre 0 e 10
                avaliation: gradeDTO.avaliation,
                student: {
                    connect: { id: studentId }, // Conectando pelo studentId
                },
                teachingAssignment: {
                    connect: { id: teachingAssignmentId }, // Conectando pelo teachingAssignmentId
                },
            },
        });
    }

    // get all mentions by class id
    async getAllByClassId(classId: number, userId: number, userType: UserType) {
        if (userType === UserType.STUDENT)
            return this.prismaService.grade.findMany({
                where: {
                    student: {
                        id: userId,
                        classes: {
                            some: {
                                id: classId,
                            },
                        },
                    },
                },
                include: {
                    teachingAssignment: {
                        include: {
                            class: {
                                select: {
                                    name: true,
                                    id: true,
                                },
                            },
                            subject: {
                                select: {
                                    name: true,
                                    id: true,
                                },
                            },
                            teacher: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                },
                            },
                        },
                    },
                },
            });

        // show all mentions of the students
        return this.prismaService.grade.findMany({
            where: {
                teachingAssignment: {
                    teacherId: userId,
                    classId: classId,
                },
            },
            include: {
                student: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                teachingAssignment: {
                    include: {
                        class: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                        subject: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                },
            },
        });
    }
}
