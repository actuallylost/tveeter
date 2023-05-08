import { Body, Controller, Post } from "@nestjs/common";

import { LoginDto } from "./dto/login.dto";
import { SignInDto } from "./dto/signin.dto";

@Controller("auth")
export class AuthController {
	constructor() {
		// ...
	}

	@Post("register")
	async register(@Body() body: SignInDto) {
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
