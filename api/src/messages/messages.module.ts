import { ChannelsService } from "src/channels";
import { PrismaService } from "src/common/services/prisma.service";

import { Module } from "@nestjs/common";

import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";

@Module({
	controllers: [MessagesController],
	providers: [MessagesService, ChannelsService, PrismaService],
})
export class MessagesModule {}
