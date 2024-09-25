// decorators
import { Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

// dtos
import { CreateAnnouncementDTO } from './dtos/create-announcement.dto';

// types
import { UserType } from '@prisma/client';

@Injectable()
export class AnnouncementService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly redisService: RedisService,
    ) {}

    async listenAnnouncement() {
        const subscriber = await this.redisService.duplicateClient(); // Usando RedisService
        subscriber.subscribe('announcement_channel');
        subscriber.on('message', (channel, message) => {
            console.log(`received message at the ${channel}: ${message}`);
        });
    }

    // Enviar comunicado para uma ou mais turmas
    async sendAnnouncement(
        announcement: CreateAnnouncementDTO,
        classesId: number[],
    ) {
        // Publicar o comunicado usando Redis via RedisService
        await this.redisService.publishMessage(
            'announcement_channel',
            JSON.stringify(announcement),
        );

        return this.prismaService.announcement.create({
            data: {
                title: announcement.title,
                content: announcement.content,
                authorId: 2, // é preciso refatorar quando estiver feito a autenticação e autorização
                createdAt: new Date(),
                classes: {
                    connect: classesId.map((id) => ({ id })), // Conectando as turmas ao comunicado
                },
            },
            include: {
                classes: false, // Se você quiser incluir as turmas associadas no retorno
            },
        });
    }

    async readAnnouncements(
        userId: number,
        userType: UserType,
        title?: string,
        author?: string,
        order: 'asc' | 'desc' = 'desc',
        page: number = 1,
        limit: number = 10,
    ) {
        const whereClause: any = {};

        if (userType !== 'COORDINATOR') {
            if (userType === 'STUDENT') {
                whereClause.classes = {
                    some: {
                        students: {
                            some: {
                                id: userId,
                            },
                        },
                    },
                };
            } else {
                whereClause.author = {
                    id: userId,
                };
            }
        }

        if (title) {
            whereClause.title = {
                contains: title,
                mode: 'insensitive',
            };
        }

        if (author) {
            whereClause.author = {
                contains: author,
                mode: 'insensitive',
            };
        }

        // calc offset pages limit
        const offset = (page - 1) * limit;

        const announcements = await this.prismaService.announcement.findMany({
            where: whereClause,
            orderBy: {
                createdAt: order, // Ordenação baseada na data de criação
            },
            include: {
                author: {
                    select: {
                        lastName: true,
                        firstName: true,
                        userType: true,
                    },
                },
                classes: {
                    select: {
                        name: true,
                        semester: true,
                        year: true,
                    },
                },
            },
            skip: offset, // Ignora os primeiros N registros
            take: Number(limit), // Limita o número de resultados
        });

        // count total announcements
        const totalAnnouncements = await this.prismaService.announcement.count({
            where: whereClause,
        });

        return {
            data: announcements,
            currentPage: page,
            totalPages: Math.ceil(totalAnnouncements / limit),
        };
    }
}
