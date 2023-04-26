import { Controller, Get, Post, Put, Param, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// GET localhost:3000/users
	@Get("/users")
	async getUsers() {
		return await this.usersService.getUsers();
	}

	// GET localhost:3000/users/:id
	@Get("/users/:id")
	async getUser(@Param("id") id: number) {
		return await this.usersService.getUser(id);
	}

	// GET localhost:3000/users/:id/messages
	@Get("/users/:id/messages")
	async getUserMessages(@Param("id") id: number) {
		return await this.usersService.getUserMessages(id);
	}

	// PUT localhost:3000/users
	@Put("/users")
	async createUser(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.createUser(createUserDto);
	}
}
