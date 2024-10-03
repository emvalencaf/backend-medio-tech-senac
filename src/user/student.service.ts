import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll(showRels: boolean = false) {
        let rels;

        if (showRels)
            rels = {
                classes: {
                    select: {
                        id: true,
                        name: true,
                        year: true,
                        semester: true,
                    },
                },
            };

        return this.prismaService.user.findMany({
            where: {
                userType: 'STUDENT',
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
