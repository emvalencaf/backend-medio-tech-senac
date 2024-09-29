import { IsArray, IsInt, IsString, IsObject } from 'class-validator';

export class AuthorDTO {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    userType: string;
}

export class ReturnedAnnouncementDTO {
    @IsInt()
    id: number;

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsArray()
    classesId: number[];

    @IsObject()
    author: AuthorDTO; // Define o autor como um objeto do tipo AuthorDTO

    @IsString()
    createdAt: string; // Adicionei o @IsString() para a data, ajuste se necessário

    constructor(announcement: any) {
        this.id = announcement.id;
        this.title = announcement.title;
        this.content = announcement.content; // Certifique-se de que o conteúdo também esteja incluído
        this.createdAt = announcement.createdAt; // Formato ISO se necessário
        this.classesId = announcement.classes.map((cls) => cls.id);

        // Criação do objeto author com base na estrutura esperada
        this.author = {
            firstName: announcement.author.firstName,
            lastName: announcement.author.lastName,
            userType: announcement.author.userType,
        };
    }
}
