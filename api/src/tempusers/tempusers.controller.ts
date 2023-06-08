import { StandardExceptionFilter } from "src/common/filters/standard.filter";

import { Controller, Delete, Get, Param, Post, UseFilters } from "@nestjs/common";

import { TempUserService } from "./tempusers.service";

@Controller("tempusers")
@UseFilters(StandardExceptionFilter)
// @UseGuards(SupabaseGuard)
export class TempUserController {
	constructor(private readonly tempUserService: TempUserService) {}

	@Get("/")
	async getTempUsers() {
		return await this.tempUserService.getTempUsers();
	}

	@Get("/:username")
	async getTempUser(@Param("username") username: string) {
		return await this.tempUserService.getTempUser(username);
	}

	@Post("/:username")
	async createTempUser(@Param("username") username: string) {
		return this.tempUserService.createTempUser(username);
	}

	@Delete("/:username")
	async deleteTempUser(@Param("username") username: string) {
		return this.tempUserService.deleteTempUser(username);
	}
}
