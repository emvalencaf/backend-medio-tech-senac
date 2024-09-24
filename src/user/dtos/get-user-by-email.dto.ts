import { IsEmail, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class GetUserByEmailDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsBoolean()
    @IsOptional()
    showPassword: boolean = false;
}
