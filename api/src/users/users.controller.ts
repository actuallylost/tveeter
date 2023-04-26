import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateMessageDto } from "./dto/create-message.dto";

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

	// PUT localhost:3000/users
	@Put("/")
	async createUser(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.createUser(createUserDto);
	}

	// POST localhost:3000/users/:id/messages
	@Post("/:id/messages")
	async createMessage(@Body() createMessageDto: CreateMessageDto) {
		return await this.usersService.createMessage(createMessageDto);
	}

	// DELETE localhost:3000/users/:id
	@Delete("/:id")
	async deleteUser(@Param("id") id: string) {
		return await this.usersService.deleteUser(parseInt(id));
	}
}
