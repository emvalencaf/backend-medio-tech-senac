import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CoordinatorService } from './coordinator.service';
import { CoordinatorController } from './coordinator.controller';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
    imports: [PrismaModule],
    controllers: [UserController, CoordinatorController, TeacherController],
    providers: [UserService, CoordinatorService, TeacherService],
    exports: [UserService],
})
export class UserModule {}
