import { Injectable } from "@nestjs/common";
import { Channel } from "@prisma/client";
import { PrismaService } from "src/common/prisma.service";

@Injectable()
export class ChannelsService {
	constructor(private prisma: PrismaService) {}

	async getChannels(): Promise<Channel[]> {
		return await this.prisma.channel.findMany();
	}

	async getChannel(id: number): Promise<Channel> {
		return await this.prisma.channel.findUnique({
			where: { id },
		});
	}

	async createChannel(id: number): Promise<Channel> {
		return await this.prisma.channel.create({
			data: { id },
		});
	}

	async deleteChannel(id: number): Promise<Channel> {
		return await this.prisma.channel.delete({
			where: { id },
		});
	}
}
