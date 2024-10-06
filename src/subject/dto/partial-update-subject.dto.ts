import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PartialUpdateSubjectDTO {
    @ApiProperty({
        examples: ['matemática', 'biologia', 'química'],
        description: 'o nome da disciplina',
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        example: 'equação de primeiro e segundo grau, logaritmo, trigonometria',
        description: 'a descrição da disciplina (uma ementa)',
    })
    @IsString()
    @IsOptional()
    description: string;
}