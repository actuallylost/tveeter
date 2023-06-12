import { StandardExceptionFilter } from "src/common/filters/standard.filter";

import { Body, Controller, Delete, Get, Param, Post, UseFilters } from "@nestjs/common";

import { TempUserService } from "./tempusers.service";

interface EmailDto {
	email: string;
}

@Controller("tempusers")
@UseFilters(StandardExceptionFilter)
// @UseGuards(SupabaseGuard)
export class TempUserController {
	constructor(private readonly tempUser: TempUserService) {}

	// GET localhost:3000/api/v1/tempusers
	@Get("/")
	async getTempUsers() {
		return await this.tempUser.getTempUsers();
	}

	// GET localhost:3000/api/v1/tempusers/:username
	@Get("/:username")
	async getTempUser(@Param("username") username: string) {
		return await this.tempUser.getTempUser(username);
	}

	// POST localhost:3000/api/v1/tempusers/:username
	@Post("/:username")
	async createTempUser(@Param("username") username: string, @Body() { email }: EmailDto) {
		return this.tempUser.createTempUser({ username, email });
	}

	// DELETE localhost:3000/api/v1/tempusers/:username
	@Delete("/:username")
	async deleteTempUser(@Param("username") username: string) {
		return this.tempUser.deleteTempUser(username);
	}
}
