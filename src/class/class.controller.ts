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
    ParseBoolPipe,
    ParseIntPipe,
    DefaultValuePipe,
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
    async getByTeacherId(@Param('teacherId', ParseIntPipe) teacherId: number) {
        return this.classService.getByTeacherId(teacherId);
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
        @Param('classId', ParseIntPipe) classId: number,
        @Body() classDTO: PartialUpdateClassDTO,
    ) {
        return this.classService.partialUpdate(classId, classDTO);
    }

    @ApiBearerAuth()
    @Roles(UserType.COORDINATOR)
    @Delete(':classId')
    @ApiOperation({ summary: 'Deleta uma turma pelo id da turma' })
    async deleteById(@Param('classId', ParseIntPipe) classId: number) {
        return this.classService.deleteById(classId);
    }

    @ApiBearerAuth()
    @Roles(UserType.COORDINATOR, UserType.TEACHER, UserType.STUDENT)
    @Get(':classId')
    @ApiOperation({
        summary: 'Busca os dados de uma turma a parti do id da turma',
    })
    async getById(
        @Param('classId', ParseIntPipe) classId: number,
        @Query('showRels', new DefaultValuePipe(false), ParseBoolPipe)
        showRels: boolean = false,
    ) {
        return this.classService.getById(classId, showRels);
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
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('noPagination') noPagination: boolean = false,
        @Query('withConcepts') withConcepts: boolean = false,
    ) {
        const currentPage =
            page && !isNaN(parseInt(page)) && parseInt(page) > 0
                ? parseInt(page)
                : 1;
        const currentLimit =
            limit && !isNaN(parseInt(limit)) && parseInt(limit) > 0
                ? parseInt(limit)
                : 7;

        try {
            // data
            const data = await this.classService.getAll(
                userId,
                userType,
                currentPage,
                currentLimit,
                noPagination,
                withConcepts,
            );

            console.log(data);

            return data;
        } catch (err) {
            // erro log
            console.log(err);
            return {
                data: [],
                currentPage: 1,
                totalPages: 1,
            };
        }
    }
}
