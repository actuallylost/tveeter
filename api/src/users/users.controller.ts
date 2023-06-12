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
	Query,
	UseFilters,
} from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
@UseFilters(StandardExceptionFilter)
// @UseGuards(SupabaseGuard)
export class UsersController {
	private logger = new Logger(UsersController.name);

	constructor(private readonly users: UsersService) {}

	// GET localhost:3000/api/v1/users
	@Get("/")
	async getUsers(@Query() query: { username?: string; email?: string }) {
		if (query.username) {
			return await this.users.getUserByUsername(query.username);
		}
		if (query.email) {
			return await this.users.getUserByEmail(query.email);
		}
		return await this.users.getUsers();
	}

	// GET localhost:3000/api/v1/users/:id
	@Get("/:id")
	async getUser(@Param("id") id: string) {
		const userId = parseId(id);
		return await this.users.getUser(userId);
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
