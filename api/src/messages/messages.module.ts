import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { PrismaService } from "src/common/prisma.service";

@Module({
	controllers: [MessagesController],
	providers: [MessagesService, PrismaService],
})
export class MessagesModule {}
