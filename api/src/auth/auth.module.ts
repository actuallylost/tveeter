import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "../users";
import { SnowflakeService } from "../common/services/snowflake.service";

import { SupabaseGuard, SupabaseStrategy } from "../common/supabase";
import { PrismaService } from "src/common/services/prisma.service";

@Module({
	controllers: [AuthController],
	providers: [
		AuthService,
		UsersService,
		PrismaService,
		SnowflakeService,
		SupabaseStrategy,
		SupabaseGuard,
	],
	exports: [AuthService, SupabaseStrategy],
})
export class AuthModule {}
