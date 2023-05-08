import { PrismaService } from "src/common/services/prisma.service";

import { Injectable } from "@nestjs/common";
import { Message, User } from "@prisma/client";

class CreateUserOptions {
	id: number;
	username: string;
}

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async getUsers(): Promise<User[]> {
		return await this.prisma.user.findMany();
	}

	async getUser(id: number): Promise<User> {
		return await this.prisma.user.findUnique({
			where: { id },
		});
	}

	async getUserMessages(id: number): Promise<Message[]> {
		return await this.prisma.message.findMany({
			where: { authorId: id },
		});
	}

	async createUser(options: CreateUserOptions): Promise<User> {
		return await this.prisma.user.create({
			data: options,
		});
	}

	async deleteUser(id: number): Promise<User> {
		return await this.prisma.user.delete({
			where: { id },
		});
	}
}
