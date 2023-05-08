import { Injectable } from "@nestjs/common";
import { Message } from "@prisma/client";
import { PrismaService } from "src/common/prisma.service";

class CreateMessageOptions {
	authorId: number;
	channelId: number;
	content: string;
}

@Injectable()
export class MessagesService {
	constructor(private prisma: PrismaService) {}

	async getMessagesByChannelId(id: number): Promise<Message[]> {
		return await this.prisma.message.findMany({
			where: { channelId: id },
		});
	}

	// TODO: Implement this
	// async getMessagesByUserId(userId: number): Promise<Message[]> {
	// 	return await this.prisma.message.findMany({
	// 		where: { authorId: userId },
	// 	});
	// }

	async getMessageById(channelId: number, msgId: number): Promise<Message> {
		return await this.prisma.message.findUnique({
			where: { id: msgId /** , channelId: channelId  */ },
		});
	}

	async createMessage(options: CreateMessageOptions): Promise<Message> {
		return await this.prisma.message.create({
			data: options,
		});
	}

	async deleteMessage(id: number): Promise<Message> {
		return await this.prisma.message.delete({
			where: { id },
		});
	}
}
