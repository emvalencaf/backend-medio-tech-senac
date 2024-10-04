import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    IsStrongPassword,
} from 'class-validator';

export class PartialUpdateUserDto {
    @ApiProperty({
        example: 'Anthony',
        description: 'Primeiro nome do usuário',
    })
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiProperty({
        example: "O'Charle",
        description: 'Sobrenome do usuário',
    })
    @IsString()
    @IsOptional()
    lastName: string;

    @ApiProperty({
        example: 'aocharle@gmail.com',
        description:
            'email do usuário - que serve também como credencial de sign-in',
    })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({
        example: '1Efsdf23+-*01Ma',
        description: 'senha do usuário',
    })
    @IsStrongPassword()
    @IsOptional()
    password: string;

    @ApiProperty({
        examples: ['COORDINATOR', 'TEACHER', 'STUDENT'],
        description: 'O tipo do usuário',
    })
    @IsEnum(UserType)
    @IsOptional()
    userType: UserType;
}
