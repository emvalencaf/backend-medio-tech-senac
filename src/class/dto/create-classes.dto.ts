import { IsNumber, IsString } from 'class-validator';

export class CreateClassDTO {
    @IsString()
    nameClass: string;
    @IsString()
    year: string;
    @IsNumber()
    semester: number;
}
