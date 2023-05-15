import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { SupabaseGuard } from "./supabase.guard";
import SupabaseService from "./supabase.service";

@Module({
	imports: [ConfigModule],
	providers: [SupabaseGuard, SupabaseService],
	exports: [SupabaseGuard, SupabaseService],
})
export class SupabaseModule {}
