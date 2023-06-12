import { SupabaseModule } from "src/common/supabase";
import { TempUserModule } from "src/tempusers";
import { UsersModule } from "src/users";

import { Module } from "@nestjs/common";

import { PrismaService } from "../common/services/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [SupabaseModule, UsersModule, TempUserModule],
	controllers: [AuthController],
	providers: [AuthService, PrismaService],
	exports: [AuthService],
})
export class AuthModule {}
