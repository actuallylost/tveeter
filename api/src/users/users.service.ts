import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";
import { User } from "@prisma/client";
import { Message } from "@prisma/client";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async getUser(id: number): Promise<User> {
		return await this.prisma.user.findUnique({
			where: { id },
		});
	}

	async getUsers(): Promise<User[]> {
		return await this.prisma.user.findMany();
	}

	async getUserMessages(userId: number): Promise<Message[]> {
		return await this.prisma.message.findMany({
			where: { userId },
		});
	}

	async createUser(data: User): Promise<User> {
		return await this.prisma.user.create({
			data,
		});
	}
}
