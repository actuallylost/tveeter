import { SupabaseModule } from "src/common/supabase";

import { Module } from "@nestjs/common";

import { PrismaService } from "../common/services/prisma.service";
import { TempUserController } from "./tempusers.controller";
import { TempUserService } from "./tempusers.service";

@Module({
	imports: [SupabaseModule],
	controllers: [TempUserController],
	providers: [TempUserService, PrismaService],
	exports: [TempUserService],
})
export class TempUserModule {}
