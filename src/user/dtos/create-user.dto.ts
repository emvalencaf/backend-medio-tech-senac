import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'Anthony',
        description: 'Primeiro nome do usuário',
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        example: "O'Charle",
        description: 'Sobrenome do usuário',
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        example: 'aocharle@gmail.com',
        description:
            'email do usuário - que serve também como credencial de sign-in',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '1Efsdf23+-*01Ma',
        description: 'senha do usuário',
    })
    @IsString()
    password: string;

    @ApiProperty({
        examples: ['COORDINATOR', 'TEACHER', 'STUDENT'],
        description: 'O tipo do usuário',
    })
    @IsEnum(UserType)
    userType: UserType;
}
