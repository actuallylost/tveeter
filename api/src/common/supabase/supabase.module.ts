import { Module } from "@nestjs/common";

import { SupabaseStrategy } from "./supabase.strategy";
import { SupabaseGuard } from "./supabase.guard";
import { SupabaseService } from "./supabase.service";
import { SupaClient } from "./supaclient";

@Module({
	providers: [SupabaseStrategy, SupabaseGuard, SupabaseService, SupaClient],
	exports: [SupabaseStrategy, SupabaseGuard, SupabaseService, SupaClient],
})
export class SupabaseModule {}
