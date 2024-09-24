import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 100)
    password: string;
}
