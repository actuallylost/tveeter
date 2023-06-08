// NestJS Imports
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ChannelsModule } from "./channels";
// Modules
import { SupabaseModule } from "./common/supabase";
import { configuration } from "./config";
import { EventsModule } from "./events";
import { MessagesModule } from "./messages";
import { TempUserModule } from "./tempusers";
import { UsersModule } from "./users";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		UsersModule,
		TempUserModule,
		MessagesModule,
		ChannelsModule,
		SupabaseModule,
		EventsModule,
	],
	// providers: [
	// 	{
	// 		provide: "APP_GUARD",
	// 		useClass: SupabaseGuard,
	// 	},
	// ],
})
export class AppModule {}
