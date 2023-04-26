import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";
import { User } from "@prisma/client";
import { Message } from "@prisma/client";

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

	async createMessage(data: Message): Promise<Message> {
		return await this.prisma.message.create({
			data,
		});
	}

	async deleteUser(id: number): Promise<User> {
		return await this.prisma.user.delete({
			where: { id },
		});
	}
}
