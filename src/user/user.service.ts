// decorators
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

// services
import { PrismaService } from '../prisma/prisma.service';

// dtos
import { GetUserByEmailDto } from './dtos/get-user-by-email.dto';
import { CreateUserDto } from './dtos/create-user.dto';

// libs for authentication
import * as bcrypt from 'bcrypt';

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

    async create(dto: CreateUserDto) {
        const { email, password, ...otherFields } = dto;

        // Check if the user already exists by email
        const existingUser = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            throw new BadRequestException('Email já está sendo usado');
        }

        const saltRounds = 10;

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create and return the new user
        return this.prismaService.user.create({
            data: {
                ...otherFields,
                email,
                password: hashedPassword,
            },
        });
    }
}
