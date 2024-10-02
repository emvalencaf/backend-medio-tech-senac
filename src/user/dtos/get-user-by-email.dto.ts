import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class GetUserByEmailDto {
    @ApiProperty({
        example: 'aocharle@gmail.com',
        description: 'o email do usuário para acha-lo',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        examples: ['true', 'false'],
        description: 'Se o return vai vim com senha ou não',
    })
    @IsBoolean()
    @IsOptional()
    showPassword: boolean = false;
}
