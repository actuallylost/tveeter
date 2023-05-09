import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";

(BigInt.prototype as any).toJSON = function () {
	return this.toString();
};

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useLogger(["error", "warn", "log", "debug", "verbose"]);
	app.setGlobalPrefix("api");

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: "1",
	});

	await app.listen(3000);
}
bootstrap();
