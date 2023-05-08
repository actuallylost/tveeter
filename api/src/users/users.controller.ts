import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// GET localhost:3000/users
	@Get("/")
	async getUsers() {
		return await this.usersService.getUsers();
	}

	// GET localhost:3000/users/:id
	@Get("/:id")
	async getUser(@Param("id") id: string) {
		return await this.usersService.getUser(parseInt(id));
	}

	// GET localhost:3000/users/:id/messages
	@Get("/:id/messages")
	async getUserMessages(@Param("id") id: string) {
		return await this.usersService.getUserMessages(parseInt(id));
	}

	// PUT localhost:3000/users/:id
	@Post("/:id")
	async createUser(@Param() id: string, @Body() { username }: CreateUserDto) {
		return await this.usersService.createUser({
			id: parseInt(id),
			username: username,
		});
	}

	// DELETE localhost:3000/users/:id
	@Delete("/:id")
	async deleteUser(@Param("id") id: string) {
		return await this.usersService.deleteUser(parseInt(id));
	}
}
