import { Module } from "@nestjs/common";

// Modules
import { UsersModule } from "./users";
import { MessagesModule } from "./messages";
import { ChannelsModule } from "./channels";

@Module({
	imports: [UsersModule, MessagesModule, ChannelsModule],
})
export class AppModule {}
