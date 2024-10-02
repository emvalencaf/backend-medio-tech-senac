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
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('classes')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @ApiBearerAuth()
    @Roles(UserType.COORDINATOR, UserType.TEACHER)
    @Get('teachers/:teacherId')
    @ApiOperation({ summary: 'Obter turmas a partir do id do professor' })
    async getByTeacherId(@Param('teacherId') teacherId: number) {
        return this.classService.getByTeacherId(Number(teacherId));
    }

    @ApiBearerAuth()
    @Roles(UserType.COORDINATOR)
    @Post()
    @ApiOperation({ summary: 'Criar uma turma nova' })
    async create(@Body() classDTO: CreateClassDTO) {
        return this.classService.create(classDTO);
    }

    @ApiBearerAuth()
    @Roles(UserType.COORDINATOR)
    @Patch(':classId')
    @ApiOperation({ summary: 'Atualiza uma turma pelo id da turma' })
    async partialUpdate(
        @Param('classId') classId: number,
        @Body() classDTO: PartialUpdateClassDTO,
    ) {
        return this.classService.partialUpdate(Number(classId), classDTO);
    }

    @ApiBearerAuth()
    @Roles(UserType.COORDINATOR)
    @Delete(':classId')
    @ApiOperation({ summary: 'Deleta uma turma pelo id da turma' })
    async delete(@Param('classId') classId: number) {
        return this.classService.delete(classId);
    }

    @ApiBearerAuth()
    @Roles(UserType.COORDINATOR, UserType.TEACHER)
    @Get(':classId')
    @ApiOperation({
        summary: 'Busca os dados de uma turma a parti do id da turma',
    })
    async getById(@Param('classId') classId: number) {
        return this.classService.getById(Number(classId));
    }

    @ApiBearerAuth()
    @Roles(UserType.STUDENT, UserType.TEACHER, UserType.COORDINATOR)
    @Get()
    @ApiOperation({
        summary:
            'Busca os dados de todas as turmas a parti da id do usuário extraído do jwtoken',
    })
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
