import { ApiProperty } from '@nestjs/swagger';
import { GradeScore } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateGradeDTO {
    @ApiProperty({
        examples: ['A', 'B', 'C'],
        description: 'o conceito da menção',
    })
    @IsEnum(GradeScore)
    grade: GradeScore;

    @ApiProperty({
        example: 10,
        description: 'A nota do aluno de 0 a 10',
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    @Type(() => Number)
    score?: number;

    @ApiProperty({
        examples: [1, 2, 3],
        description:
            'A qual avaliação (por ex: bimestral, trimestral) pertence a menção, por exemplo',
    })
    @IsInt()
    @Type(() => Number)
    avaliation: number;
}
