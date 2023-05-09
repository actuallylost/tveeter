import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";

// Modules
import { ChannelsModule } from "./channels";
import { MessagesModule } from "./messages";
import { UsersModule } from "./users";
import { AuthModule } from "./auth";

import { SupabaseGuard, SupabaseModule } from "./common/supabase";

@Module({
	imports: [
		ConfigModule.forRoot(),
		UsersModule,
		MessagesModule,
		ChannelsModule,
		AuthModule,
		SupabaseModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: SupabaseGuard,
		},
	],
})
export class AppModule {}
