import SupabaseService from "src/common/supabase/supabase.service";

import { Injectable } from "@nestjs/common";
import { TempUser } from "@prisma/client";

import { PrismaService } from "../common/services/prisma.service";

interface CreateTempUserOptions {
	username: string;
	email: string;
}

@Injectable()
export class TempUserService {
	constructor(private prisma: PrismaService) {}

	async getTempUsers(): Promise<TempUser[]> {
		return await this.prisma.tempUser.findMany();
	}

	async getTempUser(username: string): Promise<TempUser | null> {
		return this.prisma.tempUser
			.findUnique({
				where: { username },
			})
			.catch((err) => {
				console.error(err);
				return null;
			});
	}

	async createTempUser(options: CreateTempUserOptions): Promise<TempUser> {
		const tempUser = await this.prisma.tempUser.findUnique({
			where: { username: options.username },
		});

		if (tempUser !== null) {
			throw new Error("Temporary user already exists");
		}

		return await this.prisma.tempUser.create({
			data: {
				username: options.username,
				email: options.email,
			},
		});
	}

	async deleteTempUser(username: string): Promise<TempUser> {
		const tempUser = await this.prisma.tempUser.findUnique({
			where: { username },
		});
		if (tempUser === null) {
			throw new Error("Temporary user does not exist");
		}

		return await this.prisma.tempUser.delete({
			where: { username },
		});
	}
}
