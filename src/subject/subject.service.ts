import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { PartialUpdateSubjectDTO } from './dto/partial-update-subject.dto';

@Injectable()
export class SubjectService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll(
        excludeByClassId?: number,
        page: number = 1, // Default to page 1
        limit: number = 10, // Default to 10 items per page
        noPagination: boolean = false,
    ) {
        // Calculate the offset for pagination
        const offset = (page - 1) * limit;

        // Obtain the total number of subjects
        const totalSubjects = await this.prismaService.subject.count();

        // Calculate total pages
        const totalPages = Math.ceil(totalSubjects / limit);

        // Set up query filters
        const queryOptions: any = {
            where: {},
            skip: noPagination ? undefined : offset, // Apply pagination if noPagination is false
            take: noPagination ? undefined : limit, // Apply limit if noPagination is false
        };

        // Apply class exclusion filter if provided
        if (excludeByClassId) {
            queryOptions.where.NOT = {
                TeachingAssignment: {
                    some: {
                        classId: excludeByClassId,
                    },
                },
            };
        }

        // Fetch the subjects based on the constructed query
        const subjects =
            await this.prismaService.subject.findMany(queryOptions);

        // Return the data and pagination information
        return {
            data: subjects,
            currentPage: noPagination ? null : page,
            totalPages: noPagination ? null : totalPages, // Only return totalPages if pagination is applied
        };
    }

    async partialUpdate(
        subjectId: number,
        subjectDTO: PartialUpdateSubjectDTO,
    ) {
        return this.prismaService.subject.update({
            where: {
                id: subjectId,
            },
            data: {
                ...subjectDTO,
            },
        });
    }

    async create(subjectDTO: CreateSubjectDTO) {
        // only one row for subject can exist
        // avoid duplicate subject
        if (
            await this.prismaService.subject.findFirst({
                where: {
                    name: subjectDTO.name,
                },
            })
        )
            throw new BadRequestException('Subject already exists');

        return this.prismaService.subject.create({
            data: subjectDTO,
        });
    }

    async getById(subjectId: number) {
        return this.prismaService.subject.findUnique({
            where: {
                id: subjectId,
            },
        });
    }

    async deleteById(subjectId: number) {
        return this.prismaService.subject.delete({
            where: {
                id: subjectId,
            },
        });
    }
}
