import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubjectDTO {
    @ApiProperty({
        examples: ['matemática', 'biologia', 'química'],
        description: 'o nome da disciplina',
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'equação de primeiro e segundo grau, logaritmo, trigonometria',
        description: 'a descrição da disciplina (uma ementa)',
    })
    @IsString()
    description: string;
}
