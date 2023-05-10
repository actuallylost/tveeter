import { HttpException, Injectable, Logger } from "@nestjs/common";
import { SupabaseClient, User } from "@supabase/supabase-js";

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

	async register(username: string, email: string, password: string): Promise<User> {
		this.logger.debug(
			`Auth service register method called with username: ${username}, email: ${email}`,
		);

		const { data: registerData, error: registerError } = await this.supabase.auth.signUp({
			email,
			password,
		});

		this.logger.debug(`Supabase auth response data: ${JSON.stringify(registerData)}`);

		if (registerData.user === null || registerData.user.email === undefined) {
			this.logger.error("Failed to register user - Data is null");
			throw new HttpException({}, 400); // Bad Request
		}

		if (registerError) {
			throw this.logger.error(registerError);
		}

		this.logger.debug("Please confirm your email address");

		await this.usersService.createUser({
			id: this.snowflakeGen.generate().toBigInt(),
			email: registerData.user.email,
			username: username,
			password: password,
		});

		return registerData.user;
	}

	async verify(): Promise<{ accessToken: string }> {
		const session = await this.supabase.auth.getSession();
		const sessionData = session.data;

		if (sessionData.session === null || sessionData.session.access_token === undefined) {
			this.logger.debug(
				`Session: ${JSON.stringify(sessionData.session)} | Session Token: ${
					sessionData.session?.access_token
				}`,
			);
			this.logger.error("Failed to register user - Session is null");
			throw new HttpException({}, 400); // Bad Request
		}

		this.logger.debug(`Supabase access token: ${sessionData.session.access_token}`);
		return { accessToken: sessionData.session.access_token };
	}

	async login(email: string, password: string): Promise<{ accessToken: string }> {
		const { data, error } = await this.supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (data.user === null) {
			this.logger.error("Failed to login user - Data is null");
			throw new HttpException({}, 400); // Bad Request
		}

		if (data.session === null || data.session.access_token === undefined) {
			this.logger.debug(
				`Session: ${JSON.stringify(data.session)} | Session Token: ${
					data.session?.access_token
				}`,
			);
			this.logger.error("Failed to register user - Session is null");
			throw new HttpException({}, 400); // Bad Request
		}

		if (error) {
			throw this.logger.error(error);
		}

		this.logger.debug(`Supabase access token: ${data.session.access_token}`);
		return { accessToken: data.session.access_token };
	}

	async logout() {
		const { error } = await this.supabase.auth.signOut();
		if (error) {
			throw this.logger.error(error);
		}

		return await this.supabase.auth.signOut();
	}
}
