import { ChannelsService } from "src/channels";
import { PrismaService } from "src/common/services/prisma.service";

import { Module } from "@nestjs/common";

import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { SnowflakeService } from "src/common/services/snowflake.service";

@Module({
	controllers: [MessagesController],
	providers: [MessagesService, ChannelsService, PrismaService, SnowflakeService],
})
export class MessagesModule {}
