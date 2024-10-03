import {
    Controller,
    DefaultValuePipe,
    Get,
    ParseBoolPipe,
    Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '@prisma/client';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Roles(UserType.COORDINATOR, UserType.TEACHER)
    @Get()
    async getAll(
        @Query('showRels', new DefaultValuePipe(false), ParseBoolPipe)
        showRels: boolean = false,
    ) {
        return this.studentService.getAll(showRels);
    }
}
