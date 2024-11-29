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

    async getAll(
        userId: number,
        userType: UserType,
        page: number,
        limit: number,
        noPagination: boolean,
    ) {
        // Se não tiver paginação, não use o "skip"
        const offset = noPagination ? 0 : (page - 1) * limit;

        // Define o filtro com base no tipo de usuário
        let whereClause = {};

        if (userType === UserType.COORDINATOR) {
            whereClause = {}; // Coordenadores acessam todas as turmas
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

        // Configurar as opções da query
        const queryOptions: any = {
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
        };

        // Só adiciona paginação se "noPagination" for falso
        if (!noPagination) {
            queryOptions.skip = offset; // "skip" é o offset calculado
            queryOptions.take = limit; // Limite de registros por página
        }

        // Buscar as turmas
        const classes = await this.prismaService.class.findMany(queryOptions);

        // Se "noPagination" for true, não calcula total de páginas
        const totalClasses = noPagination
            ? undefined
            : await this.prismaService.class.count({ where: whereClause });
        const totalPages = noPagination
            ? undefined
            : Math.ceil(totalClasses / limit);

        return {
            data: classes,
            currentPage: noPagination ? null : page,
            totalPages: noPagination ? null : totalPages,
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
