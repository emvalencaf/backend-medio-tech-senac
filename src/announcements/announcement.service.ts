// decorators
import { Injectable, OnModuleInit } from '@nestjs/common';

// services
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

// dtos
import { CreateAnnouncementDTO } from './dtos/create-announcement.dto';

// types
import { UserType } from '@prisma/client';

// gateways
import { NotificationsGateway } from '../notifications/notification.gateway';
import { ReturnedAnnouncementDTO } from './dtos/returned-announcement.dto';

@Injectable()
export class AnnouncementService implements OnModuleInit {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly redisService: RedisService,
        private readonly notificationsGateway: NotificationsGateway, // Injete o gateway
    ) {}

    async onModuleInit() {
        await this.redisService.subscribe('announcement_channel', (message) => {
            console.log(`Notificação recebida: ${message}`);
            this.notificationsGateway.sendNotification(message); // Envie a notificação via WebSocket
        });
    }

    // Enviar comunicado para uma ou mais turmas
    async sendAnnouncement(
        authorId: number,
        announcement: CreateAnnouncementDTO,
        classesId: number[],
    ) {
        const res = await this.prismaService.announcement.create({
            data: {
                title: announcement.title,
                content: announcement.content,
                authorId,
                createdAt: new Date(),
                classes: {
                    connect: classesId.map((id) => ({ id })), // Conectando as turmas ao comunicado
                },
            },
            include: {
                author: {
                    select: {
                        firstName: true,
                        lastName: true,
                        userType: true,
                    },
                },
                classes: {
                    select: {
                        id: true,
                    },
                }, // Se você quiser incluir as turmas associadas no retorno
            },
        });
        console.log(res);
        const returnedAnnouncement = new ReturnedAnnouncementDTO(res);

        // Publicar o comunicado usando Redis via RedisService
        await this.redisService.publishMessage(
            `announcement_channel`,
            JSON.stringify(returnedAnnouncement),
        );

        return returnedAnnouncement;
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
