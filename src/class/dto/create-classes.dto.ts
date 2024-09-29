import { IsInt, IsString } from 'class-validator';

export class CreateClassDTO {
    @IsString()
    name: string;
    @IsString()
    year: string;
    @IsInt()
    semester: number;
}
