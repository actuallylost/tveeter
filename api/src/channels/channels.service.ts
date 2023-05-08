import { PrismaService } from "src/common/services/prisma.service";

import { Injectable } from "@nestjs/common";
import { Channel, User } from "@prisma/client";

@Injectable()
export class ChannelsService {
	constructor(private prisma: PrismaService) {}

	async getChannels(): Promise<Channel[]> {
		return await this.prisma.channel.findMany();
	}

	async getChannel(id: bigint): Promise<Channel | null> {
		return this.prisma.channel.findUnique({
			where: { id },
		});
	}

	async getChannelUsers(id: bigint): Promise<User[]> {
		return await this.prisma.user.findMany({
			where: {
				channels: {
					some: {
						channelId: id,
					},
				},
			},
		});
	}

	async createChannel(id: bigint): Promise<Channel> {
		// Fetch all users
		const users = await this.prisma.user.findMany();
		const channel = await this.prisma.channel.create({
			data: { id },
		});

		// Create a ChannelMembership entry for all users
		await this.prisma.channelMembership.createMany({
			data: users.map((user) => ({
				userId: user.id,
				channelId: channel.id,
			})),
		});

		return channel;
	}

	async deleteChannel(id: bigint): Promise<Channel> {
		// Delete all Message and ChannelMembership entries
		await this.prisma.message.deleteMany({
			where: { channelId: id },
		});
		await this.prisma.channelMembership.deleteMany({
			where: { channelId: id },
		});

		return await this.prisma.channel.delete({
			where: { id },
		});
	}
}
