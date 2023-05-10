import { Body, Controller, HttpException, Logger, Post } from "@nestjs/common";

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
		this.logger.debug("register method called");
		const registerInfo = await this.authService.register(
			body.username,
			body.email,
			body.password,
		);
		if (registerInfo === null) {
			this.logger.debug("registerInfo is null");
			throw new HttpException({}, 400);
		}

		return registerInfo;
	}

	// TODO: Implement verify method when email confirmation is fixed in Supabase
	// GET localhost:3000/api/v1/auth/verify
	// @Get("verify")
	// async verify(@Req() request: Request) {
	// 	const accessToken = request.query.access_token as string;
	// 	this.logger.debug(`verify method called with token: ${accessToken}`);

	// 	const verifyInfo = await this.authService.verify(accessToken);
	// 	if (verifyInfo === null) {
	// 		throw new HttpException({}, 400);
	// 	}

	// 	return verifyInfo;
	// }

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
