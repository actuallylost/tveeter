import { Injectable } from "@nestjs/common";
import { Message, Prisma } from "@prisma/client";

import { PrismaService } from "../common/services/prisma.service";
import { SnowflakeService } from "../common/services/snowflake.service";
import { EventsGateway } from "../events";

interface CreateMessageOptions {
	username: string;
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

	async getRecentMessagesByChannelId(id: bigint): Promise<Message[]> {
		return await this.prisma.message
			.findMany({
				orderBy: {
					id: "desc",
				},
				where: { channelId: id },
				take: 20,
				include: {
					user: true,
				},
			})
			.then((messages) =>
				messages.reverse().map((message) => ({
					id: message.id,
					content: message.content,
					username: message.user.username,
					authorId: message.authorId,
					channelId: message.channelId,
					createdAt: message.createdAt,
				})),
			);
	}

	async getRecentMessagesByUserId(userId: bigint): Promise<Message[]> {
		return await this.prisma.message.findMany({
			orderBy: {
				id: "desc",
			},
			where: { authorId: userId },
			take: 20,
		});
	}

	async getMessageById(channelId: bigint, msgId: bigint): Promise<Message | null> {
		return await this.prisma.message.findUnique({
			where: { channelId_id: { channelId: channelId, id: msgId } },
		});
	}

	async createMessage(options: CreateMessageOptions): Promise<Message> {
		const author = await this.prisma.user.findUnique({ where: { username: options.username } });

		if (!author) {
			throw new Error("Cannot send message for non-existent author");
		}

		const username = author.username;
		const authorId = author.id;

		const newMessage = await this.prisma.message.create({
			data: {
				id: this.snowflakeGen.generate().toBigInt(),
				username: options.username,
				authorId: authorId,
				channelId: options.channelId,
				content: options.content,
			},
		});

		await this.eventsGateway.sendMessage(newMessage, username);

		return newMessage;
	}

	async deleteAllMessages(channelId: bigint): Promise<Prisma.BatchPayload> {
		return await this.prisma.message.deleteMany({
			where: { channelId: channelId },
		});
	}

	async deleteMessage(channelId: bigint, messageId: bigint): Promise<Message> {
		return await this.prisma.message.delete({
			where: { channelId_id: { channelId: channelId, id: messageId } },
		});
	}
}
