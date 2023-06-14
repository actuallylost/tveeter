import { StandardExceptionFilter } from "src/common/filters/standard.filter";

import { Body, Controller, Logger, Post, UseFilters } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { TokenDto } from "./dto";

@Controller("auth")
@UseFilters(StandardExceptionFilter)
export class AuthController {
	private readonly logger = new Logger(AuthController.name);

	constructor(private auth: AuthService) {}

	@Post("verify")
	async verify(@Body() { token }: TokenDto): Promise<{ username: string | null }> {
		this.logger.debug(`auth controller token: ${token}`);
		return await this.auth.verify(token);
	}
}
