import { Injectable } from "@nestjs/common";
import { TempUser } from "@prisma/client";

import { PrismaService } from "../common/services/prisma.service";

@Injectable()
export class TempUserService {
	constructor(private prisma: PrismaService) {}

	async getTempUsers(): Promise<TempUser[]> {
		return await this.prisma.tempUser.findMany();
	}

	async getTempUser(username: string): Promise<TempUser> {
		const tempUser = await this.prisma.tempUser.findUnique({
			where: { username },
		});

		if (tempUser == null) {
			throw new Error("Temporary user does not exist");
		}

		return tempUser;
	}

	async createTempUser(username: string): Promise<TempUser> {
		const tempUser = await this.prisma.tempUser.findUnique({
			where: { username },
		});

		if (tempUser !== null) {
			throw new Error("Temporary user already exists");
		}

		return await this.prisma.tempUser.create({
			data: {
				username,
			},
		});
	}

	async deleteTempUser(username: string): Promise<TempUser> {
		const tempUser = await this.prisma.tempUser.findUnique({
			where: { username },
		});
		if (tempUser == null) {
			throw new Error("Temporary user does not exist");
		}

		return await this.prisma.tempUser.delete({
			where: { username },
		});
	}
}