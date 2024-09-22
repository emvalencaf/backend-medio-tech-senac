import { IsString } from 'class-validator';

export class CreateAnnouncementDTO {
    @IsString()
    title: string;
    @IsString()
    content: string;
}
