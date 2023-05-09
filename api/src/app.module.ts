import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ChannelsModule } from "./channels";
import { MessagesModule } from "./messages";
// Modules
import { UsersModule } from "./users";
import { AuthModule } from "./auth";

@Module({
	imports: [ConfigModule.forRoot(), UsersModule, MessagesModule, ChannelsModule, AuthModule],
	// providers: [
	// 	{
	// 		provide: APP_GUARD,
	// 		useClass: SupabaseGuard,
	// 	},
	// ],
})
export class AppModule {}
