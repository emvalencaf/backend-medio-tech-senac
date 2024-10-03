import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDTO } from './dto/create-class.dto';
import { UserType } from '@prisma/client';
import { PartialUpdateClassDTO } from './dto/partial-update-class.dto';

@Injectable()
export class ClassService {
    constructor(private readonly prismaService: PrismaService) {}

    async getById(classId: number, showRels: boolean = false) {
        if (showRels)
            return this.prismaService.class.findUnique({
                where: {
                    id: classId,
                },
                include: {
                    TeachingAssignment: {
                        include: {
                            subject: {
                                select: {
                                    name: true,
                                },
                            },
                            teacher: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                },
                            },
                        },
                    },
                },
            });

        return this.prismaService.class.findUnique({
            where: {
                id: classId,
            },
        });
    }

    // partial update a class
    async partialUpdate(classId: number, classDTO: PartialUpdateClassDTO) {
        const newData = {
            ...classDTO,
            updatedAt: new Date(),
        };

        return this.prismaService.class.update({
            data: newData,
            where: {
                id: classId,
            },
        });
    }

    // delete a class
    async deleteById(classId: number) {
        return this.prismaService.class.delete({
            where: {
                id: classId,
            },
        });
    }

    // get all classes by userId
    async getAll(
        userId: number,
        userType: UserType,
        page: number,
        limit: number,
    ) {
        // Calcula o offset para paginação
        const offset = (page - 1) * limit;

        // Define o filtro de busca com base no tipo de usuário
        let whereClause = {};

        if (userType === UserType.COORDINATOR) {
            whereClause = {}; // Coordenadores tem acesso a todas as turmas
        } else if (userType === UserType.TEACHER) {
            whereClause = {
                TeachingAssignment: {
                    some: {
                        teacherId: userId,
                    },
                },
            };
        } else {
            whereClause = {
                students: {
                    some: {
                        id: userId,
                    },
                },
            };
        }

        // Obtém o número total de classes com o filtro aplicado
        const totalClasses = await this.prismaService.class.count({
            where: whereClause,
        });

        // Busca as classes com a paginação aplicada
        const classes = await this.prismaService.class.findMany({
            where: whereClause,
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
            skip: offset, // Ignora os primeiros N registros
            take: Number(limit), // Limita o número de resultados
        });

        // Calcula o total de páginas
        const totalPages = Math.ceil(totalClasses / limit);

        // Retorna a resposta no formato desejado
        return {
            data: classes,
            currentPage: page,
            totalPages: totalPages,
        };
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
