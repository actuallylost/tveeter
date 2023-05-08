import { PrismaService } from "src/common/services/prisma.service";

import { Module } from "@nestjs/common";

import { ChannelsController } from "./channels.controller";
import { ChannelsService } from "./channels.service";

@Module({
	controllers: [ChannelsController],
	providers: [ChannelsService, PrismaService],
})
export class ChannelsModule {}
