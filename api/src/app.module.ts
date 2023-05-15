// NestJS Imports
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// Modules
import { SupabaseModule } from "./common/supabase";
import { ChannelsModule } from "./channels";
import { MessagesModule } from "./messages";
import { EventsModule } from "./events";
import { UsersModule } from "./users";
import { AuthModule } from "./auth";
import { configuration } from "./config";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		UsersModule,
		MessagesModule,
		ChannelsModule,
		AuthModule,
		SupabaseModule,
		EventsModule,
	],
})
export class AppModule {}
