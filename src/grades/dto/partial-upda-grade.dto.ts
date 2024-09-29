// update-grade.dto.ts
import { GradeScore } from '@prisma/client';
import { IsEnum, IsOptional, IsNumber, IsInt } from 'class-validator';

export class PartialUpdateGradeDTO {
    @IsOptional()
    @IsEnum(GradeScore)
    grade?: GradeScore; // Enum para nota

    @IsOptional()
    @IsNumber()
    score?: number; // Número opcional entre 0 e 10

    @IsInt()
    @IsOptional()
    avaliation?: number; // Campo opcional para avaliação
}
