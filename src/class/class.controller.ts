// decorators
import { Controller, Param, Get } from '@nestjs/common';

// services
import { ClassService } from './class.service';

@Controller('classes')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @Get('teachers/:teacherId')
    async getByTeacherId(@Param('teacherId') teacherId: number) {
        return this.classService.getByTeacherId(Number(teacherId));
    }
}
