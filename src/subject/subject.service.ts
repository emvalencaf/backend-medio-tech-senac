import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDTO } from './dto/create-subject.dto';

@Injectable()
export class SubjectService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll(excludeByClassId?: number) {
        return excludeByClassId
            ? this.prismaService.subject.findMany({
                  where: {
                      NOT: {
                          TeachingAssignment: {
                              some: {
                                  classId: excludeByClassId,
                              },
                          },
                      },
                  },
              })
            : this.prismaService.subject.findMany();
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
}
