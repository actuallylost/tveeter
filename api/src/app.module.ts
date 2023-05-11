import { Module } from "@nestjs/common";

// Modules
import { SupabaseModule } from "./common/supabase";
import { ChannelsModule } from "./channels";
import { MessagesModule } from "./messages";
import { EventsModule } from "./events";
import { UsersModule } from "./users";
import { AuthModule } from "./auth";

@Module({
	imports: [
		UsersModule,
		MessagesModule,
		ChannelsModule,
		AuthModule,
		SupabaseModule,
		EventsModule,
	],
})
export class AppModule {}
