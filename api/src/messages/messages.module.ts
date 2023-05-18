import { ChannelsService } from "../channels";
import { PrismaService } from "../common/services/prisma.service";

import { Module } from "@nestjs/common";

import { SnowflakeService } from "../common/services/snowflake.service";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { EventsGateway } from "../events";
import { SupabaseModule } from "src/common/supabase";

@Module({
	imports: [SupabaseModule],
	controllers: [MessagesController],
	providers: [MessagesService, ChannelsService, PrismaService, SnowflakeService, EventsGateway],
})
export class MessagesModule {}
