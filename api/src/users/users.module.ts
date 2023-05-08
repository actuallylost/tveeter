import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "src/common/services/prisma.service";

@Module({
	controllers: [UsersController],
	providers: [UsersService, PrismaService],
})
export class UsersModule {}
