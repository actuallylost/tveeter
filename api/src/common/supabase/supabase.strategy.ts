import { SupabaseAuthStrategy } from "nestjs-supabase-auth";
import { ExtractJwt } from "passport-jwt";

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class SupabaseStrategy extends PassportStrategy(SupabaseAuthStrategy, "supabase") {
	public constructor() {
		super({
			supabaseUrl: process.env.SUPABASE_URL,
			supabaseKey: process.env.SUPABASE_API_KEY,
			supabaseOptions: {},
			supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET,
			extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload: any): Promise<any> {
		super.validate(payload);
	}

	authenticate(req: any) {
		super.authenticate(req);
	}
}
