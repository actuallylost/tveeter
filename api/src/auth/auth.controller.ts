import { Body, Controller, Post } from "@nestjs/common";

import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
	constructor() {
		// ...
	}

	@Post("register")
	async register(@Body() body: RegisterDto) {
		// TODO: implement
	}

	@Post("login")
	async login(@Body() body: LoginDto) {
		// TODO: implement
	}

	@Post("logout")
	async logout() {
		// TODO: implement
	}
}
