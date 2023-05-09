import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "../users";
import { SnowflakeService } from "../common/services/snowflake.service";

import { SupabaseModule } from "../common/supabase";
import { PrismaService } from "src/common/services/prisma.service";

@Module({
	imports: [SupabaseModule],
	controllers: [AuthController],
	providers: [AuthService, UsersService, PrismaService, SnowflakeService],
	exports: [AuthService],
})
export class AuthModule {}
