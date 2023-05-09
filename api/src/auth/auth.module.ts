import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "../users";
import { SnowflakeService } from "../common/services/snowflake.service";

import { SupabaseGuard, SupabaseModule, SupabaseStrategy } from "../common/supabase";
import { PrismaService } from "src/common/services/prisma.service";
import { SupabaseService } from "src/common/supabase/supabase.service";

@Module({
	imports: [SupabaseModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		UsersService,
		PrismaService,
		SnowflakeService,
		SupabaseService,
		SupabaseStrategy,
		SupabaseGuard,
	],
	exports: [AuthService],
})
export class AuthModule {}
