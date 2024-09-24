import { IsEnum, IsInt, IsString } from 'class-validator';
import { UserType } from '../../users/enums/user-type.enum';

export class TokenPayloadDTO {
    @IsString()
    iss: string;

    @IsInt()
    sub: number;

    @IsString()
    aud: string;

    @IsEnum(UserType)
    userType: UserType;

    @IsInt()
    iat: number;

    @IsInt()
    exp: number;
}
