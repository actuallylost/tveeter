import { PrismaService } from "src/common/services/prisma.service";
import { SnowflakeService } from "src/common/services/snowflake.service";

import { Injectable } from "@nestjs/common";
import { Message, User } from "@prisma/client";

export interface CreateUserOptions {
	id: bigint;
	username: string;
}

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService, private snowflakeGen: SnowflakeService) {}

	async getUsers(): Promise<User[]> {
		return await this.prisma.user.findMany();
	}

	async getUser(id: bigint): Promise<User | null> {
		return await this.prisma.user.findUnique({
			where: { id },
		});
	}

	async getUserMessages(id: bigint): Promise<Message[]> {
		return await this.prisma.message.findMany({
			where: { authorId: id },
		});
	}

	async createUser(options: CreateUserOptions): Promise<User> {
		return await this.prisma.user.create({
			data: {
				id: this.snowflakeGen.generate().toBigInt(),
				username: options.username,
			},
		});
	}

	async deleteUser(id: bigint): Promise<User> {
		return await this.prisma.user.delete({
			where: { id },
		});
	}
}
