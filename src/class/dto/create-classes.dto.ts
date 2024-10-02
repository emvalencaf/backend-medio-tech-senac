import { IsInt, IsString } from 'class-validator';

export class CreateClassDTO {
    @IsString()
    name: string;
    @IsInt()
    year: number;
    @IsInt()
    semester: number;
}
