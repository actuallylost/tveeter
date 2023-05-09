import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

import { SupabaseStrategy } from "../common/supabase";

@Module({
	controllers: [AuthController],
	providers: [AuthService, SupabaseStrategy],
	exports: [AuthService, SupabaseStrategy],
})
export class AuthModule {}
