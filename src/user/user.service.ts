// decorators
import { Injectable, NotFoundException } from '@nestjs/common';

// services
import { PrismaService } from '../prisma/prisma.service';

// dtos
import { GetUserByEmailDto } from './dtos/get-user-by-email.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async getByEmail(dto: GetUserByEmailDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            },
        }); // must do a

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        if (!dto.showPassword) delete user.password;

        return user;
    }

    async create(dto: CreateUserDto) {}
}
