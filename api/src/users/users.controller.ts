import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Post,
	UseGuards,
} from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { parseId } from "src/common/util/parseId";
import { UsersService } from "./users.service";
import { SupabaseGuard } from "src/common/supabase";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// GET localhost:3000/api/v1/users
	@Get("/")
	// @UseGuards(SupabaseGuard)
	async getUsers() {
		return await this.usersService.getUsers();
	}

	// GET localhost:3000/api/v1/users/:id
	@Get("/:id")
	async getUser(@Param("id") id: string) {
		const userId = parseId(id);
		const user = await this.usersService.getUser(userId);
		if (user === null) {
			throw new HttpException({}, 404);
		}

		return user;
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

	// PUT localhost:3000/api/v1/users/:id
	@Post("/:id")
	async createUser(@Param() id: string, @Body() { username, email }: CreateUserDto) {
		return await this.usersService.createUser({
			id: parseId(id),
			username: username,
			email: email,
		});
	}

	// DELETE localhost:3000/api/v1/users/:id
	@Delete("/:id")
	async deleteUser(@Param("id") id: string) {
		return await this.usersService.deleteUser(parseId(id));
	}
}
