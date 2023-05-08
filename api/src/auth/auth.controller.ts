import { Controller, Body, Put, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { SignInDto } from "./dto/signin.dto";

@Controller("auth")
export class AuthController {
	constructor() {
		// ...
	}

	@Put()
	async login(@Body() body: LoginDto) {
		// TODO: implement
	}

	@Post()
	async signIn(@Body() body: SignInDto) {
		// TODO: implement
	}

	@Post()
	async signOut() {
		// TODO: implement
	}
}
