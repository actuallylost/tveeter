import { User } from "@prisma/client";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";

import { UsersService } from "../users";
import { SupabaseService } from "../common/supabase/supabase.service";
import { SnowflakeService } from "../common/services/snowflake.service";

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
	private supabase: SupabaseClient;

	constructor(
		private usersService: UsersService,
		private supabaseService: SupabaseService,
		private snowflakeGen: SnowflakeService,
	) {
		this.supabase = this.supabaseService.getClient();
	}

	async register(username: string, email: string, password: string): Promise<User | null> {
		this.logger.debug(
			`Auth service register method called with username: ${username}, email: ${email}`,
		);

		const { data, error } = await this.supabase.auth.signUp({
			email,
			password,
		});

		this.logger.debug(`Supabase auth response data: ${JSON.stringify(data)}`);

		if (data.user === null) {
			this.logger.error("Failed to register user - User data is null");
			throw new HttpException({}, 400); // Bad Request
		}

		if (error) {
			throw this.logger.error(error);
		}

		const newUser: User = {
			id: this.snowflakeGen.generate().toBigInt(),
			email: data.user.email || "",
			username: username,
			password: password,
			createdAt: new Date(Date.now()),
		};

		return await this.usersService.createUser(newUser);
	}

	async login(email: string, password: string) {
		const { data, error } = await this.supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (data === null) {
			this.logger.error("Failed to login user - Data is null");
			throw new HttpException({}, 400); // Bad Request
		}

		if (error) {
			throw this.logger.error(error);
		}

		return data;
	}

	async logout() {
		return await this.supabase.auth.signOut();
	}
}
