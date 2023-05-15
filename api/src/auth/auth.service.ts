import { HttpException, Injectable, Logger } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";

import { UsersService } from "../users";
import { PrismaService } from "../common/services/prisma.service";
import SupabaseService from "../common/supabase/supabase.service";
import { SnowflakeService } from "../common/services/snowflake.service";

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
	private supabase: SupabaseClient;

	constructor(
		private usersService: UsersService,
		private prismaService: PrismaService,
		private snowflakeGen: SnowflakeService,
		private supabaseService: SupabaseService,
	) {
		this.supabase = this.supabaseService;
	}

	async register(
		username: string,
		email: string,
		password: string,
	): Promise<{ accessToken: string }> {
		this.logger.debug(
			`Auth service register method called with username: ${username}, email: ${email}`,
		);
		const { data: registerData, error: registerError } = await this.supabase.auth.signUp({
			email,
			password,
		});

		const userExists = await this.prismaService.user.findUnique({
			where: {
				email: email,
			},
		});

		if (userExists) {
			this.logger.error("Failed to register user - User already exists in the database");
			throw new HttpException({ error: "User already exists" }, 400); // Bad Request
		}

		this.logger.debug(`Supabase auth response data: ${JSON.stringify(registerData)}`);

		if (registerData.user === null || registerData.user.email === undefined) {
			this.logger.error("Failed to register user - User data is null");
			throw new HttpException({ error: "Required user data is null" }, 400); // Bad Request
		}

		if (registerData.session === null || registerData.session.access_token === undefined) {
			this.logger.error("Failed to register user - Session is null");
			throw new HttpException({ error: "Session is null" }, 400); // Bad Request
		}

		if (registerError) {
			throw this.logger.error(registerError);
		}

		await this.usersService.createUser({
			id: this.snowflakeGen.generate().toBigInt(),
			username: username,
			email: email,
		});

		return { accessToken: registerData.session.access_token };

		// TODO: Implement email confirmation logic when it's fixed in Supabase
		// const tempUser = await this.prismaService.tempUser.findUnique({
		// 	where: {
		// 		email: email,
		// 	},
		// });
		// if (tempUser) {
		// 	this.logger.error("Failed to register user - User already exists in the database");
		// 	throw new HttpException({}, 400); // Bad Request
		// } else {
		// 	this.logger.debug("Creating temp user - please confirm your email address");
		// 	await this.prismaService.tempUser.create({
		// 		data: {
		// 			username: username,
		// 			email: email,
		// 		},
		// 	});
		// }
	}

	// TODO: Implement verify method when email confirmation is fixed in Supabase
	// async verify(token: string): Promise<DatabaseUser> {
	// 	const user = await this.supabase.auth.getUser(token);
	// 	const userData = user.data;
	// 	if (userData.user === null || userData.user.email === undefined) {
	// 		this.logger.debug(
	// 			`User: ${JSON.stringify(userData.user)} | User Email: ${userData.user?.email}`,
	// 		);
	// 		this.logger.error("Failed to fetch user - Data is null");
	// 		throw new HttpException({}, 400); // Bad Request
	// 	}
	// 	return await this.usersService.createUser({
	// 		id: this.snowflakeGen.generate().toBigInt(),
	// 		username: tempUser.username,
	// 		email: tempUser.email,
	// 	});
	// 	const tempUser = await this.prismaService.tempUser.findUnique({
	// 		where: {
	// 			email: userData.user?.email,
	// 		},
	// 	});
	// 	if (tempUser === null) {
	// 		this.logger.error("Failed to fetch temp user - User doesn't exist in the database");
	// 		throw new HttpException({}, 400); // Bad Request
	// 	}
	// 	await this.prismaService.tempUser.delete({
	// 		where: {
	// 			email: userData.user?.email,
	// 		},
	// 	});
	// }

	async login(email: string, password: string): Promise<{ accessToken: string }> {
		const { data, error } = await this.supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (data.user === null) {
			this.logger.error("Failed to login user - Data is null");
			this.logger.debug(`User data: ${JSON.stringify(data.user)}`);
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
