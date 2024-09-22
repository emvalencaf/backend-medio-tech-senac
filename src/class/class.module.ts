// decorators
import { Module } from '@nestjs/common';

// modules
import { PrismaModule } from '../prisma/prisma.module';

// controllers
import { ClassController } from './class.controller';

// services
import { ClassService } from './class.service';

@Module({
    imports: [PrismaModule],
    providers: [ClassService],
    controllers: [ClassController],
})
export class ClassModule {}
