import { PrismaService } from "src/common/services/prisma.service";
import SupabaseService from "src/common/supabase/supabase.service";
import { TempUserService } from "src/tempusers";
import { UsersService } from "src/users";

import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AuthService {
	private logger = new Logger(AuthService.name);
	constructor(
		private prisma: PrismaService,
		private supabase: SupabaseService,
		private user: UsersService,
		private tempUser: TempUserService,
	) {}

	async verify(token: string): Promise<{ username: string | null }> {
		const email = await this.supabase.getEmail(token);
		if (email === null) {
			return { username: null };
		}

		const tempUser = await this.prisma.tempUser.findUnique({
			where: { email },
		});
		if (tempUser === null) {
			const user = await this.prisma.user.findUnique({
				where: { email },
			});

			if (user === null) {
				return { username: null };
			}

			return { username: user?.username };
		}

		await this.tempUser.deleteTempUser(tempUser.username);

		const user = await this.user.createUser({
			username: tempUser.username,
			email: email,
		});

		return { username: user.username };
	}
}
