// decorators
import { Body, Controller, Post } from '@nestjs/common';

// services
import { AuthService } from './auth.service';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { Public } from '../decorators/is-public.decorator';
import { UserType } from '@prisma/client';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { Token } from '../decorators/token.decorator';
import { CreateUserDto } from '../user/dtos/create-user.dto';

// dtos

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('/sign-in')
    async signIn(@Body() signIn: SignInUserDto) {
        return this.authService.signIn(signIn);
    }

    @Roles(UserType.COORDINATOR) // ONLY COORDINATOR CAN SIGN-UP NEW USERS
    @Post('/sign-up')
    async signUp(@Body() signUp: CreateUserDto) {
        return this.authService.signUp(signUp);
    }

    @Roles(UserType.COORDINATOR, UserType.STUDENT, UserType.TEACHER)
    @Post('/sign-out')
    async signOut(@UserId() userId: number, @Token() token: string) {
        return this.authService.signOut(userId, token);
    }
}
