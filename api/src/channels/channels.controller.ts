import { StandardExceptionFilter } from "src/common/filters/standard.filter";
import { parseId } from "src/common/util/parseId";

import {
	Controller,
	Delete,
	Get,
	HttpException,
	Logger,
	Param,
	Put,
	UseFilters,
} from "@nestjs/common";

import { ChannelsService } from "./channels.service";

@Controller("channels")
@UseFilters(StandardExceptionFilter)
export class ChannelsController {
	private readonly logger = new Logger(ChannelsController.name);

	constructor(private readonly channelsService: ChannelsService) {}

	// GET localhost:3000/channels
	@Get("/")
	async getChannels() {
		return await this.channelsService.getChannels();
	}

	// GET localhost:3000/channels/:id
	@Get("/:id")
	async getChannel(@Param("id") id: string) {
		const channel = await this.channelsService.getChannel(parseId(id));
		if (channel === null) {
			throw new HttpException({}, 404);
		}

		return channel;
	}

	// GET localhost:3000/channels/:id/users
	@Get("/:id/users")
	async getChannelUsers(@Param("id") id: string) {
		const channel = await this.channelsService.getChannel(parseId(id));
		if (channel === null) {
			throw new HttpException({}, 404);
		}

		return await this.channelsService.getChannelUsers(parseId(id));
	}

	// PUT localhost:3000/channels/:id
	@Put("/:id")
	async createChannel(@Param("id") id: string) {
		return await this.channelsService.createChannel(parseId(id));
	}

	// DELETE localhost:3000/channels/:id
	@Delete("/:id")
	async deleteChannel(@Param("id") id: string) {
		const channel = await this.channelsService.getChannel(parseId(id));
		if (channel === null) {
			throw new HttpException({}, 404);
		}

		return await this.channelsService.deleteChannel(parseId(id));
	}
}
