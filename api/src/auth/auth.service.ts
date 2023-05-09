import { User } from "@prisma/client";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

import { UsersService } from "../users";
import { SnowflakeService } from "../common/services/snowflake.service";

@Injectable()
export class AuthService {
	private supabase: SupabaseClient;
	private readonly logger = new Logger(AuthService.name);

	constructor(private snowflakeGen: SnowflakeService, private usersService: UsersService) {
		if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) {
			throw this.logger.error(
				"Missing SUPABASE_URL or SUPABASE_API_KEY environment variable",
			);
		}

		this.supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);
	}

	async register(username: string, email: string, password: string): Promise<User | null> {
		const { data, error } = await this.supabase.auth.signUp({
			email,
			password,
		});

		if (data.user === null) {
			this.logger.error("Failed to register user - Data is null");
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
