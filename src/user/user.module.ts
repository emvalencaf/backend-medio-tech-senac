import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CoordinatorService } from './coordinator.service';
import { CoordinatorController } from './coordinator.controller';

@Module({
    imports: [PrismaModule],
    controllers: [UserController, CoordinatorController],
    providers: [UserService, CoordinatorService],
    exports: [UserService],
})
export class UserModule {}
