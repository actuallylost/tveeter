import { INestApplication, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

// Commented changes are for upgrading to Prisma 5
@Injectable()
export class PrismaService extends PrismaClient /* implements onModuleInit */ {
	// async onModuleInit() {
	// await this.$connect()
	// }

	async enableShutdownHooks(app: INestApplication) {
		this.$on("beforeExit", async () => {
			await app.close();
		});
	}
}
