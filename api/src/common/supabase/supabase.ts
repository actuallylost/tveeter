// import { Request } from "express";
// import { ExtractJwt } from "passport-jwt";

// import { Inject, Injectable, Logger, Scope } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { REQUEST } from "@nestjs/core";
// import { createClient, SupabaseClient } from "@supabase/supabase-js";

// @Injectable({ scope: Scope.REQUEST })
// export class Supabase {
// 	private readonly logger = new Logger(Supabase.name);
// 	private clientInstance: SupabaseClient;

// 	constructor(
// 		@Inject(REQUEST) private readonly request: Request,
// 		private readonly configService: ConfigService,
// 	) {}

// 	async getClient() {
// 		this.logger.debug("Getting Supabase client...");
// 		if (this.clientInstance) {
// 			this.logger.debug("Client exists - returning for current Scope.REQUEST");
// 			return this.clientInstance;
// 		}

// 		this.logger.debug("Initializing new Supabase client for new Scope.REQUEST");

// 		this.clientInstance = createClient(
// 			this.configService.get("SUPABASE_URL"),
// 			this.configService.get("SUPABASE_KEY"),
// 			{
// 				auth: {
// 					autoRefreshToken: true,
// 					detectSessionInUrl: false,
// 				},
// 			},
// 		);

// 		const token = ExtractJwt.fromAuthHeaderAsBearerToken()(this.request);

// 		if (token) {
// 			try {
// 				await this.clientInstance.auth.setSession({
// 					access_token: token,
// 					refresh_token: token,
// 				});
// 				this.logger.debug("Auth has been set!");
// 			} catch (err) {
// 				this.logger.error(`Failed to set auth: ${err}`);
// 			}
// 		}

// 		return this.clientInstance;
// 	}
// }
