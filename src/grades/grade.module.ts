import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';

@Module({
    imports: [PrismaModule],
    controllers: [GradeController],
    providers: [GradeService],
    exports: [],
})
export class GradeModule {}
