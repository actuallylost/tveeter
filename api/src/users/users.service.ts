import { PrismaService } from "src/common/services/prisma.service";
import { SnowflakeService } from "src/common/services/snowflake.service";

import { Injectable } from "@nestjs/common";
import { Message, User } from "@prisma/client";

export interface CreateUserOptions {
	username: string;
	email: string;
}

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService, private snowflakeGen: SnowflakeService) {}

	async getUsers(): Promise<User[]> {
		return await this.prisma.user.findMany();
	}

	async getUser(id: bigint): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});
		if (user === null) {
			throw new Error("User does not exist");
		}

		return user;
	}

	async getUserByUsername(username: string): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { username },
		});
		if (user === null) {
			throw new Error("User does not exist");
		}

		return user;
	}

	async getUserByEmail(email: string): Promise<string> {
		const user = await this.prisma.user.findUnique({
			where: { email },
		});
		if (user === null) {
			throw new Error("User does not exist");
		}

		return user.username;
	}

	async getUserMessages(id: bigint): Promise<Message[]> {
		return await this.prisma.message.findMany({
			where: { authorId: id },
		});
	}

	async createUser(options: CreateUserOptions): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { username: options.username },
		});
		if (user !== null) {
			throw new Error("User already exists");
		}

		return await this.prisma.user.create({
			data: {
				id: this.snowflakeGen.generate().toBigInt(),
				username: options.username,
				email: options.email,
			},
		});
	}

	async deleteUser(id: bigint): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});
		if (user === null) {
			throw new Error("User does not exist");
		}

		return await this.prisma.user.delete({
			where: { id },
		});
	}
}
