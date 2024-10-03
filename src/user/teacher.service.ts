import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeacherService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll(showRels: boolean = false) {
        let rels;

        if (showRels)
            rels = {
                TeachingAssignment: {
                    select: {
                        class: true,
                        subject: true,
                    },
                },
            };

        return this.prismaService.user.findMany({
            where: {
                userType: 'TEACHER',
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                ...rels,
            },
        });
    }
}
