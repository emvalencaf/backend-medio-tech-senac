// decorators
import { Module } from '@nestjs/common';

// modules
import { PrismaModule } from '../prisma/prisma.module';

// controllers
import { SubjectController } from './subject.controller';

// services
import { SubjectService } from './subject.service';

@Module({
    imports: [PrismaModule],
    controllers: [SubjectController],
    providers: [SubjectService],
    exports: [],
})
export class SubjectModule {}
