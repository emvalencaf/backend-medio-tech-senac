import { IsString } from 'class-validator';

export class CreateSubjectDTO {
    @IsString()
    name: string;
    @IsString()
    description: string;
}
