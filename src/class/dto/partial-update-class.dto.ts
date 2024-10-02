import { IsInt, IsOptional, IsString } from 'class-validator';

export class PartialUpdateClassDTO {
    @IsString()
    @IsOptional()
    name?: string;
    @IsInt()
    @IsOptional()
    year?: number;
    @IsInt()
    @IsOptional()
    semester?: number;
}
