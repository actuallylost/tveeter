import { Body, Controller, HttpException, HttpStatus, Logger, Post, Query } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
// @UseGuards(SupabaseGuard)
export class AuthController {
	private logger = new Logger(AuthController.name);
	constructor(private readonly authService: AuthService) {}

	// POST localhost:3000/api/v1/auth/register
	@Post("register")
	async register(@Body() body: RegisterDto) {
		try {
			const result = await this.authService.register(
				body.username,
				body.email,
				body.password,
			);
			if (result.isErr()) {
				throw new HttpException({ code: result.unwrapErr() }, HttpStatus.FORBIDDEN);
			}
			return result.unwrap();
		} catch (err) {
			this.logger.error(err);
			throw new HttpException({ message: "Internal Server Error" }, 500);
		}
	}

	// POST localhost:3000/api/v1/auth/verify
	@Post("verify")
	async verify(@Query() query: Record<string, string>) {
		const accessToken = query.access_token as string;
		const verifyInfo = await this.authService.verify(accessToken);
		if (verifyInfo === null) {
			throw new HttpException({}, 400);
		}

		return verifyInfo;
	}

	// POST localhost:3000/api/v1/auth/login
	@Post("login")
	async login(@Body() body: LoginDto) {
		const loginInfo = await this.authService.login(body.email, body.password);
		if (loginInfo === null) {
			throw new HttpException({}, 400);
		}

		return loginInfo;
	}

	// POST localhost:3000/api/v1/auth/logout
	@Post("logout")
	async logout() {
		return await this.authService.logout();
	}
}
