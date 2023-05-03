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
			where: { id },
		});
	}

	async getMessage(id: number): Promise<Message> {
		return await this.prisma.message.findUnique({
			where: { id: id },
		});
	}

	// async createChannelMemberships(options: CreateMessageOptions): Promise<Message> {
	// 	return await this.prisma.channelMembership.create({
	// 		data: {
	// 			userId: options.authorId,
	// 			channelId: options.channelId,
	// 		},
	// 	});
	// }

	async createMessage(options: CreateMessageOptions): Promise<Message> {
		await this.prisma.channelMembership.create({
			data: {
				userId: options.authorId,
				channelId: options.channelId,
			},
		});
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
