import { Module } from "@nestjs/common";

import { AuthModule } from "./auth";
// Modules
import { ChannelsModule } from "./channels";
import { SupabaseModule } from "./common/supabase";
import { MessagesModule } from "./messages";
import { UsersModule } from "./users";

@Module({
	imports: [UsersModule, MessagesModule, ChannelsModule, AuthModule, SupabaseModule],
})
export class AppModule {}
