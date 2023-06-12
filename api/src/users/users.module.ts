import { PrismaService } from "src/common/services/prisma.service";
import { SnowflakeService } from "src/common/services/snowflake.service";
import { SupabaseModule } from "src/common/supabase";

import { Module } from "@nestjs/common";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	imports: [SupabaseModule],
	controllers: [UsersController],
	providers: [UsersService, PrismaService, SnowflakeService],
	exports: [UsersService],
})
export class UsersModule {}
