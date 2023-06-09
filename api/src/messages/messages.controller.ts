import { ChannelsService } from "src/channels";
import { StandardExceptionFilter } from "src/common/filters/standard.filter";
import { parseId } from "src/common/util/parseId";

import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Post,
	UseFilters,
} from "@nestjs/common";

import { CreateMessageDto } from "./dto/create-message.dto";
import { MessagesService } from "./messages.service";

@Controller("channels/:id/messages")
@UseFilters(StandardExceptionFilter)
// @UseGuards(SupabaseGuard)
export class MessagesController {
	constructor(
		private readonly messagesService: MessagesService,
		private readonly channels: ChannelsService,
	) {}

	// GET localhost:3000/api/v1/channels/:id/messages
	@Get("/")
	async getRecentMessagesByChannelId(@Param("id") id: string) {
		const parsedChannelId = parseId(id);

		const channel = await this.channels.getChannel(parsedChannelId);
		if (channel === null) {
			throw new HttpException({}, 404);
		}

		return await this.messagesService.getRecentMessagesByChannelId(parsedChannelId);
	}

	// GET localhost:3000/api/v1/channels/:id/messages/:userId
	@Get("/:userId")
	async getRecentMessagesByUserId(@Param("id") id: string, @Param("userId") userId: string) {
		const parsedChannelId = parseId(id);
		const parsedUserId = parseId(userId);

		const channel = await this.channels.getChannel(parsedChannelId);
		if (channel === null) {
			throw new HttpException({}, 404);
		}

		return await this.messagesService.getRecentMessagesByUserId(parsedUserId);
	}

	// GET localhost:3000/api/v1/channels/:id/messages/:messageId
	@Get("/:messageId")
	async getMessageById(@Param("id") id: string, @Param("messageId") messageId: string) {
		const parsedChannelId = parseId(id);
		const parsedMessageId = parseId(messageId);

		const channel = await this.channels.getChannel(parsedChannelId);
		if (channel === null) {
			throw new HttpException({}, 404);
		}

		const message = this.messagesService.getMessageById(parsedChannelId, parsedMessageId);
		if (message === null) {
			throw new HttpException({}, 404);
		}

		return message;
	}

	// POST localhost:3000/api/v1/channels/:id/messages
	@Post("/")
	async createMessage(
		@Param("id") channelId: string,
		@Body() { username, content }: CreateMessageDto,
	) {
		return await this.messagesService.createMessage({
			username: username,
			channelId: parseId(channelId),
			content,
		});
	}

	// DELETE localhost:3000/api/v1/channels/:id/messages
	@Delete("/")
	async deleteAllMessages(@Param("id") id: string) {
		return await this.messagesService.deleteAllMessages(parseId(id));
	}

	// DELETE localhost:3000/api/v1/channels/:id/messages/:messageId
	@Delete("/:messageId")
	async deleteMessage(@Param("id") id: string, @Param("messageId") messageId: string) {
		return await this.messagesService.deleteMessage(parseId(id), parseId(messageId));
	}
}
