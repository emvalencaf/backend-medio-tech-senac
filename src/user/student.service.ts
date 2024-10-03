import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll(
        showRels: boolean = false,
        excludeStudentsWithinClass: boolean = false,
        onlyStudentWithClassId?: number,
    ) {
        let rels;
        let filter;
        if (excludeStudentsWithinClass)
            filter = {
                classes: {
                    none: {},
                },
            };

        if (onlyStudentWithClassId)
            filter = {
                classes: {
                    some: {
                        id: onlyStudentWithClassId,
                    },
                },
            };
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
                ...filter,
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
