import { StandardExceptionFilter } from "src/common/filters/standard.filter";

import { Body, Controller, Delete, Get, Param, Post, UseFilters } from "@nestjs/common";

import { TempUserService } from "./tempusers.service";

@Controller("tempusers")
@UseFilters(StandardExceptionFilter)
// @UseGuards(SupabaseGuard)
export class TempUserController {
	constructor(private readonly tempUserService: TempUserService) {}

	// GET localhost:3000/api/v1/tempusers
	@Get("/")
	async getTempUsers() {
		return await this.tempUserService.getTempUsers();
	}

	// GET localhost:3000/api/v1/tempusers/:username
	@Get("/:username")
	async getTempUser(@Param("username") username: string) {
		return await this.tempUserService.getTempUser(username);
	}

	// POST localhost:3000/api/v1/tempusers/:username
	@Post("/:username")
	async createTempUser(@Param("username") username: string, @Body() email: string) {
		return this.tempUserService.createTempUser({ username, email });
	}

	// DELETE localhost:3000/api/v1/tempusers/:username
	@Delete("/:username")
	async deleteTempUser(@Param("username") username: string) {
		return this.tempUserService.deleteTempUser(username);
	}
}
