// decorators
import { Controller, Param, Get, Body, Post } from '@nestjs/common';

// services
import { ClassService } from './class.service';

// decorators
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { CreateClassDTO } from './dto/create-classes.dto';
import { UserId } from '../decorators/user-id.decorator';
import { UserRole } from '../decorators/user-type.decorator';

@Controller('classes')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @Roles(UserType.COORDINATOR, UserType.TEACHER)
    @Get('teachers/:teacherId')
    async getByTeacherId(@Param('teacherId') teacherId: number) {
        return this.classService.getByTeacherId(Number(teacherId));
    }

    @Roles(UserType.COORDINATOR)
    @Post()
    async create(@Body() classDTO: CreateClassDTO) {
        return this.classService.create(classDTO);
    }

    @Roles(UserType.STUDENT, UserType.TEACHER)
    @Get()
    async getAll(@UserId() userId: number, @UserRole() userType: UserType) {
        return this.classService.getAll(userId, userType);
    }
}
