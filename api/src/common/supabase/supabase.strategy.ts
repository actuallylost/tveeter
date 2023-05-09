import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { SupabaseAuthStrategy } from "nestjs-supabase-auth";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { User } from "@supabase/supabase-js";

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

	async validate(payload: User): Promise<User> {
		return await super.validate(payload);
	}

	authenticate(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
		return super.authenticate(req);
	}
}
