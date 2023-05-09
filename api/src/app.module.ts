import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

// Modules
import { ChannelsModule } from "./channels";
import { MessagesModule } from "./messages";
import { UsersModule } from "./users";
import { AuthModule } from "./auth";

import { SupabaseGuard, SupabaseModule } from "./common/supabase";

@Module({
	imports: [UsersModule, MessagesModule, ChannelsModule, AuthModule, SupabaseModule],
	providers: [
		{
			provide: APP_GUARD,
			useClass: SupabaseGuard,
		},
	],
})
export class AppModule {}
