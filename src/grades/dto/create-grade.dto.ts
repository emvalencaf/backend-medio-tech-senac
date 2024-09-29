import { GradeScore } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateGradeDTO {
    @IsEnum(GradeScore)
    grade: GradeScore;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    @Type(() => Number)
    score?: number;

    @IsInt()
    @Type(() => Number)
    avaliation: number;
}
