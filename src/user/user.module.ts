import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CoordinatorService } from './coordinator.service';
import { CoordinatorController } from './coordinator.controller';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
    imports: [PrismaModule],
    controllers: [
        UserController,
        CoordinatorController,
        TeacherController,
        StudentController,
    ],
    providers: [
        UserService,
        CoordinatorService,
        TeacherService,
        StudentService,
    ],
    exports: [UserService],
})
export class UserModule {}
