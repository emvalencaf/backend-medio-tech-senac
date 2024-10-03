import { IsInt, IsOptional } from 'class-validator';

export class PartialUpdateTeachingAssignmentDTO {
    @IsInt()
    @IsOptional()
    teacherId?: number;
    @IsInt()
    @IsOptional()
    subjectId?: number;
}
