import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "src/common/services/prisma.service";
import { SnowflakeService } from "src/common/services/snowflake.service";
import { SupabaseModule } from "src/common/supabase";

@Module({
	imports: [SupabaseModule],
	controllers: [UsersController],
	providers: [UsersService, PrismaService, SnowflakeService],
})
export class UsersModule {}
