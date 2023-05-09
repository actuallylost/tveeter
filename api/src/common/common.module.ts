import { Module } from "@nestjs/common";

import { PrismaService } from "./services/prisma.service";
import { SnowflakeService } from "./services/snowflake.service";

@Module({
	providers: [PrismaService, SnowflakeService],
	exports: [PrismaService, SnowflakeService],
})
export class CommonModule {}
