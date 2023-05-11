import { EventsGateway } from "../events";
import { PrismaService } from "../common/services/prisma.service";
import { SnowflakeService } from "../common/services/snowflake.service";

import { Injectable } from "@nestjs/common";
import { Message } from "@prisma/client";

interface CreateMessageOptions {
	authorId: bigint;
	channelId: bigint;
	content: string;
}

@Injectable()
export class MessagesService {
	constructor(
		private prisma: PrismaService,
		private snowflakeGen: SnowflakeService,
		private eventsGateway: EventsGateway,
	) {}

	async getMessagesByChannelId(id: bigint): Promise<Message[]> {
		return await this.prisma.message.findMany({
			where: { channelId: id },
		});
	}

	// TODO: Implement
	// async getMessagesByUserId(userId: number): Promise<Message[]>

	async getMessageById(channelId: bigint, msgId: bigint): Promise<Message | null> {
		return await this.prisma.message.findUnique({
			where: { channelId_id: { channelId: channelId, id: msgId } },
		});
	}

	async createMessage(options: CreateMessageOptions): Promise<Message> {
		if (!(await this.prisma.user.findUnique({ where: { id: options.authorId } }))) {
			throw new Error("Cannot send message for non-existent author");
		}

		const newMessage = await this.prisma.message.create({
			data: {
				id: this.snowflakeGen.generate().toBigInt(),
				authorId: options.authorId,
				channelId: options.channelId,
				content: options.content,
			},
		});

		await this.eventsGateway.sendMessage(newMessage);

		return newMessage;
	}

	async deleteMessage(channelId: bigint, messageId: bigint): Promise<Message> {
		return await this.prisma.message.delete({
			where: { channelId_id: { channelId: channelId, id: messageId } },
		});
	}
}
