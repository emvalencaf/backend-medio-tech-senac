import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PartialUpdateClassDTO {
    @ApiProperty({ example: 'Turma A', description: 'Nome da turma' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ example: [1, 2, 3], description: 'O ano da turma de 1 a 3' })
    @IsInt()
    @Max(3)
    @Min(1)
    @IsOptional()
    year?: number;

    @ApiProperty({ examples: [1, 2], description: 'O semestre da turma' })
    @IsInt()
    @Max(2)
    @Min(1)
    @IsOptional()
    semester?: number;
}
