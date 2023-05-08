import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ChannelsModule } from "./channels";
import { MessagesModule } from "./messages";
// Modules
import { UsersModule } from "./users";

@Module({
	imports: [ConfigModule.forRoot(), UsersModule, MessagesModule, ChannelsModule],
	// providers: [
	// 	{
	// 		provide: APP_GUARD,
	// 		useClass: SupabaseGuard,
	// 	},
	// ],
})
export class AppModule {}
