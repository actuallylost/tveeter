import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SupabaseClient } from "@supabase/supabase-js";

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

	async getEmail(accessToken: string): Promise<string | null> {
		const email = this.auth.getUser(accessToken).then((session) => {
			if (!session.data.user || !session.data.user.email) {
				return null;
			}
			return session.data.user.email;
		});

		return email;
	}
}
