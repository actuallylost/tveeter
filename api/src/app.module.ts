import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

// Modules
import { UsersModule } from "./users";
import { MessagesModule } from "./messages";
import { ChannelsModule } from "./channels";
import { SupabaseModule, SupabaseGuard } from "./common/supabase";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

@Module({
	imports: [
		ConfigModule.forRoot(),
		UsersModule,
		MessagesModule,
		ChannelsModule,
		PassportModule,
		SupabaseModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: SupabaseGuard,
		},
	],
})
export class AppModule {}
