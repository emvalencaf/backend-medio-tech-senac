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
import { PartialUpdateUserDto } from './dtos/partial-update-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async deleteById(userId: number) {
        return this.prismaService.user.delete({
            where: {
                id: userId,
            },
        });
    }

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

    async getAll(page: number, limit: number) {
        // Calcula o offset para paginação
        const offset = (page - 1) * limit;

        // Obtém o número total de classes com o filtro aplicado
        const totalUsers = await this.prismaService.class.count();

        const users = await this.prismaService.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                userType: true,
            },
            skip: offset, // Ignora os primeiros N registros
            take: Number(limit), // Limita o número de resultados
        });

        // Calcula o total de páginas
        const totalPages = Math.ceil(totalUsers / limit);

        // Retorna a resposta no formato desejado
        return {
            data: users,
            currentPage: page,
            totalPages: totalPages,
        };
    }

    async getById(userId: number) {
        return this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                userType: true,
            },
        });
    }

    async partialUpdate(userId: number, userDTO: PartialUpdateUserDto) {
        return this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                ...userDTO,
            },
        });
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
