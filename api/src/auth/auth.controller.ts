import { Body, Controller, HttpException, Post, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { SupabaseGuard } from "src/common/supabase";

import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
@UseGuards(SupabaseGuard)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	async register(@Body() body: RegisterDto) {
		const registerInfo = await this.authService.register(
			body.username,
			body.email,
			body.password,
		);
		if (registerInfo === null) {
			throw new HttpException({}, 400);
		}

		return registerInfo;
	}

	@Post("login")
	async login(@Body() body: LoginDto) {
		const loginInfo = await this.authService.login(body.email, body.password);
		if (loginInfo === null) {
			throw new HttpException({}, 400);
		}

		return loginInfo;
	}

	@Post("logout")
	async logout() {
		return await this.authService.logout();
	}
}
