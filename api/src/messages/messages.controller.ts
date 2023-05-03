import { Controller, Param, Body, Get, Post, Delete } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@Controller("channels/:id/messages")
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	// GET localhost:3000/channels/:id/messages
	@Get("/")
	async getMessagesByChannelId(@Param("id") id: string) {
		return await this.messagesService.getMessagesByChannelId(parseInt(id));
	}

	// GET localhost:3000/channels/:id/messages/:id
	@Get("/:msgId")
	async getMessage(@Param("id") id: string, @Param("msgId") msgId: string) {
		return await this.messagesService.getMessage(parseInt(msgId));
	}

	// POST localhost:3000/channels/:id/messages/:id
	@Post("/:msgId")
	async createMessage(
		@Param("id") channelId: string,
		@Param("msgId") messageId: string,
		@Body() { content }: CreateMessageDto,
	) {
		// TODO: Fetch authorId from supabase
		return await this.messagesService.createMessage({
			authorId: 1,
			channelId: parseInt(channelId),
			content: content,
		});
	}

	// DELETE localhost:3000/channels/:id/messages/:id
	@Delete("/:id")
	async deleteMessage(@Param("id") id: string) {
		return await this.messagesService.deleteMessage(parseInt(id));
	}
}
