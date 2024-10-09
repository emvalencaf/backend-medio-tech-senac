import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { PartialUpdateUserDto } from './dtos/partial-update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(UserType.COORDINATOR)
    @Get()
    async getAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('name') name?: string,
        @Query('className') className?: string,
        @Query('subjectName') subjectName?: string,
        @Query('userType') userType?: UserType,
    ) {
        console.log(userType);
        return this.userService.getAll(
            Number(page),
            Number(limit),
            name,
            className,
            subjectName,
            userType,
        );
    }

    @Roles(UserType.COORDINATOR)
    @Get(':userId')
    async getById(@Param('userId', ParseIntPipe) userId: number) {
        return this.userService.getById(userId);
    }

    @Roles(UserType.COORDINATOR)
    @Patch(':userId')
    async partialUpdate(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() userDTO: PartialUpdateUserDto,
    ) {
        return this.userService.partialUpdate(userId, userDTO);
    }

    @Roles(UserType.COORDINATOR)
    @Delete(':userId')
    async deleteById(@Param('userId', ParseIntPipe) userId: number) {
        return this.userService.deleteById(userId);
    }
}
