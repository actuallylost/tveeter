import { StandardExceptionFilter } from "src/common/filters/standard.filter";
import { parseId } from "src/common/util/parseId";

import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Logger,
	Param,
	Post,
	UseFilters,
} from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

interface EmailDto {
	email: string;
}

@Controller("users")
@UseFilters(StandardExceptionFilter)
// @UseGuards(SupabaseGuard)
export class UsersController {
	private logger = new Logger(UsersController.name);

	constructor(private readonly users: UsersService) {}

	// GET localhost:3000/api/v1/users
	@Get("/")
	async getUsers() {
		return await this.users.getUsers();
	}

	// GET localhost:3000/api/v1/users/:id
	@Get("/:id")
	async getUser(@Param("id") id: string) {
		const userId = parseId(id);
		return await this.users.getUser(userId);
	}

	// GET localhost:3000/api/v1/users/:username
	@Get("/:username")
	async getUserByUsername(@Param("username") username: string) {
		return await this.users.getUserByUsername(username);
	}

	// POST localhost:3000/api/v1/users/
	@Post("/")
	async getUserByEmail(@Body() { email }: EmailDto) {
		this.logger.debug(`email received in controller: ${email}`);
		return await this.users.getUserByEmail(email);
	}

	// GET localhost:3000/api/v1/users/:id/messages
	@Get("/:id/messages")
	async getUserMessages(@Param("id") id: string) {
		const userId = parseId(id);
		const user = await this.users.getUser(userId);
		if (user === null) {
			throw new HttpException({}, 404);
		}

		return await this.users.getUserMessages(userId);
	}

	// POST localhost:3000/api/v1/users
	@Post("/")
	async createUser(@Body() { username, email }: CreateUserDto) {
		return await this.users.createUser({
			username: username,
			email: email,
		});
	}

	// DELETE localhost:3000/api/v1/users/:id
	@Delete("/:id")
	async deleteUser(@Param("id") id: string) {
		const userId = parseId(id);
		return await this.users.deleteUser(userId);
	}
}
