import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { ConfigService } from "@nestjs/config";

@Injectable()
export default class SupabaseService extends SupabaseClient {
	constructor(private readonly configService: ConfigService) {
		super(
			configService.getOrThrow("supabase.apiUrl"),
			configService.getOrThrow("supabase.apiKey"),
			{
				auth: {
					autoRefreshToken: false,
					persistSession: false,
					detectSessionInUrl: false,
				},
			},
		);
	}
}
