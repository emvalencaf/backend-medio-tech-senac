// decorators
import { Controller, Param, Get, Body, Post, Query } from '@nestjs/common';

// services
import { ClassService } from './class.service';

// decorators
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { CreateClassDTO } from './dto/create-classes.dto';
import { UserId } from '../decorators/user-id.decorator';
import { UserRole } from '../decorators/user-type.decorator';
import { Public } from '../decorators/is-public.decorator';

@Controller('classes')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @Roles(UserType.COORDINATOR, UserType.TEACHER)
    @Get('teachers/:teacherId')
    async getByTeacherId(@Param('teacherId') teacherId: number) {
        return this.classService.getByTeacherId(Number(teacherId));
    }

    @Public()
    @Post()
    async create(@Body() classDTO: CreateClassDTO) {
        console.log(classDTO);
        return this.classService.create(classDTO);
    }

    @Roles(UserType.STUDENT, UserType.TEACHER, UserType.COORDINATOR)
    @Get()
    async getAll(
        @UserId() userId: number,
        @UserRole() userType: UserType,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 7,
    ) {
        return this.classService.getAll(
            userId,
            userType,
            Number(page),
            Number(limit),
        );
    }
}
