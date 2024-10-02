// update-grade.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { GradeScore } from '@prisma/client';
import { IsEnum, IsOptional, IsNumber, IsInt } from 'class-validator';

export class PartialUpdateGradeDTO {
    @ApiProperty({
        examples: ['A', 'B', 'C'],
        description: 'o conceito da menção',
    })
    @IsOptional()
    @IsEnum(GradeScore)
    grade?: GradeScore; // Enum para nota

    @ApiProperty({
        example: 10,
        description: 'A nota do aluno de 0 a 10',
    })
    @IsOptional()
    @IsNumber()
    score?: number; // Número opcional entre 0 e 10

    @ApiProperty({
        examples: [1, 2, 3],
        description:
            'A qual avaliação (por ex: bimestral, trimestral) pertence a menção, por exemplo',
    })
    @IsInt()
    @IsOptional()
    avaliation?: number; // Campo opcional para avaliação
}
