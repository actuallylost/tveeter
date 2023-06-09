import { StandardExceptionFilter } from "src/common/filters/standard.filter";
import { parseId } from "src/common/util/parseId";

import {
	Controller,
	Delete,
	Get,
	HttpException,
	Logger,
	Param,
	Post,
	UseFilters,
} from "@nestjs/common";

import { ChannelsService } from "./channels.service";

@Controller("channels")
@UseFilters(StandardExceptionFilter)
// @UseGuards(SupabaseGuard)
export class ChannelsController {
	private readonly logger = new Logger(ChannelsController.name);

	constructor(private readonly channels: ChannelsService) {}

	// GET localhost:3000/api/v1/channels
	@Get("/")
	async getChannels() {
		return await this.channels.getChannels();
	}

	// GET localhost:3000/api/v1/channels/:id
	@Get("/:id")
	async getChannel(@Param("id") id: string) {
		const channel = await this.channels.getChannel(parseId(id));
		if (channel === null) {
			throw new HttpException({}, 404);
		}

		return channel;
	}

	// GET localhost:3000/api/v1/channels/:id/users
	@Get("/:id/users")
	async getChannelUsers(@Param("id") id: string) {
		const channel = await this.channels.getChannel(parseId(id));
		if (channel === null) {
			throw new HttpException({}, 404);
		}

		return await this.channels.getChannelUsers(parseId(id));
	}

	// POST localhost:3000/api/v1/channels/
	@Post("/")
	async createChannel() {
		return await this.channels.createChannel();
	}

	// DELETE localhost:3000/api/v1/channels/:id
	@Delete("/:id")
	async deleteChannel(@Param("id") id: string) {
		const channel = await this.channels.getChannel(parseId(id));
		if (channel === null) {
			throw new HttpException({}, 404);
		}

		return await this.channels.deleteChannel(parseId(id));
	}
}
