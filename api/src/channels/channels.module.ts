import { Module } from "@nestjs/common";
import { ChannelsController } from "./channels.controller";
import { ChannelsService } from "./channels.service";
import { PrismaService } from "src/common/prisma.service";

@Module({
	controllers: [ChannelsController],
	providers: [ChannelsService, PrismaService],
})
export class ChannelsModule {}
