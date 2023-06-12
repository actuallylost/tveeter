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
			this.logger.debug(`email is null: ${email}`);
			return { username: null };
		}
		this.logger.debug(`email isn't null: ${email}`);

		const tempUser = await this.prisma.tempUser.findUnique({
			where: { email },
		});
		if (tempUser === null) {
			this.logger.debug(`tempUser is null: ${tempUser}`);
			return { username: null };
		}
		this.logger.debug(`tempUser isn't null: ${tempUser}`);

		await this.tempUser.deleteTempUser(tempUser.username);

		const user = await this.user.createUser({
			username: tempUser.username,
			email: email,
		});
		this.logger.debug(`user: ${user}`);

		return { username: user.username };
	}
}
