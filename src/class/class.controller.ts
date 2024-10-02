// decorators
import {
    Controller,
    Param,
    Get,
    Body,
    Post,
    Query,
    Patch,
    Delete,
} from '@nestjs/common';

// services
import { ClassService } from './class.service';

// decorators
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { CreateClassDTO } from './dto/create-class.dto';
import { UserId } from '../decorators/user-id.decorator';
import { UserRole } from '../decorators/user-type.decorator';
import { PartialUpdateClassDTO } from './dto/partial-update-class.dto';

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

    @Roles(UserType.COORDINATOR)
    @Patch(':classId')
    async partialUpdate(
        @Param('classId') classId: number,
        @Body() classDTO: PartialUpdateClassDTO,
    ) {
        return this.classService.partialUpdate(Number(classId), classDTO);
    }

    @Roles(UserType.COORDINATOR)
    @Delete(':classId')
    async delete(@Param('classId') classId: number) {
        return this.classService.delete(classId);
    }

    @Roles(UserType.COORDINATOR, UserType.TEACHER)
    @Get(':classId')
    async getById(@Param('classId') classId: number) {
        return this.classService.getById(Number(classId));
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
