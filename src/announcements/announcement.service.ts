// decorators
import { Inject, Injectable } from '@nestjs/common';

// services
import { PrismaService } from '../prisma/prisma.service';

// dtos
import { CreateAnnouncementDTO } from './dtos/create-announcement.dto';

// databases
import Redis from 'ioredis';

@Injectable()
export class AnnouncementService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject('REDIS') private readonly redisClient: Redis,
    ) {}

    async listenAnnouncement() {
        const subscriber = this.redisClient.duplicate();
        subscriber.subscribe('announcement_channel');
        subscriber.on('message', (channel, message) => {
            console.log(`received message at teh ${channel}: ${message}`);
        });
    }

    // Enviar comunicado para uma ou mais turmas
    async sendAnnouncement(
        announcement: CreateAnnouncementDTO,
        classesId: number[],
    ) {
        // Publicar o comunicado usando Redis
        await this.redisClient.publish(
            'announcement_chanel',
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

    async readAnnouncements(classId: number) {
        return this.prismaService.announcement.findMany({
            where: {
                classes: {
                    some: {
                        id: classId,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
