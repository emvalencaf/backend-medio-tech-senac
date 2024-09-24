import { IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class User {
    @IsString()
    name: string;

    @IsEmail()
    email: string;
}

export class SignInPayloadDto {
    @ValidateNested()
    @Type(() => User)
    user: User;

    @IsString()
    accessToken: string;
}
