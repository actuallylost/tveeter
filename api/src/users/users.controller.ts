import { StandardExceptionFilter } from "src/common/filters/standard.filter";
import { parseId } from "src/common/util/parseId";

import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Post,
	UseFilters,
} from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
@UseFilters(StandardExceptionFilter)
// @UseGuards(SupabaseGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// GET localhost:3000/api/v1/users
	@Get("/")
	async getUsers() {
		return await this.usersService.getUsers();
	}

	// GET localhost:3000/api/v1/users/:id
	@Get("/:id")
	async getUser(@Param("id") id: string) {
		const userId = parseId(id);
		return await this.usersService.getUser(userId);
	}

	@Get("/:username")
	async getUserByUsername(@Param("username") username: string) {
		return await this.usersService.getUserByUsername(username);
	}

	// GET localhost:3000/api/v1/users/:id/messages
	@Get("/:id/messages")
	async getUserMessages(@Param("id") id: string) {
		const userId = parseId(id);
		const user = await this.usersService.getUser(userId);
		if (user === null) {
			throw new HttpException({}, 404);
		}

		return await this.usersService.getUserMessages(userId);
	}

	// POST localhost:3000/api/v1/users
	@Post("/")
	async createUser(@Body() { username, email }: CreateUserDto) {
		return await this.usersService.createUser({
			username: username,
			email: email,
		});
	}

	// DELETE localhost:3000/api/v1/users/:id
	@Delete("/:id")
	async deleteUser(@Param("id") id: string) {
		const userId = parseId(id);
		return await this.usersService.deleteUser(userId);
	}
}
