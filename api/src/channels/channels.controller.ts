import { Controller, Param, Body, Get, Post, Put, Delete } from "@nestjs/common";
import { ChannelsService } from "./channels.service";
import { CreateChannelDto } from "./dto/create-channel.dto";

@Controller("channels")
export class ChannelsController {
	constructor(private readonly channelsService: ChannelsService) {}

	// GET localhost:3000/channels
	@Get("/")
	async getChannels() {
		return await this.channelsService.getChannels();
	}

	// GET localhost:3000/channels/:id
	@Get("/:id")
	async getChannel(@Param("id") id: string) {
		return await this.channelsService.getChannel(parseInt(id));
	}

	// PUT localhost:3000/channels/:id
	@Put("/:id")
	// TODO: Check if the following is necessary - { id }: CreateChannelDto
	async createChannel(@Param("id") id: string) {
		return await this.channelsService.createChannel(parseInt(id));
	}

	// DELETE localhost:3000/channels/:id
	@Delete("/:id")
	async deleteChannel(@Param("id") id: string) {
		return await this.channelsService.deleteChannel(parseInt(id));
	}
}
